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

const LogoSection = ({ src, alt }) => (
  <section className="image-section">
    <img loading="lazy" src={src} alt={alt} className="full-width-image" />
  </section>
);

function MainPage() {
  return (
    <>
      <header className="main-header">
        <section className="header-content" />
      </header>

      <LogoSection
        src="/frontend/public/logo.png"
        alt="Logo"
      />
      <section className="button-section">
          <Navigation />
      </section>
      
      <ProductList/>

      <footer className="main-footer">
        <section className="footer-content" />
      </footer>
    </>
  )
}

function App() {

  // render()
  return (
    <>
        {/* This is the alias of BrowserRouter i.e. Router */}
        <Router>
            <Routes>
               
                <Route path="/" element={<MainPage />}/>

                <Route path="/add_product" element={<AddProduct />} />

                <Route path="*" element={<Navigate to="/" />}/>
            </Routes>
        </Router>
    </>
    // <MainPage/>
  );
}
export default App;