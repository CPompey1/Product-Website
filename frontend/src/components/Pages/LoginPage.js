import { BuilderComponent } from '@builder.io/react'
import React from 'react'
import Header from '../page_components/Header'
import LogoSection from '../page_components/LogoSection'
import Navigation from '../page_components/Navigation'
import LoginAccountForm from '../page_components/LoginAccountForm'
import Footer from '../page_components/Footer'
export default function LoginAccountPage() {
  return (
    <>
        <Header/>
        <LogoSection
          src="https://cdn.builder.io/api/v1/image/assets%2F6a53bff92dc24a62b49604417a4ec7f2%2F081600701cd246c09e2ac06a37be697f"
          alt="Logo"
        />
        <Navigation/>
        <LoginAccountForm/>
        {/* <BuilderComponent model='test-builder-page'></BuilderComponent> */}
        <Footer/>
    </>
  )
}
