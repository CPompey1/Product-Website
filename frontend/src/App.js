import React, {useState,
              useEffect }from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
             
import './App.css';
import AddProduct from './page_components/AddProduct.js';
import backendUrl from './globals.js';
import ProductList from './page_components/ProductList.js'
import Navigation from './page_components/Navigation.js'
import SellersProducts from './page_components/SellersProducts';
import { Button } from '@builder.io/react';
import { Builder } from '@builder.io/react';
import Header from './page_components/Header';
import { BuilderComponent } from '@builder.io/react';

const LogoSection = ({ src, alt }) => (
  <section className="image-section">
    <img loading="lazy" src={src} alt={alt} className="full-width-image" />
  </section>
);

// const Header = () => (
//   <header className="main-header">
//         <section className="header-content" />
//   </header>
// );
function MainPage() {
  return (
    <>
      <Header/>
      <LogoSection
        src="https://cdn.builder.io/api/v1/image/assets%2F6a53bff92dc24a62b49604417a4ec7f2%2F081600701cd246c09e2ac06a37be697f"
        alt="Logo"
      />
      <Navigation />
      
      
      <ProductList/>

      <footer className="main-footer">
        <section className="footer-content" />
      </footer>
    </>
  )
}

function App() {


  return (
    <>
        {/* This is the alias of BrowserRouter i.e. Router */}
        <Router>
            <Routes>
               
                <Route path="/" element={<MainPage />}/>

                <Route path="/add_product" element={<AddProduct />} />


                <Route path="/sellers_product" element={<SellersProducts/>}/>

                <Route path="*" element={<Navigate to="/" />}/>
            </Routes>
        </Router>
    </>
    // <MainPage/>
  );
}

Builder.registerComponent(LogoSection, { 
  name: 'LogoSection',
  inputs: [{ src: 'https://cdn.builder.io/api/v1/image/assets%2F6a53bff92dc24a62b49604417a4ec7f2%2F081600701cd246c09e2ac06a37be697f', alt: 'Logo' }],
})
Builder.registerComponent(Header, { 
  name: 'Header',
  inputs: [{ }],
})

Builder.registerComponent(Navigation,{ name: 'Navigation'})

Builder.registerComponent(ProductList,{name:'ProductList',inputs: [{}]})
export default App;