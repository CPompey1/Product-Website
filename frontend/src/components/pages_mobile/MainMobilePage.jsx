import React from 'react'
import ProductList from '../page_components/ProductList'
import Navigation from '../page_components/Navigation'
import Header from '../page_components/Header'
import Footer from '../page_components/Footer'

function MainMobilePage() {
  return (
    <div>
        <Header isWebview={true}/>
        <Navigation isWebview={true}/>
        <ProductList
            endPoint="/api/products"
            isWebview={true}
        />
        <Footer />
    </div>
  )
}

export default MainMobilePage