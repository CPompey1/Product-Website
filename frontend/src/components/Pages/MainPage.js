import React from 'react'
import validateUser from '../../util/accounts_manager'
import Header from '../page_components/Header'
import LogoSection from '../page_components/LogoSection'
import Navigation from '../page_components/Navigation'
import Footer from '../page_components/Footer'
import ProductList from '../page_components/ProductList'
import { LOGO_URL } from '../../globals'

export default function MainPage() {
    var a = validateUser()
    return (
        <div>
            <Header/>
            <LogoSection
                src={LOGO_URL}
                alt="Logo"
            />
            <Navigation />
            <ProductList
                endPoint="/api/products/product_list"
            />
            <Footer/>
            {/* <BuilderComponent model='test-builder-page'></BuilderComponent> */}
        </div>
    
    )
}
