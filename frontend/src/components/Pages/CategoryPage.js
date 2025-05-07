import React from 'react'
import builder, { BuilderComponent, BuilderPage } from '@builder.io/react'
import Header from '../page_components/Header'
import LogoSection from '../page_components/LogoSection'
import Footer from '../page_components/Footer'
import Navigation from '../page_components/Navigation'
import CategoryGrid from '../page_components/CategoryGrid/CategoryGrid'
import SubTitleSection from '../page_components/global_components/stores/SubTitle'
import { LOGO_URL } from '../../globals';

export default function CategoryPage({isWebview}) {

  return (
    <div>
        <Header isWebview={isWebview}/>
        <LogoSection
            src={LOGO_URL}
            alt="Logo"
            isWebview={isWebview}
        />
        <Navigation isWebview={isWebview} />
        <SubTitleSection title='Categories'/>
        {/* <BuilderComponent model='test-builder-page'></BuilderComponent> */}
        
        <CategoryGrid/>
        <Footer/>
    </div>
  )
}
