import React from 'react'
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Navigation.css'
import backendUrl from '../../globals';
import Button_b from './global_components/Button_b/Button_b';
import { Button, Grid2 as Grid, ThemeProvider} from '@mui/material';
import { theme } from '../../globals';
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
      <div className="navigation">
        <Grid container spacing={2} className="button-section">
          <Grid item xs={4}>
            <Button_b action={clickCategories} openLinkInNewTab={false}> Categories </Button_b>
          </Grid>
          <Grid item xs={4}>
            <Button_b action={clickStores} openLinkInNewTab={false}> Stores </Button_b>
          </Grid>
          <Grid item xs={4}>
            <Button_b action={clickSell} openLinkInNewTab={false}> Sell </Button_b>
          </Grid>
        </Grid>
      </div>
    );
}
  
  export default Navigation;