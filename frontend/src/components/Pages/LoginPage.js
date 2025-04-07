import { BuilderComponent } from '@builder.io/react'
import React from 'react'
import Header from '../page_components/Header'
import LogoSection from '../page_components/LogoSection'
import Navigation from '../page_components/Navigation'
import LoginAccountForm from '../page_components/RegisterLogin/LoginAccountForm'
import Footer from '../page_components/Footer'
import { LOGO_URL } from '../../globals'
export default function LoginAccountPage() {
  return (
    <>
        <Header/>
        <LogoSection
          src={LOGO_URL}
          alt="Logo"
        />
        <Navigation/>
        <LoginAccountForm/>
        {/* <BuilderComponent model='test-builder-page'></BuilderComponent> */}
        <Footer/>
    </>
  )
}
