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
                <Button action={clickCategories} openLinkInNewTab={false}>Categories</Button>
              </div>
      
              <div  className="button-column">
                <Button action={clickStores} openLinkInNewTab={false}>Stores</Button>
              </div>
      
              <div className="button-column">
                <Button action={clickSell} openLinkInNewTab={false}>Sell</Button>
              </div>

              <div  className="button-column">
                <Button action={clickDeliver} openLinkInNewTab={false}>Deliver</Button>
              </div>
              
          </div>
        </section>
      </>
    );
}
// const Navigation = () => (
    // <div className="button-group">
    //   {/* {[1, 2, 3].map((index) => (
    //     <div key={index} className="button-column">
    //       <Button openLinkInNewTab={false}>Click me!</Button>
    //     </div>
    //   ))} */}

    //     <div className="button-column">
    //       <Button openLinkInNewTab={false}>Click me!</Button>
    //     </div>

    //     <div  className="button-column">
    //       <Button openLinkInNewTab={false}>Click me!</Button>
    //     </div>

    //     <div className="button-column">
    //       <Button action= openLinkInNewTab={false}>Sell</Button>
    //     </div>
    // </div>
//   );
  
  const Button = ({ children, openLinkInNewTab, action }) => (
    <button className="action-button" target={openLinkInNewTab ? "_blank" : "_self"} onClick={action}>
      {children}
    </button>
  );
  export default Navigation;