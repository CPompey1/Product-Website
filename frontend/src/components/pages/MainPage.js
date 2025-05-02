import React, { useState } from 'react'
import validateUser from '../../util/accounts_manager'
import Header from '../page_components/Header'
import LogoSection from '../page_components/LogoSection'
import Navigation from '../page_components/Navigation'
import Footer from '../page_components/Footer'
import ProductList from '../page_components/ProductList'
import { LOGO_URL } from '../../globals'
import SlidingPanel from 'react-sliding-side-panel'

export default function MainPage() {
    const [openPanel, setOpenPanel] = useState(true);
    
    const handleToolbarClick = (event) => {
        event.stopPropagation();
        setOpenPanel(!openPanel)
        console.log("Toolbar clicked")
    }
    console.log("handleToolbarClick:", handleToolbarClick);
    return (
        <div>
            <Header sidePanelCallback={handleToolbarClick} />

            <div>
                <SlidingPanel
                    type={'left'}
                    isOpen={openPanel}
                    size={30}
                >
                    <div>
                        <div>My Panel Content</div>
                        <button onClick={() => setOpenPanel(false)}>close</button>
                    </div>
                </SlidingPanel>
            </div>
            <LogoSection
                src={LOGO_URL}
                alt="Logo"
            />
            <Navigation/>
            <ProductList
                endPoint="/api/products/product_list"
            />
            <Footer/>
            {/* <BuilderComponent model='test-builder-page'></BuilderComponent> */}
            
        </div>
    
    )
}
