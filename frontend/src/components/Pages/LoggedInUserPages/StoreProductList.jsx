import { BuilderComponent } from '@builder.io/react'
import React, { useEffect } from 'react'
import Header from '../../page_components/Header'
import LogoSection from '../../page_components/LogoSection'
import Navigation from '../../page_components/Navigation'
import Footer from '../../page_components/Footer'
import { LOGO_URL } from '../../../globals'

import { useParams } from 'react-router-dom'

export default function StoreProductList() {
  const {storeId} = useParams();

  useEffect(() => {
    
    
  }, [storeId])

  return (
    <>
        <Header />
        <LogoSection
            src={LOGO_URL}
            alt="Logo"
        />
        <Navigation />
        <BuilderComponent model="test-builder-page" />

        <Footer />
    </>
  )
}
