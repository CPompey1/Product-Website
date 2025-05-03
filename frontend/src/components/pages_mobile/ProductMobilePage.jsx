import React from 'react'
import Header from '../page_components/Header'
import Footer from '../page_components/Footer'
import CheckoutForm from '../page_components/checkout/CheckoutForm'
import { useParams } from 'react-router-dom'

function ProductMobilePage() {
  const {productId} = useParams();
  return (
    <>
      <Header isWebview={true} />
      <CheckoutForm productId={productId} />
      <Footer />
    </>
  )
}

export default ProductMobilePage