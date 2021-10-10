import React, { useEffect,useState } from 'react';
import aboutpic from '../images/about.png';
import alipic from '../images/ali.jpeg';
import { useHistory } from 'react-router-dom';

const About = ()=>{


  

const history=useHistory();
const [userData,setUserData]=useState({})

const callAboutPage = async ()=>{
    try{

        const res = await fetch('/about',{
        method:"GET",
        headers: {
      
        Accept: "application/json",
        "Content-Type": "application/json",
        },
        credentials: "include", //to let cookies to backend
        });

    // const data=await JSON.parse(JSON.stringify(res));
    const data = await res.json();
    console.log(data)
    setUserData(data)

        if(!res.status === 200){
            const error= new Error(res.error);
            throw error;
        }

    }catch(err){

      //if user hasn't even logged in

        console.log(err);
        history.push('/login');
    }
}



useEffect(()=>{
    callAboutPage();   //what we call here it get trif=ggers after page reload
},[]);





    return(
    <>

  <div className="container">

   <form action="" method="GET">
<div className=" row mt-2 ">
<div className="col-md-4">
    <div className="profile-img">
    <img src={userData.name === 'asad' ? alipic:aboutpic} width="200px" height="200px" alt="" />

    </div>
</div>

<div className="col-md-6">
    <div className="profile_head">
        <h5>{userData.name}</h5>
        <h6>{userData.work}</h6>
        <p>RANKINGS <span>1/10:</span></p>



        <ul className="nav nav-tabs" role="tablist">
  <li className="nav-item">
    <a className="nav-link active" id="home-tab" data-toggle="tab"  href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
  </li>
  <li className="nav-item">
  <a className="nav-link " id="profile-tab" data-toggle="tab"  href="#profile" role="tab"  aria-controls="profile" aria-selected="true">Profile</a>

  </li>
  
</ul>


    </div>

</div>


<div className="col-md-2">
<input type="submit" className="profile-edit-button"  name="btnAddMore" value="Edit Profile" />
</div>


</div>


<div className="row">
    <div className="col-md-4">
        <div className="profile-work">
            <p>Work Link</p>
            <a href="www.google.com" target="_blank">You Tube</a> <br />
            <a href="www.google.com" target="_blank">You Tube</a> <br />
            <a href="www.google.com" target="_blank">You Tube</a> <br />
            <a href="www.google.com" target="_blank">You Tube</a> <br />
            <a href="www.google.com" target="_blank">You Tube</a> <br />
            <a href="www.google.com" target="_blank">You Tube</a> <br />

            <a href="www.google.com" target="_blank">You Tube</a> <br />

        </div>
    </div>
    <div className="col-md-8 pl-5 about-info">

    <div className="tab-content  profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>User  ID

                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            <label >
                                                <p>75655454854854</p>
                                            </label>
                                        </div>

                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label>Name

                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            <label >
                                                <p>to have any attribute</p>
                                            </label>
                                        </div>

                                    </div>


                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label>Name

                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            <label >
                                                <p>{userData.name}</p>
                                            </label>
                                        </div>

                                    </div>


                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label>Profession

                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                          <p>{userData.work}</p>
                                            
                                        </div>

                                    </div>


                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label>Name

                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            
                                                <p>Ali Zia Khan</p>
                                          
                                        </div>

                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label>Name

                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            
                                                <p>Ali Zia Khan</p>
                                            
                                        </div>

                                    </div>

                                </div>




                                <div className="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab" >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Engineering

                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            <label >
                                                <p>Neduet</p>
                                            </label>
                                        </div>

                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label>Dept

                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            <label >
                                                <p>Software</p>
                                            </label>
                                        </div>

                                    </div>


                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label>Section

                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            <label >
                                                <p>B</p>
                                            </label>
                                        </div>

                                    </div>


                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label>Roll No

                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            <label >
                                                <p>FIFTY TWO</p>
                                            </label>
                                        </div>

                                    </div>


                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label>Name

                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            <label >
                                                <p>Ali Zia Khan</p>
                                            </label>
                                        </div>

                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label>Name

                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            <label >
                                                <p>Ali Zia Khan</p>
                                            </label>
                                        </div>

                                    </div>

        </div>


    </div>
    </div>




</div>

   </form>


  </div>

    </>



    )
}

export default About;