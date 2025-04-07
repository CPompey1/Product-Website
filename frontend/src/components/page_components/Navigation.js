import React from 'react'
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Navigation.css'
import backendUrl from '../../globals';
import Button_b from './global_components/Button_b/Button_b';

function Navigation () {
    const navigate = useNavigate();
    const clickSell = () => {
        navigate('/sellers_home');
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
                <Button_b action={clickCategories} openLinkInNewTab={false}>Categories</Button_b>
              </div>
      
              <div className="button-column">
                <Button_b action={clickStores} openLinkInNewTab={false}>Stores</Button_b>
              </div>
      
              <div className="button-column">
                <Button_b action={clickSell} openLinkInNewTab={false} >Sell</Button_b>
              </div>

              {/* <div  className="button-column">
                <Button_b action={clickDeliver} openLinkInNewTab={false}>Deliver</Button_b>
              </div> */}
              
          </div>
        </section>
      </>
    );
}
  
  export default Navigation;