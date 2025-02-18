import React, {useState,
              useEffect }from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
             
import './App.css';

import AddProduct from './components/page_components/AddProduct.js';
import ProductList, { ProductSection } from './components/page_components/ProductList.js'
import Navigation from './components/page_components/Navigation.js'
import SellersProducts from './components/page_components/SellersProducts';
import LogoSection from './components/page_components/LogoSection';
import { Builder } from '@builder.io/react';
import Header from './components/page_components/Header';
import RegisterAccountPage from './components/Pages/RegisterAccountPage';
import LoginAccountPage from './components/Pages/LoginPage';
import MainPage from './components/Pages/MainPage';
import CategoryPage from './components/Pages/CategoryPage';
import StoresPage from './components/Pages/StoresPage';
import DeliverPage from './components/Pages/DeliverPage';
import TestWsPage from './components/Pages/TestWsPage';
import CategoryProductsPage from './components/Pages/CategoryProductsPage';
import ProductPage from './components/Pages/ProductPage';
import StorePage from './components/Pages/StorePage';
import UserStores from './components/Pages/UserStoresPage';
import FormInput, { InputLabel } from './components/page_components/global_components/Forms/FormInput';
import UserStoreProducts from './components/Pages/UserStoreProductsPage';
import StoreProductList from './components/Pages/LoggedInUserPages/StoreProductList';
import ProductOrderPage from './components/Pages/ProductOrderPage';
function App() {
  
    {/* I have no idea what the fuck is going on here and it shuold be fixed */}
    {/* this should be path to the form, not the endpoint. Yet it works. */}
    const routes = [
        {"path":"/","element":<MainPage/>},
    
        {"path":"/sellers_home","element":<UserStores/>},
    
        {"path":"/sellers_product","element":<SellersProducts />},
    
        {"path":"/register","element":<RegisterAccountPage />},
    
        {"path":"/login_account","element":<LoginAccountPage />},
    
        {"path":"/category_page","element":<CategoryPage />},
    
        {"path":"/stores","element":<StoresPage />},
    
        {"path":"/deliver","element":<DeliverPage />},
        
        {"path":"/test_socket","element":<TestWsPage />},
    
        {"path":"/category/:category", "element":<CategoryProductsPage/>},
    
        {"path": "/product/:productId","element":<ProductPage/> },
    
        {"path": "/stores/:storeId", "element": <StorePage/> },

        {"path" : "/user-store-products", "element": <UserStoreProducts/>},
        
        {"path":"/edit-product-list/:storeId","element":<StoreProductList/>},

        {"path":"orders/order/:orderId","element":<ProductOrderPage/>},
    ]
  return (
    <>
        {/* This is the alias of BrowserRouter i.e. Router */}
        <Router>
            <Routes>
               
               {routes.map(route => ( 
                <Route path={route.path} element={route.element}/> 
               ))} 
               
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

//Register sample ProductSection component with sample inputs
Builder.registerComponent(ProductSection, {name: 'ProductSection',inputs: [{}]})

Builder.registerComponent(FormInput, {name: 'FormInput',inputs: [{type: 'text', name: 'name', placeholder: 'placeholder'}]})
Builder.registerComponent(InputLabel, {name: 'InputLabel',inputs: [{name: 'name'}]})



export default App;