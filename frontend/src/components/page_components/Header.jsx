import React, { useEffect } from 'react'
import './Header.css'
import LogRegHeaderLink, { LogoutHeaderLink } from './LogRegHeaderLink'
import { Avatar } from '@mui/material'
import validateUser from '../../util/accounts_manager'
import { useState } from 'react'
export default function Header() {

  const [profileImg,setProfileImg] = useState('')
  var fetchResult
  const [userLoggedIn,setUserLoggedIn] = useState(false)

useEffect(() => {
  const checkUserLoggedIn = async () => {
    const loggedIn = await validateUser()
    setUserLoggedIn(loggedIn)
    fetchData()
  }
  checkUserLoggedIn()
},[])

const fetchData = async () => {
  if (userLoggedIn) {
    // TODO: Endpoint needs to be implmeneted
    fetchResult = await fetch ("/get_profile_pic", {
      method: 'POST'
    })

    if (fetchResult.ok){
      setProfileImg(await fetchResult.json()['img'])
    }
  }  
}
  
  
  return (
    <>
      
      <header className="main-header">
          <section className="header-content">
            
            {userLoggedIn ? (<></>):(<LogRegHeaderLink/>)}
            
            {userLoggedIn ? (
              <> 
                <a className="logout-link">
                   <LogoutHeaderLink/> 
                </a>
                <a href='/'> <Avatar/> </a>
              </>
            ):(<div/>)}
            
          </section>
          
      </header>
    </>
  )
}
