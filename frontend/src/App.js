import React, {useState,
              useEffect }from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
             
import './App.css';

import AddProduct from './components/page_components/AddProduct.js';
import ProductList from './components/page_components/ProductList.js'
import Navigation from './components/page_components/Navigation.js'
import SellersProducts from './components/page_components/SellersProducts';
import LogoSection from './components/page_components/LogoSection';
import Footer from './components/page_components/Footer';

import { Builder } from '@builder.io/react';
import Header from './components/page_components/Header';
import RegisterAccountPage from './components/Pages/RegisterAccountPage';
import LoginAccountPage from './components/Pages/LoginPage';
import validateUser from './util/accounts_manager'
import MainPage from './components/Pages/MainPage';
import CategoryPage from './components/Pages/CategoryPage';
import StoresPage from './components/Pages/StoresPage';
import DeliverPage from './components/Pages/DeliverPage';
// const Header = () => (
//   <header className="main-header">
//         <section className="header-content" />
//   </header>
// );

function App() {


  return (
    <>
        {/* This is the alias of BrowserRouter i.e. Router */}
        <Router>
            <Routes>
               
                <Route path="/" element={<MainPage />}/>

                <Route path="/add_product" element={<AddProduct />} />


                <Route path="/sellers_product" element={<SellersProducts/>}/>

                {/* <Route path="*" element={<Navigate to="/" />}/> */}

                <Route path="/register" element={<RegisterAccountPage/>}/>

                {/* I have no idea what the fuck is going on here and it shuold be fixed */}
                {/* this should be path to the form, not the endpoint. Yet it works. */}
                <Route path="/login_account" element={<LoginAccountPage/>}/>

                <Route path="/category_page" element={<CategoryPage/>}/>

                <Route path="/stores" element={<StoresPage/>}/>

                <Route path="/deliver" element={<DeliverPage/>}/>
                
            </Routes>
        </Router>
    </>
    // <MainPage/>
  );
}

Builder.registerComponent(LogoSection, { 
  name: 'LogoSection',
  src: 'https://cdn.builder.io/api/v1/image/assets%2F6a53bff92dc24a62b49604417a4ec7f2%2F081600701cd246c09e2ac06a37be697f',
  inputs: [{ src: 'https://cdn.builder.io/api/v1/image/assets%2F6a53bff92dc24a62b49604417a4ec7f2%2F081600701cd246c09e2ac06a37be697f', alt: 'Logo' }],
})
Builder.registerComponent(Header, { 
  name: 'Header',
  inputs: [{ }],
})

Builder.registerComponent(Navigation,{ name: 'Navigation'})

Builder.registerComponent(ProductList,{name:'ProductList',inputs: [{}]})

Builder.registerComponent(Footer,{name: 'Footer',inputs: [{}]})
export default App;