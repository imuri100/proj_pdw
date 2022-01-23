/* eslint-disable */
import React, { useState,useEffect } from "react";
import axios from "axios";
import FormInput from "../components/FormInput"
import FormButton from "../components/FormButton"
import { useNavigate } from 'react-router-dom';
import validate from "../utils/validateLoginSignUp"





const RegisterForm = (props) =>{
    const navigate=useNavigate()
    const initialValues = {email: "",password:"",passwordConfirm: ""}
    const [user, setUserValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)

    const onSubmit = async (event) => {
      event.preventDefault();
      setFormErrors(validate(user,"signup"))
      setIsSubmit(true)
    };

    useEffect(() =>{
      if(Object.keys(formErrors).length === 0 && isSubmit){
        axios
        .post("http://localhost:8000/signup", {
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
      {Object.keys(formErrors).length ===0 && isSubmit ?<div className="signup-success"><p >Success!</p></div> : null}
    <div id="signupform">
        <h2 id="headerTitle">XPense SignUp</h2>
       
        <form onSubmit={onSubmit}>
      <FormInput description="Email" formErrors={formErrors} name="email" handleChange={handleChange} type="text" val={user.email}/>
      <FormInput description="Password" formErrors={formErrors} name="password" handleChange={handleChange}  type="password" val={user.password}/>
      <FormInput description="Confirm Password" formErrors={formErrors} name="passwordConfirm" handleChange={handleChange} type="password" val={user.passwordConfirm}/>
      <div className="manual-row">
      <p>Already have an account? <a href="/">Login Here</a></p>
      </div>
      
      <FormButton title="Sign Up"/>
      </form>
    </div>
    </>
)
}

 

      
export default RegisterForm

