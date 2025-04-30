import React from 'react'
import Header from '../page_components/Header'
import LogoSection from '../page_components/LogoSection'
import { LOGO_URL } from '../../globals'
import LoginAccountForm from '../page_components/RegisterLogin/LoginAccountForm'

function LoginMobilePage() {
  return (
    <>
        <LogoSection
            src={LOGO_URL}
            alt="Logo"
            isWebview={true}
        />
        <LoginAccountForm isWebview={true} />
    </>
  )
}

export default LoginMobilePage