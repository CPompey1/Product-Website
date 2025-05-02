import React, { useEffect } from 'react'
import './Header.css'
import LogRegHeaderLink, { LogoutHeaderLink } from './LogRegHeaderLink'
import { Avatar } from '@mui/material'
import validateUser from '../../util/accounts_manager'
import { useState } from 'react'
import { Dehaze, DehazeSharp } from '@mui/icons-material'
import SlidingPanel from 'react-sliding-side-panel'

export default function Header({isWebview, sidePanelCallback}) {

  const [profileImg,setProfileImg] = useState('')
  const [userLoggedIn,setUserLoggedIn] = useState(false)
  console.log("sidePanelCallback", sidePanelCallback)

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
  
  const testLog = (event) => {
    console.log("test log")
  }

  return (
    <>
      {/* {isMobile ? (<></>) : */}
      <header className="main-header">
          <section className="header-content">
            
            {userLoggedIn ? (<></>):(<LogRegHeaderLink isWebview={isWebview}/>)}
            
            {userLoggedIn ? 
              <> 
                <a className="logout-link">
                   <LogoutHeaderLink/> 
                </a>
                <Avatar sx={{cursor: 'pointer'}} onClick={sidePanelCallback} />
              </>
            :<DehazeSharp sx={{ color: 'white', cursor: 'pointer' }} onClick={sidePanelCallback} />}
            
          </section>
      </header>
      
    </>
  )
}
