import React from 'react'
import Header from '../page_components/Header'
import LogoSection from '../page_components/LogoSection'
import Navigation from '../page_components/Navigation'
import { Builder } from '@builder.io/react'
import { LOGO_URL } from '../../globals'
import Footer from '../page_components/Footer'
import { useParams } from 'react-router-dom'
import builder, { BuilderComponent, BuilderPage } from '@builder.io/react'
import { ProductSection } from '../page_components/ProductList'
import CheckoutForm from '../page_components/checkout/CheckoutForm'
export default function ProductPage() {
  const {productId} = useParams();
    return (
    <div>
        <Header/>
        <LogoSection
            src={LOGO_URL}
            alt="Logo"
          />        
        <Navigation />
        {/* <BuilderComponent model='test-builder-page'></BuilderComponent> */}
        <CheckoutForm productId={productId}/>
        <Footer/>
    </div>
  )
}
