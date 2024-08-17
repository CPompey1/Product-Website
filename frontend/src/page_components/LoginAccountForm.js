import React, { useState } from "react";
import './LoginPage.css';
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
      
      <button type="submit" className={'submitButton'} button/>
      
      {renderMessage()}
    </form>
  );
};

// export default RegisterAccount;