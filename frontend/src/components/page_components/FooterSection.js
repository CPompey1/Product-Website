import React from 'react';
import './Footer.css';

const FooterSection = ({ title, items }) => {
  return (
    <section className={'footerSection'}>
      <h4 className={'sectionTitle'}>{title}</h4>
      <ul className={'sectionList'}>
        {items.map((item, index) => (
          <li key={index} className={'sectionItem'}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

export default FooterSection;