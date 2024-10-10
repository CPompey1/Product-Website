
import React from 'react'
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './ProductList.css'
import backendUrl from '../../globals';
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
        // console.log(data[0].title)
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
  export default ProductList;