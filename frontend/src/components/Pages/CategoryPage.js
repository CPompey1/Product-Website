import React from 'react'
import builder, { BuilderComponent, BuilderPage } from '@builder.io/react'
import Header from '../page_components/Header'
import LogoSection from '../page_components/LogoSection'
import Footer from '../page_components/Footer'
import Navigation from '../page_components/Navigation'
import CategoryGrid from '../page_components/CategoryGrid/CategoryGrid'
import SubTitle from '../page_components/global_components/stores/SubTitle'

export default function CategoryPage() {

  return (
    <div>
        <Header/>
        <LogoSection
            src="https://cdn.builder.io/api/v1/image/assets%2F6a53bff92dc24a62b49604417a4ec7f2%2F081600701cd246c09e2ac06a37be697f"
            alt="Logo"
        />
        <Navigation />
        <SubTitle title='Categories'/>
        {/* <BuilderComponent model='test-builder-page'></BuilderComponent> */}
        
        <CategoryGrid/>
        <Footer/>
    </div>
  )
}
