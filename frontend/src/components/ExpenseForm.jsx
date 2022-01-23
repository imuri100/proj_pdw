import React, { useState,useEffect } from "react";
import axios from "axios";
import FormInput from "./FormInput"
import FormButton from "./FormButton"
import Dropdown from "./Dropdown"
import validate from "../utils/validateExpense"

/* eslint-disable */


const ExpenseForm = (props) =>{
    // const navigate=useNavigate()
    const initialValues = {expense: "",value:"",category: "",date:""}
    const [expense, setExpenseValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)

    
    const onSubmit = async (event) => {
        event.preventDefault();
        setFormErrors(validate(expense))
        setIsSubmit(true)
    };

    const expenseOptions = [
        "Leisure","Rent","Bills","Investments",
    ]

    const handleSelectCategory = (e) => {
        setExpenseValues({...expense,category: e})
    }


    useEffect(() =>{
        if(Object.keys(formErrors).length === 0 && isSubmit){

            const token = localStorage.getItem("myData")

            return axios.post(`http://localhost:8000/expense`,{...expense},{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }).then(() => window.location.reload(false))
        }},[formErrors])  

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setExpenseValues({...expense,[name]:value})
  
      }
  

    return(
    <div id="expenseForm">
        <form onSubmit={onSubmit}>
        {formErrors.expense ? <p className="error-input">{formErrors.expense}</p> : null}
        <Dropdown  key={"Expense"}
           label={"Select Expense Category"}
            selected={expense.category}
            dropdownOptions={expenseOptions}
            handleDropdown={handleSelectCategory} 
            />
      <FormInput description="Expense" formErrors={formErrors} handleChange={handleChange} name="expense" val={expense.email} type="text" />
      <FormInput description="Value" formErrors={formErrors} name="value" handleChange={handleChange} val={expense.password}  type="number"/>
      <FormInput description="Date" formErrors={formErrors} name="date" handleChange={handleChange} val={expense.password}  type="date"/>
      <div className="manual-row">
      </div>
      <FormButton title="Add Expense"/>
      </form>
    </div>
)
}

export default ExpenseForm