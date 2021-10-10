import React, { useEffect,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import  {UserContext} from "../App";

const Logout=()=>{




    const {state,dispatch}= useContext(UserContext);




   //now using promises 
   //just to show how u can use prom instead of async await

  const history=useHistory();

   useEffect(()=>{
       fetch("/logout",{
           method:"GET",
           headers:{
               Accept:"application:json",
               "Content-Type":"application/json"
           },
           credentials:"include"
       }).then((res)=>{

          history.push("/login",{replace:false});
         if(res.status!=200){
            dispatch({type:"USER",payload:true})
             const error=new Error(res.error);
             throw error;
         }

       }).catch((err)=>{
           console.log(err);
       })
   })







    return(
        <>
        <h1>Hello from logout</h1>
        </>
    );
}

export default Logout;