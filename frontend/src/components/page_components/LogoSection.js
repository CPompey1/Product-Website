import React from 'react'
import './LogoSection.css'
export default function LogoSection({src,alt}) {
  return (
    <section className="image-section">
      <a href='/'>
        <img loading="lazy" src={src} alt={alt} className="full-width-image" />
      </a>
    </section>
  )
}
