import React from 'react'
import './Header.css'
import LogRegHeaderLink from './LogRegHeaderLink'
import { Avatar } from '@mui/material'
import AvatarIcon from './AvatarIcon'
import validateUser from '../../util/accounts_manager'
import { useState } from 'react'
export default function Header() {

  const [profileImg,setProfileImg] = useState('')
  var userLoggedIn = validateUser()

  const fetchData = async () => {
    const fetchResult = await fetch ("/get_profile_pic", {
      method: 'POST'
    })
    

    if (fetchResult.ok){
       setProfileImg(await fetchResult.json()['img'])
    }

  }
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

            {userLoggedIn ? (<></>):(<LogRegHeaderLink/>)}
            
            {userLoggedIn ? (<AvatarIcon/>):(<></>)}
            
          </section>
          
      </header>
    </>
  )
}
