import React, { useState } from "react";
import './RegisterAccount.css';
import { BuilderComponent } from "@builder.io/react";
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

export default function RegisterAccountForm() {
  const [formState, setFormState] = useState('unsubmitted');
  const [response, setResponse] = useState([{}])
  const handleSubmit = (event) => {

      const submitData = async () => {
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify(formState)
        };
        console.log(requestOptions)
        const fetchResult = await fetch("/register_product",requestOptions)
        const jsonResult = await fetchResult.json()
        setResponse(jsonResult)

        console.log(jsonResult)
      }
      submitData()
      
    event.preventDefault();
    setFormState('sending');
    // Simulating form submission
    setTimeout(() => {
      setFormState('success');
    }, 2000);
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

  return (
    <form action="/register_account" method="post" className={'formContainer'}>
      <h2 className={'formLabel'}>Email</h2>
      <FormInput name="email" placeholder="janedoe@example.com" type="email" required />
      
      <h2 className={'formLabel'}>Password</h2>
      <FormInput name="password" placeholder="" type="password" required />
      
      <h2 className={'formLabel'}>Retype password</h2>
      <FormInput name="password_re" placeholder="" type="password" required />
      
      <button type="submit" className={'submitButton'} button/>
      
      {renderMessage()}
    </form>
  );
};

// export default RegisterAccount;