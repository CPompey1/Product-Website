import React from 'react'
import Header from '../page_components/Header'
import LogoSection from '../page_components/LogoSection'
import Footer from '../page_components/Footer'
import { LOGO_URL } from '../../globals'
import ProductList from '../page_components/ProductList'
import AddProductForm from '../page_components/UserSpecificStores/AddProductForm'
import Navigation from '../page_components/Navigation'

export default function UserStoreProducts() {
  return (
    <>
        <Header/>
        <LogoSection
            src={LOGO_URL}
            alt="Logo"
        />
        
        <Navigation/>
        <AddProductForm/>
        <ProductList
            endPoint="/api/products/product_list"
            store="Cris's Store"
        />
        <Footer/>


    </>

  )
}
