import React, { useState } from "react";
import './RegisterLogin.css';
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "./Navigation";
// import FormInput from './FormInput';

const FormInput = ({ name, placeholder, type, required }) => {
    return (

      <>
        {/* <BuilderComponent model="test-builder-page"></BuilderComponent> */}
        <label htmlFor={name} className={'visually-hidden'}>{name}</label>
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          className={'formInput'}
          required={required}
        />
      </>
    );
  };

export default function LoginAccountForm() {
  const [formState, setFormState] = useState('unsubmitted');
  const [response, setResponse] = useState([{}])
  const [inputs,setInputs] = useState({})
  const navigate = useNavigate()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("in handle change")
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit1 = (event) => {
    
    const fetchData = async() => {
      const formData = new FormData()
      formData.append("Email",inputs.email)
      formData.append("Password",inputs.password)

      const fetchResult = await fetch ("/api/login_account",{
        method: 'POST',
        body: formData
      })

      console.log("Fetch result:" + fetchResult)
      setResponse(await fetchResult.json())     
      
    }
    fetchData()
    navigate('/')

    //Can check response here if needed
  }

  return (
    <div>
      <form action={handleSubmit1} method="post" className={'formContainer'}>
        <h2 className={'formLabel'}>Email</h2>
        <FormInput name="Email" placeholder="janedoe@example.com" type="Email"  value={inputs.email} onChangeF={handleChange} required />
        
        <h2 className={'formLabel'}>Password</h2>
        <FormInput name="Password" placeholder="" type="Password" value={inputs.password} onChangeF={handleChange} required />
        
        <Button action={handleSubmit1} openLinkInNewTab={false}>Login</Button>
        {/* <button className={'submitButton'}>
          <a className="submitButtonText">Login</a>
        </button> */}
        
        {/* {renderMessage()} */}
      </form>
    </div>
  );
};

// export default RegisterAccount;