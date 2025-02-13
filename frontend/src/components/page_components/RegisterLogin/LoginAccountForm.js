import React, { useState } from "react";
import './RegisterLogin.css';
import { useNavigate } from "react-router-dom";
import FormInput from "../global_components/Forms/FormInput";

export default function LoginAccountForm() {
  const [inputs,setInputs] = useState({})

  // 0 = unsubmitted, 1 = submitted, -1 = invalid login
  const [loginState, setLoginState] = useState(0);
  const navigate = useNavigate()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("in handle change")
    setInputs(values => ({...values, [name]: value}))
  }


  const handleSubmit = async () => {
    var data
      if (inputs.email == undefined || inputs.password == undefined){
        setLoginState(-1)
      } 

      const fetchResult = await fetch ("/login_account",{
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
          return navigate('/')
        default:
          setLoginState(0)
      }
      await console.log("Response:" + data)
      return
      
  }

  return (
    <div>
      {loginState == -1 ? (<div>Invalid login</div>) : (<></>)}
      <div className={'formContainer'}>
        <h2 className={'formLabel'}>Email</h2>
        <FormInput name="email" placeholder="janedoe@example.com" type="Email"  value={inputs.email} onChangeF={handleChange} required />

        <h2 className={'formLabel'}>Password</h2>
        <FormInput name="password" placeholder="" type="Password" value={inputs.password} onChangeF={handleChange} required />
        
        <button className={'submitButton'} onClick={handleSubmit}>
          <a className="submitButtonText">Login</a>
        </button>
    
      </div>
    </div>
  );
};

// export default RegisterAccount;