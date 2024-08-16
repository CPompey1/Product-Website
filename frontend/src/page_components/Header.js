import React from 'react'
import './Header.css'
import LogRegHeaderLink from './LogRegHeaderLink'
import { Avatar } from '@mui/material'
import AvatarIcon from './AvatarIcon'
export default function Header() {
  return (
    <>
      
      <header className="main-header">
          <section className="header-content">
            <LogRegHeaderLink/>
            
            <AvatarIcon/>
          </section>
          
      </header>
    </>
  )
}
