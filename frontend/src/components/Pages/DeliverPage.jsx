import React from 'react'
import validateUser from '../../util/accounts_manager'
import { Navigate } from 'react-router-dom'
import Header from '../page_components/Header'
import Footer from '../page_components/Footer'
import Navigation from '../page_components/Navigation'
import LogoSection from '../page_components/LogoSection'
import { LOGO_URL } from '../../globals'
export default function DeliveriesPage() {
    var userValid = validateUser()
    if (userValid === false) {
        return <Navigate to="/login_account" />
    }
  return (
    <>
    
        <Header/>
        <LogoSection
            src={LOGO_URL}
            alt="Logo"
        />
        <Navigation />
        <div>DeliveriesPage</div>

        <Footer/>
    </>
  )
}
