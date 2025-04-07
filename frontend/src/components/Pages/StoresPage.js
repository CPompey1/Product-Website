import React from 'react'
import Header from '../page_components/Header'
import Navigation from '../page_components/Navigation'
import Footer from '../page_components/Footer'
import builder, { BuilderComponent } from '@builder.io/react'
import StoresGrid from '../page_components/StoresGrid/StoresGrid'
import LogoSection from '../page_components/LogoSection'
import SubTitleSection from '../page_components/global_components/stores/SubTitle'
import { LOGO_URL } from '../../globals'

export default function StoresPage() {
  return (
    <div>
        <Header/>
        <LogoSection
            src={LOGO_URL}
            alt="Logo"
        />
        <Navigation/>
        {/* <StoresPage/> */}
        <SubTitleSection title="Stores"/>
        {/* <BuilderComponent model='test-builder-page'></BuilderComponent> */}
        
        <StoresGrid/>
        <Footer/>
    </div>
  )
}
