import React from 'react'
import Header from '../page_components/Header'
import { LOGO_URL } from '../../globals'
import UserOrderTracker from '../page_components/OrderTracking/UserOrderTracker'
import Navigation from '../page_components/Navigation'
import Footer from '../page_components/Footer'
import LogoSection from '../page_components/LogoSection'

export default function ProductOrderPage({orderId}) {
  return (
   <>
    <Header/>
    <LogoSection
        src={LOGO_URL}
        alt="Logo"
    />
    <Navigation/>
    <UserOrderTracker orderId={orderId}/>
    <Footer/>   
   </>
  )
}
