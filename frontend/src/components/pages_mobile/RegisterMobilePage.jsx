import React from 'react'
import LogoSection from '../page_components/LogoSection'
import RegisterAccountForm from '../page_components/RegisterLogin/RegisterAccountForm'
import Footer from '../page_components/Footer'
import { LOGO_URL } from '../../globals'
function RegisterMobilePage() {
  return (
    <>
      <LogoSection
          src={LOGO_URL}
          alt="Logo"
          isWebview={true}
      />
      <RegisterAccountForm isWebview={true}/>
    </>
  )
}

export default RegisterMobilePage