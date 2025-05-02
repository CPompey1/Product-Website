import React from 'react'
import ProductList from '../page_components/ProductList'
import Navigation from '../page_components/Navigation'
import Header from '../page_components/Header'

function MainMobilePage() {
  return (
    <div>
        <Header isWebview={true}/>
        <Navigation />
        <ProductList
            endPoint="/api/products/product_list"
            isWebview={true}
        />

    </div>
  )
}

export default MainMobilePage