import React, { Component, createContext, useReducer } from 'react';
import {Route,Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
/*it was all working fine for me without  including above bootstrap line what I think*/

import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout.jsx';
import { initialState,reducer } from './reducer/UseReducer';






// 1:contextapi */}

export const UserContext=createContext();


const Routing=()=>{
  return(
    
  <Switch>


  <Route exact path="/">
    <Home/>
  </Route>

  <Route path="/about">
    <About/>
  </Route>

  <Route path="/contact">
    <Contact/>
  </Route>

  <Route path="/login">
    <Login/>
  </Route>


  <Route path="/signup">
    <Signup/>
  </Route>



  <Route path="/logout">
    <Logout/>
  </Route>


  <Route >
    <Errorpage/>
  </Route>
  </Switch>

  )
}
const App=()=>{

// initialstate vallue will be the value of state
// this state can be used in ay Component(best part)
// reducer contains state and action
// dispatch mn if anything changes reducer will called which uses action methid to change state acc
  

 const [state,dispatch]=useReducer(reducer,initialState)
  return(
    
    <>
 {/* hr ek route ko do value ppass krdin state and dispatch */}

    <UserContext.Provider value={{state,dispatch}}> 

  <Navbar/>
  <Routing/>

  </UserContext.Provider>
 

    </>
  )
}

export default App;