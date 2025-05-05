import React from 'react'
import './LogoSection.css'
export default function LogoSection({src,alt,isWebview}) {
  return (
    <div className="image-section">
      <a href={ isWebview ? "/m" : "/"}>
        <img loading="lazy" src={src} alt={alt} className="full-width-image" />
      </a>
    </div>
  )
}
