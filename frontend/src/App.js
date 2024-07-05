import React, {useState,
              useEffect,BrowserRouter as Router,
              Routes,
              Route,
              Navigate, }from 'react'
import './App.css';
const Button = ({ children, openLinkInNewTab }) => (
  <button className="action-button" target={openLinkInNewTab ? "_blank" : "_self"}>
    {children}
  </button>
);

const ImageSection = ({ src, alt }) => (
  <section className="image-section">
    <img loading="lazy" src={src} alt={alt} className="full-width-image" />
  </section>
);

const ButtonGroup = () => (
  <div className="button-group">
    {[1, 2, 3].map((index) => (
      <div key={index} className="button-column">
        <Button openLinkInNewTab={false}>Click me!</Button>
      </div>
    ))}
  </div>
);

const ContentSection = ({ imageSrc, imageAlt, text }) => (
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
      const fetchResult = await fetch("/products")
      const jsonResult = fetchResult.json()
      setData(jsonResult)
    }
    fetchData()
  },[])

  return(
    <main className="main-content">
      <ContentSection
        imageSrc="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a"
        imageAlt="Content illustration"
        text="somestuff somestuff somestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuffsomestuff somestuff"
      />

      <ContentSection
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

      <ImageSection
        src="/frontend/public/tempLogo.jpeg"
        alt="Decorative banner image"
      />
      <section className="button-section">
          <ButtonGroup />
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
                {/* This route is for home component 
        with exact path "/", in component props 
        we passes the imported component*/}
                <Route
                    exact
                    path="/"
                    component={<MainPage />}
                />

                {/* If any route mismatches the upper 
        route endpoints then, redirect triggers 
        and redirects app to home component with to="/" */}
                {/* <Redirect to="/" /> */}
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
            </Routes>
        </Router>
    </>
    // <MainPage/>
  );
}
export default App;