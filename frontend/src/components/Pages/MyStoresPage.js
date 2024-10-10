import React from 'react'
import Header from '../page_components/Header'
import Navigation from '../page_components/Navigation'
import Footer from '../page_components/Footer'
import builder, { BuilderComponent } from '@builder.io/react'
import StoresGrid from '../page_components/StoresGrid/StoresGrid'
import LogoSection from '../page_components/LogoSection'
import SubTitle from '../page_components/global_components/stores/SubTitle'

export default function MyStoresPage() {
    return (
      <div>
          <Header/>
          <LogoSection
              src="https://cdn.builder.io/api/v1/image/assets%2F6a53bff92dc24a62b49604417a4ec7f2%2F081600701cd246c09e2ac06a37be697f"
              alt="Logo"
          />
          <Navigation/>
          {/* <StoresPage/> */}
          <SubTitle title="My Stores"/>
          <BuilderComponent model='test-builder-page'></BuilderComponent>
          
          <StoresGrid/>
          <Footer/>
      </div>
    )
  }