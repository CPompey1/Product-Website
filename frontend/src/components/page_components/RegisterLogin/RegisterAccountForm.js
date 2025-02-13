import React, { useState } from "react";
import './RegisterLogin.css';
import { BuilderComponent } from "@builder.io/react";
import { Navigate, useNavigate } from "react-router-dom";
import FormInput, { InputLabel } from "../global_components/Forms/FormInput";
const InvalidPassword = () => {
  return (
    <>
      <div className='messageContainer'>
          <h2 className="invalidPasswordHeader"> Invalid Password</h2>
          <button className={'submitButton'} >
            <a href='/register' className="submitButtonText">Retry</a>
          </button>
      </div>
    </>
  )
}

export default function RegisterAccountForm() {
  const [inputs,setInputs] = useState({})
  const [invalidPassword,setInValid] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("in handle change")
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async  (event) => {

    if (inputs.Password != inputs.Password_re){
      setInValid(true)
      return
    }
    
    const fetchData = async () => {

      const fetchResult = await fetch("/register_account",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: inputs.user,
          email: inputs.email,
          password: inputs.password
        })
      })
      console.log(fetchResult)
  }
    fetchData()
   
    navigate('/')
      
  };

  if (invalidPassword){
    return (
      <InvalidPassword/>
    )
  }
  return (
    <div>
      <div onSubmit={handleSubmit} className="formContainer">
        <InputLabel name="Email"/>
        <FormInput name="email" placeholder="janedoe@example.com" type="Email" value={inputs.Email} onChangeF={handleChange} required />
        
        <InputLabel name="User"/>
        <FormInput name="user" placeholder="" type="User" value={inputs.User} onChangeF={handleChange} required  />

        <InputLabel name="Password"/>
        <FormInput name="password" placeholder="" type="Password" value={inputs.Password} onChangeF={handleChange} required />
        
        <InputLabel name="Password_re"/>
        <FormInput name="password_re" placeholder="" type="Password" value={inputs.Password_re} onChangeF={handleChange} required />
        
        <button className={'submitButton'} onClick={handleSubmit}>
          <a className="submitButtonText">Register</a>
        </button>

      </div>
    </div>
  );
};

// export default RegisterAccount;