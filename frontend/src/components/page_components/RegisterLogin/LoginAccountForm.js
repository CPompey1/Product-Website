import React, { useState } from "react";
import './RegisterLogin.css';
import { useNavigate } from "react-router-dom";
import FormInput , { InputLabel, ReturnToMainActivity, ReturnToMainActivityButton } from "../global_components/Forms/FormInput";

export default function LoginAccountForm({isWebview}) {
  const [inputs,setInputs] = useState({})

  // 0 = unsubmitted, 1 = submitted, -1 = invalid login
  const [loginState, setLoginState] = useState(0);
  const navigate = useNavigate()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }


  const handleSubmit = async () => {
    var data
      if (inputs.email == undefined || inputs.password == undefined){
        setLoginState(-1)
      } 

      const fetchResult = await fetch ("/api/accounts/login_account",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:inputs.email,password:inputs.password}),
      })

      console.log("Fetch result:" + fetchResult)
      switch (fetchResult.status) {
        case 401:
          setLoginState(-1)
          break;
        case 200:
          setLoginState(1)
        default:
          setLoginState(0)
      }
      if (fetchResult.ok  && isWebview){
        RegisterLoginJsInterface.loginClicked()
      } else if (fetchResult.ok){
        navigate('/')
      }
      await console.log("Response:" + data)
      return
      
  }

  return (
    <div>
      {loginState == -1 ? (<div>Invalid login</div>) : (<></>)}
      <div className='formContainer'>
        <InputLabel name="Email"/>
        <FormInput name="email" placeholder="janedoe@example.com" type="Email"  value={inputs.email} onChangeF={handleChange} required />
        
        <InputLabel name="Password"/>
        <FormInput name="password" placeholder="" type="Password" value={inputs.password} onChangeF={handleChange} required />
        
        <button className={'submitButton'} onClick={handleSubmit}>
          <a className="submitButtonText">Login</a>
        </button>

        {isWebview ? <ReturnToMainActivityButton/>: <></>}
      </div>
    </div>
  );
};

// export default RegisterAccount;