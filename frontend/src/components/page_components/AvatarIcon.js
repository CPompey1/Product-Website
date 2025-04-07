import { Avatar } from '@mui/material'
import React from 'react'
import './AvaterIcon.css'
export default function AvatarIcon(imgSrc) {

  if (imgSrc != null){
    <div className='avatar-container'>
        <Avatar src={imgSrc}></Avatar>
    </div>
  }
  return (
    <div className='avatar-container'>
        <Avatar></Avatar>
    </div>
  )
}
