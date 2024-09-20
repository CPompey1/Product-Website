import React from 'react';
import './Footer.css';

function SocialIcon({ src, alt }) {
  return (
    <a href="#" aria-label={alt}>
      <img loading="lazy" src={src} alt={alt} className={'socialIcon'} />
    </a>
  );
}

export default SocialIcon;