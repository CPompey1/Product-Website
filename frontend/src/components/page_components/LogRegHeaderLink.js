import React from 'react'
import './LogRegHeaderLink.css'
function LogRegHeaderLink ({isWebview}) {
  return (
    <div className='container-class'>
            <a className='text' href={isWebview ? "/m/login" : "/login_account "}>Login </a>
            <a className='text'> </a>
        
            <a className='text'>  / </a>
            <a> </a>
            <a className='text' href={ isWebview ? "/m/register" : "/register"}> Register</a>
    </div>
  )
};

function LogoutHeaderLink () {
  
  const logout = async () => {
    await fetch("/api/accounts/logout", {
      method: 'POST'
    })
    window.location.reload()
  }

  return (
    <div>
        <a className='text' onClick={logout}> Logout</a>
    </div>
  )
}
export {LogoutHeaderLink}
export default LogRegHeaderLink
