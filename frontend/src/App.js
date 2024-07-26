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
  const [data,setData] = useState([])
  // const [listResultF,setListResult] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const fetchResult = await fetch("/product_list")

      if (fetchResult.ok){
        const jsonResult = await fetchResult.json()
        // console.log(jsonResult)
        // const listResult = jsonResult.map(product => 
          

        //   <ul key = {product.title}> 
        //         <ProductSection
        //           key = {product.id}
        //           imageSrc={product.imageSrc}
        //           imageAlt={product.imageAlt}
        //           text={product.text}
        //         />
        //   </ul>
        // );
        setData(jsonResult)
        console.log(data)
        // setListResult(listResult)
        // console.log(jsonResult)
        // console.log(jsonResult[0]['key1'])
        // setData(datalistResult.map(() => {imageSrc:item.imageSrc; 
        //                                   imageAlt: item.imageAlt; 
        //                                   text: item.text }))
      }
      

    //  console.log("list result" + listResult)
      // setListResult(listResult)
        // if (fetchResult.ok) {
        //   const jsonResult = fetchResult.data.json()
        //   console.log(jsonResult)
        //   const listResult = JSON.parse(jsonResult)
        //   // setData(datalistResult.map(() => {imageSrc:item.imageSrc; 
        //   //                               imageAlt: item.imageAlt; 
        //   //                               text: item.text }))
        //   console.log(listResult)
        //   setData({data: listResult.map()})}
      
      
    }
    
    fetchData()
  },[])

  return(
    // <main className="main-content">
    //   <ProductSection
    //     imageSrc="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a"
    //     imageAlt="Content illustration"
    //     text="somestuff somestuff somestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuff"
    //   />

    //   <ProductSection
    //     imageSrc="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a"
    //     imageAlt="Content illustration"
    //     text="somestuff somestuff somestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuff"
    //   />
    // </main>
    // <main className='main-content'>
    //    <ul>{listResultF}</ul>
    // </main>
    <div>
      {data.map(product => (
        <ProductSection
          key={product.id}
          imageSrc={product.imageSrc}
          imageAlt = {product.imageAlt}
          text={product.text}
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