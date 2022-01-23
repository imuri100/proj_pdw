import React from 'react'

const FormInput = props => {
    const {description,name,handleChange,val,type,placeholder,formErrors} = props
    return(
        <div className="manual-row">
          <label>{description}</label>
          {formErrors ? <p className="error-input">{formErrors[name]}</p> : null}
          <input autoComplete="off" name={name} onChange={handleChange} value={val} type={type} placeholder={placeholder}/>
        </div>  
      );
}

  export default FormInput