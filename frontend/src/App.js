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

const ProductSection = ({ id,imageSrc, imageAlt, text }) => (
  <div>
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
    </div>
);

function ProductList() {
  const [data,setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [listResultF,setListResult] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const fetchResult = await fetch("/product_list")
    
      if (fetchResult.ok){
        const jsonResult = await fetchResult.json()
        // const formattedData = jsonResult.map(item => Object.values(item)[0]);
        setData(jsonResult)
        console.log(jsonResult)
      }

    }
    fetchData()

  },[])

  return(
    <div>
      {data.map(product => (
        <ProductSection
          key={product.id}
          imageSrc={product.imageSrc}
          imageAlt = {product.imageAlt}
          text={product.text}
          title={product.title}
        />
      ))}
    </div>
  )
}
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