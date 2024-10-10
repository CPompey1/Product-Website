import React from 'react'
import './Header.css'
import LogRegHeaderLink from './LogRegHeaderLink'
import { Avatar } from '@mui/material'
import AvatarIcon from './AvatarIcon'
import validateUser from '../../util/accounts_manager'
import { useState } from 'react'
export default function Header() {

  const [profileImg,setProfileImg] = useState('')
  var fetchResult
  var userLoggedIn

  const fetchData = async () => {
     userLoggedIn = await validateUser()

    if (userLoggedIn) {
      fetchResult = await fetch ("/get_profile_pic", {
        method: 'POST'
      })

      if (fetchResult.ok){
        setProfileImg(await fetchResult.json()['img'])
      }
 
    }  

    
  }
  fetchData()
  
  // if (userLoggedIn) {


  //   return (
  //     <>      
  //       <header className="main-header">
  //           <section className="header-content">
          
  //             <AvatarIcon imgSrc={profileImg}/>
  //           </section>
            
  //       </header>
  //   </>    
  //   )
  // } 
  return (
    <>
      
      <header className="main-header">
          <section className="header-content">
            
            {userLoggedIn ? (<div/>):(<LogRegHeaderLink/>)}
            
            {userLoggedIn ? (<a href='/'> <AvatarIcon/> </a>):(<div/>)}
            
          </section>
          
      </header>
    </>
  )
}
