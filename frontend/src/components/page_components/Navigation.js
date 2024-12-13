import React from 'react'
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Navigation.css'
import backendUrl from '../../globals';


function Navigation () {
    const navigate = useNavigate();
    const clickSell = () => {
        navigate('/add_product');
      };
    
    const clickCategories = () => {
      navigate('/category_page')
    };

    const clickStores = () => {
      navigate('/stores')
    }

    const clickDeliver = () => {
      navigate('/deliver')
    }
    return (
      <>
        <section className="button-section">
          <div className="button-group">
            
              <div className="button-column">
                <Button action={clickCategories} openLinkInNewTab={false} className={"action-button"}>Categories</Button>
              </div>
      
              <div  className="button-column">
                <Button action={clickStores} openLinkInNewTab={false} className={"action-button"}>Stores</Button>
              </div>
      
              <div className="button-column">
                <Button action={clickSell} openLinkInNewTab={false} className={"action-button"}>Sell</Button>
              </div>

              <div  className="button-column">
                <Button action={clickDeliver} openLinkInNewTab={false} className={"action-button"}>Deliver</Button>
              </div>
              
          </div>
        </section>
      </>
    );
}
  
  const Button = ({ children, openLinkInNewTab, action, className }) => (
    <button className={className} target={openLinkInNewTab ? "_blank" : "_self"} onClick={action}>
      {children}
    </button>
  );
  export default Navigation;
  export { Button };