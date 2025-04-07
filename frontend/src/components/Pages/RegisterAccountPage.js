import { BuilderComponent } from '@builder.io/react'
import React from 'react'
import Header from '../page_components/Header'
import LogoSection from '../page_components/LogoSection'
import Navigation from '../page_components/Navigation'
import Footer from '../page_components/Footer'
import RegisterAccountForm from '../page_components/RegisterLogin/RegisterAccountForm'
import { LOGO_URL } from '../../globals'
export default function RegisterAccountPage() {
  return (
    <>
        <Header/>
        <LogoSection
          src={LOGO_URL}
          alt="Logo"
        />
        <Navigation/>
        <RegisterAccountForm/>
        {/* <BuilderComponent model='test-builder-page'></BuilderComponent> */}
        <Footer/>
    </>
  )
}
