import React,{useEffect,useState} from 'react';


const Contact = ()=>{



    
    const [userData,setUserData]=useState({name:"",email:"",phone:"",message:""})




    
    const userContact = async ()=>{
        try{
    
            const res = await fetch('/getdata',{
            method:"GET",
            headers: {
          
            // Accept: "application/json", no need of cookirs here so comment out
            "Content-Type": "application/json",
            },
            // credentials: "include", //to let cookies to backend
            });
    
        // const data=await JSON.parse(JSON.stringify(res));
        const data = await res.json();
        console.log(data)
        setUserData({...userData,name:data.name,email:data.email,phone:data.phone})
    
            if(!res.status === 200){
                const error= new Error(res.error);
                throw error;
            }
    
        }catch(err){
    
          //if user hasn't even logged in
    
            console.log(err);
          
        }
    }
    
    
    
    useEffect(()=>{
        userContact();   //what we call here it get trif=ggers after page reload
    },[]);
    
    
    
    
//we r storing data in states


const handleInputs =(e) =>{
    const name=e.target.name;
    const value=e.target.value;

    setUserData({...userData,[name]:value})
}

//sending data to backend

const contactForm= async (e)=>{
e.preventDefault();
const {name,email,phone,message}=userData

const res=await fetch('/contact',{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        name,email,phone,message
    })
});

   const data=await res.json();

   if(!data){
       console.log("message not sent")
    }
    else{
        alert("data is sent")
        setUserData({...userData,message:""})
    }

}


    return(
    <>


<div className="container">
    <div className="row mx-auto justify-content-between">
        <div className="col-lg-3">
       <h5>Phone</h5>
       <p>+925454545</p>
        </div>
        <div className="col-lg-3">
            <h5>Email</h5>
            <p>azk443.443@gmail.com</p>
        </div>
        <div className="col-lg-3">
            <h5>Address</h5>
            <p>Karachi, Pakistan</p>
        </div>
    </div>
</div>

<div className="container">
 <h1>Get in Touch</h1>
 <form id="contact_form">
 <div className="row">

     <div className="col-lg-3">
         <input type="text" id="contact_form_name"  onChange={handleInputs} placeholder="Your Name" name="name" value={userData.name}  className="contact_form_name" required/>
     </div>
     <div className="col-lg-3">
     <input type="email" id="contact_form_email"  onChange={handleInputs} placeholder="Your Email" name="email" value={userData.email} className="contact_form_email" required/>

     </div>
     <div className="col-lg-3">
     <input type="number" id="contact_form_phone" onChange={handleInputs}  placeholder="Your Number" name="phone" value={userData.phone} className="contact_form_phone" required/>

     </div>
 </div>
<div className="row">
    <div className=" contact_form_text col-lg-10">
 <textarea name="" id="" className="w-100 mt-2" cols="30" rows="10"  onChange={handleInputs} name="message" placeholder="your message"></textarea>
    </div>
</div>
<div>
<button type="submit" onClick={contactForm}>
        Send Message
    </button>
</div>

</form>
</div>

    </>



    )
}

export default Contact;