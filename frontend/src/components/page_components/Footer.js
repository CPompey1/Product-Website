import React from 'react';
import './Footer.css'
import FooterSection from './FooterSection';
import SocialIcon from './FooterSocialIcon';
import { BuilderComponent } from '@builder.io/react';

export default function Footer () {
const socialIcons = [
    { src: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Ff55f1d07ed3049709cd368e7d5decc35", alt: "Social media icon 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F46557d6209db4923a0ff7d03e5be474e", alt: "Social media icon 2" },
    { src: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Ff566f9ad25164e378c0aae1e1292239e", alt: "Social media icon 3" }
    ];
    
    const navItems = [
    { title: "About Us", items: ["About Us", "Contact"] },
    { title: "Help", items: ["FAQs", "Shipping & Returns", "Privacy Policy", "Terms of Service"] }
    ];

  return (
    <>
        {/* <BuilderComponent model='test-builder-page'/> */}
        <div className={'footer'}>
            <div className={'logoContainer'}>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets%2F6a53bff92dc24a62b49604417a4ec7f2%2Fc18f62248cbb4d0c8ca7c9c848550237" alt="Company logo" className={'logo'} />
            </div>
            
        
            {navItems.map((column, index) => (
            <nav key={index} className={'navColumn'}>
                <h2 className="visually-hidden">{column.title}</h2>
                <ul className={'navList'}>
                {column.items.map((item, itemIndex) => (
                    <li key={itemIndex} className={'navItem'}>
                    <a href="#" className='navItemText' aria-label={item}>{item}</a>
                    </li>
                ))}
                </ul>
            </nav>
            ))}
        </div>
    </>
  );
};
