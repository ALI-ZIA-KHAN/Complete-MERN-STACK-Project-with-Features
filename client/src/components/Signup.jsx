import {useState,React} from 'react';
import loginpic from '../images/loginblue.png';
import {NavLink, useHistory } from 'react-router-dom';

const Signup = ()=>{


const history=useHistory()

const [user,setUser]=useState({
  name:"",email:"",phone:"",work:"",password:"",cpassword:""
});

let name,value;

const handleInputs =(e)=>{
  console.log(e)
  name=e.target.name;
  value=e.target.value;


  setUser({...user,[name]:value})
}

//we are using fetch PI instead of axios

const PostData = async (e)=>{     //fetch API returns promise
e.preventDefault();

const {name,email,phone,work,password,cpassword} =user;

const res= await fetch("/register",{

  //cors error k ye thapa ki video aur isme jo proxy lgai hai wja uski , saved hai lazmi dekho

  method:"POST",
  headers:{                    //ALL OF WAHT WE HAVE DONE IN POSTMAN
    "Content-Type" :"application/json"
  },
  body:JSON.stringify({  //stringify is used to make string as server only understands string
    
    name,email,phone,work,password,cpassword

    //it is like nam:name since both key:value same so don't need to write
  })

});
 const data = await  res.json();
 console.log(data)
 if(data.status === 422 || !data){
   window.alert("Invalid Registration");
   console.log("Invalid Registration");
 }else{
     
  window.alert("REGISTRATION sUCCSSFUL");
  console.log("sUCCESSSFUL rEGISTRATION");

  history.push("/login")

 }

}


    return(
    <>


       <div className="container-fluid bg-light">
      <div className="row">


          <div className="col-lg-8">
        <h1 className="bg-light " >Sign Up</h1>



        <form class="row ms-5 text-center" method="POST" id="register-form">
  <div class="col-md-8">
    <label htmlFor="name" class="form-label">Username
    <i class="zmdi zmdi-account-circle"></i>
    </label>
    <input type="text" id="name" name="name" autoComplete="off" value={user.name} onChange={handleInputs} placeholder="Your Name" class="form-control" />
  </div>

  <div class="col-md-8">
    <label htmlFor="email" class="form-label">Email
    <i class="zmdi zmdi-email"></i>
    </label>
    <input type="email" name="email" autoComplete="off" value={user.email} onChange={handleInputs} placeholder="Your Email" class="form-control" id="email"/>
  </div>


  <div class="col-md-8">
    <label htmlFor="phone" class="form-label">Phone Number
    <i class="zmdi zmdi-phone"></i>
    </label>
    <input type="number" id="phone" name="phone" autoComplete="off" value={user.phone} onChange={handleInputs} placeholder="Your Phone" class="form-control" />
  </div>


  <div class="col-md-8">
    <label htmlFor="work" class="form-label">Your Work
    <i class="zmdi zmdi-man"></i>
    </label>
    <input type="text" id="work" name="work" autoComplete="off" value={user.work} onChange={handleInputs} placeholder="Your Name" class="form-control" />
  </div>


  <div class="col-md-8">
    <label htmlFor="password" class="form-label">Password
    <i class="zmdi zmdi-lock"></i>
    </label>
    <input type="text" id="password" name="password" autoComplete="off" value={user.password} onChange={handleInputs} placeholder="Your Passsword" class="form-control" />
  </div>

  <div class="col-md-8">
    <label htmlFor="cpassword" class="form-label">Confirm Password
    <i class="zmdi zmdi-lock"></i>
    </label>
    <input type="text" id="cpassword" name="cpassword" autoComplete="off" value={user.cpassword} onChange={handleInputs} placeholder="Confirm Password" class="form-control" />
  </div>

 

  
 
  
  <div class="col-12 mt-2 text-center">
    <button type="submit" name="signup" id="signup" onClick={PostData} class="form-submit btn btn-primary" value="register">Sign Up</button>
  </div>
</form>




          </div>
          <div className="col-lg-4">
              <img src={loginpic} alt="" className="mt-5 mb-5" width="100%" height="400px"/>
              <NavLink to="/login" >I am already Registered</NavLink>

          </div>
      </div>

       </div>

    </>



    )
}

export default Signup;