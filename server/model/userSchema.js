const jwt=require("jsonwebtoken");
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email :{
        type:String,
        required:true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
           type: String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[
                {
                 name: {
                     type: String,
                     required: true
                },
                email :{
                    type:String,
                    required:true
                },
                phone: {
                    type: Number,
                    required: true
                },
                message: {
                    type: String,
                    required: true
                },

                }
    ],
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
})



//we are hashing password
//irrevesrible as it is not encryption
//it is middleware
//two method of mongoose pre and post as we using before storing it on db we use pre
//then it takes first argument bfr which it shoud run so we want it to run bfr save in auth.js(mentioned)
// returns promise so we used async
//since we have to use 'this' here and arrow func is oppo to that so we used normal function
//no need of req res so just used next
//isModified is method which took password meaning that only runs when password is changed by user in field
//left this refeerring to userSchema password
//12 shows that salting should be of 12 rounds

userSchema.pre('save', async function(next){     
    
    console.log("his from inside") 

 if(this.isModified('password')){
     this.password= await bcrypt.hash(this.password,12)
     this.cpassword= await bcrypt.hash(this.cpassword,12);
 }
 next(); //bcz of it now user.save will called
});



//gen token
//jwt.sign(payload,secret or priv key,[options,callback])
//payload must be unique so we use _id
userSchema.methods.generateAuthToken = async function () {  //simple func not fat arrow bcz this can't be used in arrow
    try{

        let token =jwt.sign({_id:this._id},process.env.SECRET_KEY);
        //left side _id is mongodb _id field(key): right side is user's id that will also have _ in starting(value) in mongodb
        this.tokens=this.tokens.concat({token:token})
        //after = to -> first this.tokens refers to above schema tokens,then token is inside of tokens of schema then last is what we generate with let
         
        await this.save();  //saving token
        return token;


    }catch(err) {
        console.log(err)

    }
}




//storing the message
//anonymous normal func

//wahan functions mn arguments die to yahan bhi parameter
userSchema.methods.addMessage=async function(name,email,phone,message){  
    try{
        this.messages=this.messages.concat({name,email,phone,message});
        await this.save();
        return this.messages; //kch na kch to return krna hoga jb function ko outside define krrahe

    }catch(error){
      console.log(error)
    }

}

















const User = mongoose.model('USER',userSchema);

// in const User 'U' must be capital
//USER is collection name (table) in db which would be converted in users automatically 


module.exports= User;