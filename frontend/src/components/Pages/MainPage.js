import React, { useState } from 'react'
import validateUser from '../../util/accounts_manager'
import Header from '../page_components/Header'
import LogoSection from '../page_components/LogoSection'
import Navigation from '../page_components/Navigation'
import Footer from '../page_components/Footer'
import ProductList from '../page_components/ProductList'
import { LOGO_URL } from '../../globals'
import SlidingPanel from 'react-sliding-side-panel'
import { Button, Drawer } from '@mui/material'

export default function MainPage() {
    const [openPanel, setOpenPanel] = useState(false);
    const [sideBarState, setSideBarState] = useState(false);


    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setSideBarState({ ...sideBarState, [anchor]: open });
      };

    return (
        <div>
            <Header/>
            
               
                
            <LogoSection
                src={LOGO_URL}
                alt="Logo"
            />
            <Navigation/>
            <ProductList
                endPoint="/api/products"
            />
            <Footer/>
            {/* <BuilderComponent model='test-builder-page'></BuilderComponent> */}
            
        </div>
    
    )
}