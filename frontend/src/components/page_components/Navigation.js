import React from 'react'
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Navigation.css'
import backendUrl from '../../globals';
import Button_b from './global_components/Button_b/Button_b';
import { Button, Grid2 as Grid, ThemeProvider} from '@mui/material';
import { theme } from '../../globals';
function Navigation ({isWebview}) {
  
    const navigate = useNavigate();
    const clickSell = () => {
        navigate(isWebview ? '/m/sellers_home' : '/sellers_home');
      };
    
    const clickCategories = () => {
      navigate(isWebview ? '/m/category_page' : '/category_page')
    };

    const clickStores = () => {
      navigate(isWebview ? '/m/stores' :  '/stores')
    }

    const clickDeliver = () => {
      navigate('/deliver')
    }

    const clickHome = () => {
      RegisterLoginJsInterface.returnToMainActivity()
    }
    return (
      <div className="navigation">
        <Grid container spacing={2} className="button-section">
          <Grid item xs={isWebview ? 3 : 4}>
            <Button_b action={clickCategories} openLinkInNewTab={false}> Categories </Button_b>
          </Grid>
          <Grid item xs={isWebview ? 3 : 4}>
            <Button_b action={clickStores} openLinkInNewTab={false}> Stores </Button_b>
          </Grid>
          <Grid item xs={isWebview ? 3 : 4}>
            <Button_b action={clickSell} openLinkInNewTab={false}> Sell </Button_b>
          </Grid>
          {isWebview && <Grid item xs={3}>
            <Button_b action={clickHome} openLinkInNewTab={false}> Home </Button_b>
          </Grid>}
        </Grid>
      </div>
    );
}
  
  export default Navigation;