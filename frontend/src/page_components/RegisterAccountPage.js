import { BuilderComponent } from '@builder.io/react'
import React from 'react'
import Header from './Header'
import LogoSection from './LogoSection'
import Navigation from './Navigation'
import RegisterAccountForm from './RegisterAccountForm'
export default function RegisterAccountPage() {
  return (
    <>
        <Header/>
        <LogoSection
          src="https://cdn.builder.io/api/v1/image/assets%2F6a53bff92dc24a62b49604417a4ec7f2%2F081600701cd246c09e2ac06a37be697f"
          alt="Logo"
        />
        <Navigation/>
        <RegisterAccountForm/>
        {/* <BuilderComponent model='test-builder-page'></BuilderComponent> */}
    </>
  )
}
