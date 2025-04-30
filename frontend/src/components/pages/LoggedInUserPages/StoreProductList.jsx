import { BuilderComponent } from '@builder.io/react'
import React, { useEffect,useState } from 'react'
import Header from '../../page_components/Header'
import LogoSection from '../../page_components/LogoSection'
import Navigation from '../../page_components/Navigation'
import Footer from '../../page_components/Footer'
import { LOGO_URL } from '../../../globals'

import { useParams } from 'react-router-dom'
import AddProductForm from '../../page_components/UserSpecificStores/AddProductForm'
import ProductList from '../../page_components/ProductList'

export default function StoreProductList() {
  const {storeId} = useParams();
  const [fetchStoreResp, setFetchStoreResp] = useState({})
  useEffect(() => {
    const fetchStore = async () => {
      const response = await fetch(`/api/stores/get_store/${storeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        const data = await response.json()
        setFetchStoreResp(data)
        console.log(data)
      }
    }
    fetchStore()
    
  }, [storeId])

  return (
    <>
        <Header />
        <LogoSection
            src={LOGO_URL}
            alt="Logo"
        />
        <Navigation />
        <AddProductForm/>
        <ProductList endPoint="/api/products/product_list" store={fetchStoreResp.title} edit={true}/>
        <BuilderComponent model="test-builder-page" />

        <Footer />
    </>
  )
}
