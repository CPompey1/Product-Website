import React, { useState } from "react";
import './RegisterLogin.css';
import { BuilderComponent } from "@builder.io/react";
import { Navigate, useNavigate } from "react-router-dom";
import MainPage from "../Pages/MainPage";
// import FormInput from './FormInput';

const FormInput = ({ name, placeholder, type, onChangeF, required, value }) => {
    return (

      <>
        {/* <BuilderComponent model="test-builder-page"></BuilderComponent> */}
        <label htmlFor={name} className={'visually-hidden'}>{name}</label>
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          className={'formInput'}
          required={required}
          onChange={onChangeF}
        />
      </>
    );
};


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
  const [formState, setFormState] = useState('unsubmitted');
  const [response, setResponse] = useState([{}])
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
      const formData = new FormData()
      formData.append("User",inputs.User)
      formData.append("Email", inputs.Email)
      formData.append("Password",inputs.Password)

      const fetchResult = await fetch("/register_account",{
        method: 'POST',
        body: formData
      })
      // const jsonResult = await fetchResult.json()
      // setResponse(jsonResult)
      console.log(fetch)
  }
    fetchData()
   
    navigate('/')
      
  };

  const renderMessage = () => {
    switch (formState) {
      case 'success':
        return <div className={'messageContainer'}>Thanks!</div>;
      case 'error':
        return <div className={'messageContainer'}>Form submission error :( Please check your answers and try again</div>;
      case 'sending':
        return <div className={'messageContainer'}>Sending...</div>;
      default:
        return null;
    }
  };

  if (invalidPassword){
    return (
      <InvalidPassword/>
    )
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="formContainer">
        <h2 className={'formLabel'}>Email</h2>
        <FormInput name="Email" placeholder="janedoe@example.com" type="Email" value={inputs.Email} onChangeF={handleChange} required />
        
        <h2 className={'formLabel'}>User</h2>
        <FormInput name="User" placeholder="" type="User" value={inputs.User} onChangeF={handleChange} required  />

        <h2 className={'formLabel'}>Password</h2>
        <FormInput name="Password" placeholder="" type="Password" value={inputs.Password} onChangeF={handleChange} required />
        
        <h2 className={'formLabel'}>Retype Password</h2>
        <FormInput name="Password_re" placeholder="" type="Password" value={inputs.Password_re} onChangeF={handleChange} required />
        
        {/* <button type="submit" className={'submitButton'} button/> */}
        {/* <input type="submit" /> */}
        <button className={'submitButton'} >
          <a className="submitButtonText">Register</a>
        </button>
        {/* <BuilderComponent model='test-builder-page'></BuilderComponent> */}
        {/* {renderMessage()} */}
      </form>
    </div>
  );
};

// export default RegisterAccount;