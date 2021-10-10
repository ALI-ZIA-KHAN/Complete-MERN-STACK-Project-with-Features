import { useEffect, useState } from "react";
import React from 'react';


const Home = ()=>{


    

    
    const [username,setUserName]=useState("");
    const [show,setShow]=useState(false);
   


    
    const userHomepage= async ()=>{
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
        setUserName(data.name);
        setShow(true);
    
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
        userHomepage();   //what we call here it get trif=ggers after page reload
    },[]);
    
    
    
    


    return(
    <>

<div className="container-fluid">

    <div className=" align-content-center h-100 row">
        <div className="col-lg-6  bg-info">
   <h1 className="text-end">Welcome to</h1>
   <h1>{username}</h1>
   <h2>{show ? 'Happy to see you back' :"We are MERN developer" }</h2>
        </div>
        <div className="col-lg-6 bg-primary">
<h1 className="text-start">Our World</h1>
        </div>
    </div>
</div>



    </>



    )
}

export default Home;