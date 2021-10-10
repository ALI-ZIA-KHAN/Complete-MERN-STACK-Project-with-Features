import {React,useState,useContext } from 'react';
import loginpic from '../images/loginblue.png';
import { NavLink,useHistory } from 'react-router-dom';
import  {UserContext} from "../App";


const Login = ()=>{

  //useContext basically ab consumer ki jga use hota hai

const {state,dispatch}= useContext(UserContext);


const history = useHistory();
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");

const loginUser = async (e) =>{
  e.preventDefault();

  const res = await fetch('/signin',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body : JSON.stringify({
      email,
      password
    })
  })


 const data =res.json();


 if (data.status=== 400 || !data){
   window.alert("Invalid Credential");
 }else{

  dispatch({type:"USER",payload:true})
  //when user succesfully sign in diptach thru action will change the state in reducer(which will be changedd evrywhr)
  //payload is just an extra variable which passed with true value
  //to change state value to true
   window.alert("Login Successful");
   history.push("/");
 }

}

    return(
    <>






<div className="container-fluid bg-light">
      <div className="row">


          <div className="col-lg-8">
        <h1 className="bg-light " >Log In</h1>



        <form class="row ms-5 text-center" method="POST">


  <div class="col-md-8">
    <label htmlFor="email" class="form-label">Email
    <i class="zmdi zmdi-email"></i>
    </label>
    <input type="email" name="email"  value={email} onChange={(e)=>setEmail(e.target.value)}
    autoComplete="off" placeholder="Your Email" class="form-control" id="email"/>
  </div>







  <div class="col-md-8">
    <label htmlFor="password" class="form-label">Password
    <i class="zmdi zmdi-lock"></i>
    </label>
    <input type="text" id="password" name="password" 
    value={password} onChange={(e)=>setPassword(e.target.value)}
    autoComplete="off" placeholder="Your Passsword" class="form-control" />
  </div>



 

  
 
  
  <div class="col-12 mt-2 text-center">
    <button type="submit" name="signin" onClick={loginUser} id="signin" class="form-submit btn btn-primary" value="login">Log In</button>
  </div>
</form>




          </div>
          <div className="col-lg-4">
              <img src={loginpic} alt="" className="mt-5 mb-5" width="100%" height="400px"/>
              <NavLink to="/signup" >Create Account</NavLink>

          </div>
      </div>

       </div>


    </>



    )
}

export default Login;