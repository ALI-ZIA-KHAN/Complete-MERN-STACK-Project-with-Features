const dotenv=require('dotenv')
const mongoose=require('mongoose')
const cookieParser = require("cookie-parser");
const express =require('express');
const app=express();


dotenv.config({path:'./config.env'});  //.config is a function
//hv to write this line ^^ only once in app.js


require('./db/conn');



app.use(express.json());
//use bcz any it converts json type of data into object to show us


app.use(cookieParser());//tabahi ye nhi lgane ki wja se thi

// const User =require('./model/userSchema');



//we link our router file  to make our route easy
app.use(require('./router/auth'));


const PORT=process.env.PORT;










//Middleware
 

//as to check if user is login or not before he is directed towrds about

// const middleware = (req,res,next)=>{   //next is 3rd arg that can be in middleware to tell whats next thing
//                                        //after middleware's job is completed
   
//     console.log(`hello my middleware`) //this line runs first then about's 


//     next();  //if next() is not there then pg will keep loading when user types about in url
// }














// app.get('/',(req,res)=>{
//     res.send("hello world from server")
// });



//we wwant user logged in bfr about us reaching

// app.get('/about', (req,res)=>{

//     console.log("this line runs after middleware console line runs & then response")
//     res.send("hello world from about")    //middleware will do what's define in function bfr user gets aboutus pg from server
// });






// app.get('/contact',(req,res)=>{
   
//     // res.cookie("test","cookies") //was chking if cookie not stored
//     res.send("hello world from contact")
// });

app.get('/signup',(req,res)=>{
   

    res.send("hello world from signup server")
});


app.get('/signin',(req,res)=>{
   

    res.send("hello world from signin")
});


app.listen(PORT,()=>{
    console.log(`Server is running on port no ${PORT}`)
})