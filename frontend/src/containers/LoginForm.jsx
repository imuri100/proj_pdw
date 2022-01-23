import React, { useState,useEffect } from "react";
import axios from "axios";
import FormInput from "../components/FormInput"
import FormButton from "../components/FormButton"
import { useNavigate } from 'react-router-dom';
import validate from "../utils/validateLoginSignUp"



/* eslint-disable */

const LoginForm = (props) =>{
    const navigate=useNavigate()
    const initialValues = {email: "",password:""}
    const [user, setUserValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)
    
    
    const onSubmit = async (event) => {
        console.log("s")
        event.preventDefault();
        setFormErrors(validate(user))
        setIsSubmit(true)
    };

    useEffect(() =>{
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log("hello")
          axios
          .post("http://localhost:8000/login", {
            ...user,
            
          },)
          .then((res) => {
            localStorage.setItem('myData', res.data.token);
            navigate("/dashboard")
          });
        }
      },[formErrors])
  

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setUserValues({...user,[name]:value})
  
      }
  

    return(
      <div id="loginform">
        <h2 id="headerTitle">XPense Login</h2>
        <form onSubmit={onSubmit}>
      <FormInput description="Email" formErrors={formErrors} handleChange={handleChange} name="email" val={user.email} type="text" />
      <FormInput description="Password" formErrors={formErrors} name="password" handleChange={handleChange} val={user.password}  type="password"/>
      <FormButton title="Log in"/>
      <div className="manual-row">
      <p>Don't have an account yet? <a href="/registo">Sign Up</a></p>
      <p>Forgot your password? <a href="/recuperacao">Retrieve Password</a></p>
      </div>
      </form>
    </div>
  
)
}

export default LoginForm