import React, {useState,
              useEffect }from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
             
import './App.css';

import ProductList, { ProductSection } from './components/page_components/ProductList.js'
import Navigation from './components/page_components/Navigation.js'
import LogoSection from './components/page_components/LogoSection';
import { Builder } from '@builder.io/react';
import Header from './components/page_components/Header';

import FormInput, { InputLabel } from './components/page_components/global_components/Forms/FormInput';

import { routes } from './util/routes';
function App() {
  
    
  return (
    <>
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