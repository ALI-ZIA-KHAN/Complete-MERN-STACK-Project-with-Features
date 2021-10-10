import React from "react";
import { NavLink } from "react-router-dom";

const Errorpage = () => {
    return(
        <>
     <h1>Error PAGE</h1>
     <h2>Sorry</h2>
     <NavLink to='/'>Back to homepage</NavLink>
     </>
    )
}

export default Errorpage;