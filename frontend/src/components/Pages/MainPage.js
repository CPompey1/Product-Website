import React from 'react'
import validateUser from '../../util/accounts_manager'
import Header from '../page_components/Header'
import LogoSection from '../page_components/LogoSection'
import Navigation from '../page_components/Navigation'
import Footer from '../page_components/Footer'
import ProductList from '../page_components/ProductList'

export default function MainPage() {
    var a = validateUser()
    return (
        <div>
            <Header/>
            <LogoSection
                src="https://cdn.builder.io/api/v1/image/assets%2F6a53bff92dc24a62b49604417a4ec7f2%2F081600701cd246c09e2ac06a37be697f"
                alt="Logo"
            />
            <Navigation />
            <ProductList
                endPoint="/api/product_list"
            />
            <Footer/>
            {/* <BuilderComponent model='test-builder-page'></BuilderComponent> */}
        </div>
    
    )
}
