import React from 'react'
import './LogoSection.css'
export default function LogoSection({src,alt}) {
  return (
    <div className="image-section">
      <a href='/'>
        <img loading="lazy" src={'/frontend/public/E-Bazzar_Logo.png'} alt={alt} className="full-width-image" />
      </a>
    </div>
  )
}
