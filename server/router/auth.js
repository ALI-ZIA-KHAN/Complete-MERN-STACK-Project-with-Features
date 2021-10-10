const jwt=require("jsonwebtoken");
const express =require('express');
const router =express.Router();
const bcrypt=require('bcryptjs');
const authenticate=require("../middleware/authenticate");

require("../db/conn");


const User=require('../model/userSchema')

router.get('/',(req,res)=>{
    res.send("Hello world from server router js")
})




// // 1 way=> this is done by promise
// router.post('/register',(req,res)=>{
  
//     // res.json({message:req.body}); just was to chk response on postman 

//    const {name,email,phone,work,password,cpassword}=req.body;  //obj destruc for easiness
   
//    if( !name || !email|| !phone|| !work|| !password|| !cpassword ){
//     return res.status(422).json({error: "Plz fill all the fields!!"})  //422 for client error
//    }
   
//    //.findOne returns promise so then catch
//    User.findOne({email:email})   //{l.h.s=our db email :r.h.s =user entered email} (chkng in signup if user exists)
//    .then((userExist)=>{   //userExist is jst a var inplace of response
       
//        if(userExist){
//            return res.status(422).json({error:"Email already registered"})
//        }


//         //if user not exist then:
//         //it is like {name:name,email:email and so on to create new document (db's one:user's one)  but
//         //     it is now property of ES2015 that if key:value are same then u can write only once and it wouldbe same
//         // like instead of name:name it is name    }

       
//         const user =new User({name,email,phone,work,password,cpassword})

//        user.save().then(()=>{
//            res.status(201).json({message:"User registered Successfully"});
//        }).catch((err)=>
//        res.status(500).json({error:"failed to registered"}));

//    }).catch(err=>{  console.log(err); })  //catch of findOne
// })








// 2 way=> this is done by async await

router.post('/register', async (req, res) => {     //firstly added asynce befr starting of  callback fnctn 



    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plz fill all the fields!!" })
    }

    try {

        const userExist = await User.findOne({ email: email });
       if (userExist) {
            return res.status(422).json({ error: "Email already registered" })
        
        }else if(password != cpassword){
              
            return res.status(422).json({message:"Password are not matching"})
        }else{

        const user = new User({ name, email, phone, work, password, cpassword });

       //here hashing runs

        await user.save();

        res.status(201).json({ message: "User registered Successfully" });



        }

        
    } catch (err) {
        console.log(err);
    }

})




//login route


router.post("/signin", async (req,res)=>{
    try{

    let token;
    const {email,password} =req.body;

    if(!email || !password){
        return res.status(400).json({error:"Plz fill all fields"})
    }
   const userLogin = await User.findOne({email:email})  ; //since this method returns promise so we used await
//    console.log(userLogin);//full doc showed on console by userLOGIN
    


   


  if(userLogin){

    const isMatch= await bcrypt.compare(password,userLogin.password); //return prom so await

     
   //jwt
  token= await userLogin.generateAuthToken();
//   console.log(token);

 res.cookie("jwtoken",token,{
     expires:new Date(Date.now() + 25892000000), //after 30 days(ms) of current loggedin time it expires 
     httpOnly:true
      
    })//wahan return token isilye kraya ta k yahan ye krsken
   
    if(!isMatch){
        res.status(400).json({error:"Invalid Credentials" })  //if same email not found
    }else{
    res.json({message:"Signin successfully"})
    }
 


  }else{
    res.status(400).json({error:"Invalid Credentials" })
  }



  
    } catch(err){
        console.log(err)
    }
 
})


router.get('/about',authenticate,(req,res)=>{
    console.log(`Hello my about`);  //u can give any name instead of authenticate in which u took file, first it will run
    res.send(req.rootUser); //middleware mn ek user matched user ka data rootUser mn dala hai
                            //ab wahi as aresponse front end pr bhj rahe About.js pr
})



//creating for both contact and homepage
router.get('/getdata',authenticate,(req,res)=>{
    console.log(`Hello for all others`);
    res.send(req.rootUser)
})





router.post('/contact',authenticate, async (req,res)=>{ //async bnaya bht kch chk krna hai hmn islye 
    try{
        const {name,email,phone,message}=req.body;
        if(!name || !email || !phone || !message){
            console.log("error in contact form")
            return res.json({error:"plz filled the contact form"})

        }


  //AUTH MN REQ.USERid HMN MILRAHI THI WAHI YE//
        const userContact=await User.findOne({ _id:req.userID  })
        if(userContact){
            const userMessage=await userContact.addMessage(name,email,phone,message);
            await userContact.save();

            res.status(201).json({userMessage:"user Contact successfully"});
        }

    }catch(err){
        console.log(err)
    }
})



//for logout

router.get('/logout',(req,res)=>{
    console.log(`Hello for all logout`);
    res.clearCookie('jwtoken', {path:'/'})
    res.status(200).send('user logout')
})



module.exports = router;