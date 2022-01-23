/* eslint-disable */
import React, { useState,useEffect } from "react";
import axios from "axios";
import FormInput from "../components/FormInput"
import FormButton from "../components/FormButton"
import { useNavigate } from 'react-router-dom';
import validate from "../utils/validateLoginSignUp"





const RegisterForm = (props) =>{
    const navigate=useNavigate()
    const initialValues = {email: ""}
    const [user, setUserValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)

    const onSubmit = async (event) => {
      event.preventDefault();
      setIsSubmit(true)
    };

    useEffect(() =>{
      if(Object.keys(formErrors).length === 0 && isSubmit){
        axios
        .put("http://localhost:8000/forgot", {
          ...user,
        })
        .then((res) => {
          setTimeout(() =>{
            navigate("/");
          },1000)
         
        });
      }
    },[formErrors])

    const handleChange = (e) =>{
      const {name,value} = e.target;
      setUserValues({...user,[name]:value})

    }

    

    return(
      <>
      {Object.keys(formErrors).length ===0 && isSubmit ?<div className="signup-success"><p >Check your email!</p></div> : null}
    <div id="signupform">
        <h2 id="headerTitle">XPense Retrieve password</h2>
       
        <form onSubmit={onSubmit}>
      <FormInput description="Email" formErrors={formErrors} name="email" handleChange={handleChange} type="text" val={user.email}/>
      <div className="manual-row">
      <p>Return to login <a href="/">Here</a></p>
      </div>
      
      <FormButton title="Retrieve password"/>
      </form>
    </div>
    </>
)
}

 

      
export default RegisterForm

