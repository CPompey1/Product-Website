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
const Button = ({ children, openLinkInNewTab }) => (
  <button className="action-button" target={openLinkInNewTab ? "_blank" : "_self"}>
    {children}
  </button>
);

const LogoSection = ({ src, alt }) => (
  <section className="image-section">
    <img loading="lazy" src={src} alt={alt} className="full-width-image" />
  </section>
);

const Navigation = () => (
  <div className="button-group">
    {[1, 2, 3].map((index) => (
      <div key={index} className="button-column">
        <Button openLinkInNewTab={false}>Click me!</Button>
      </div>
    ))}
  </div>
);

const ProductSection = ({ imageSrc, imageAlt, text }) => (
  <section className="content-section">
    <div className="content-wrapper">
      <div className="content-columns">
        <div className="image-column">
          <img loading="lazy" src={imageSrc} alt={imageAlt} className="content-image" />
        </div>
        <div className="text-column">
          <div className="text-wrapper">
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

function ProductList() {
  const [data,setData] = useState([{}])

  useEffect(() => {
    const fetchData = async () => {
      const fetchResult = await fetch("/productlist")
      const jsonResult = fetchResult.json()
      setData(jsonResult)
    }
    fetchData()
  },[])

  return(
    <main className="main-content">
      <ProductSection
        imageSrc="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a"
        imageAlt="Content illustration"
        text="somestuff somestuff somestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuff"
      />

      <ProductSection
        imageSrc="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a"
        imageAlt="Content illustration"
        text="somestuff somestuff somestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuff"
      />
    </main>
  )
}
function MainPage() {
  return (
    <>
      <header className="main-header">
        <section className="header-content" />
      </header>

      <LogoSection
        src="/frontend/public/tempLogo.jpeg"
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