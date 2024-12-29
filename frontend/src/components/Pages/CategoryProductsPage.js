import { BuilderPage } from '@builder.io/react';
import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../page_components/Header';
import { LOGO_URL } from '../../globals';
import Navigation from '../page_components/Navigation';
import SubTitle from '../page_components/global_components/stores/SubTitle';
import LogoSection from '../page_components/LogoSection';
import ProductList from '../page_components/ProductList';
export default function CategoryProductsPage() {
  const {category} = useParams();
  return (
    <>
      {/* <BuilderPage model='test-builder-page'></BuilderPage> */}
      <Header/>
      <LogoSection
            src={LOGO_URL}
            alt="Logo"
      />
      <Navigation />
      <SubTitle title={category}/>
      <ProductList
        endPoint="/api/product_list"
        category={category}
      />


    </>
  )
}
