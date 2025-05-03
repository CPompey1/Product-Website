import React from 'react'
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './ProductList.css'
import { Builder } from '@builder.io/react';
const ProductSection = ({ id, imageSrc, imageAlt, text, link, isWebview }) => (
  <div>
    <section className="content-section">
      <div className="content-wrapper">
        <div className="content-columns">
          <div className="image-column">
            <a href={link} >
              <img loading="lazy" src={imageSrc} alt={imageAlt} className={isWebview ? "content-image-m" : "content-image"} />
            </a>
          </div>

          <div className={!isWebview ? "text-column" : "text-column-m"}>
            <div className="text-wrapper">
              <p>{text}</p>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  </div>
);
  
  function ProductList({endPoint,category,store,edit,isWebview}) {
    const [data,setData] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        const fetchResult = await fetch(endPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({category:category,store:store})
        })
      
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
            key={product._id}
            imageSrc={product.imageSrc.startsWith('/media') ? `/${product.imageSrc}` : `/media/${product.imageSrc.replace(/^\/+/, '')}`}
            imageAlt = {product.imageAlt}
            text={product.text}
            title={product.title}
            link={(edit == undefined || edit == false) ?  
              (isWebview ? `/m/product/${product._id}` : `/product/${product._id}`) : 
              (isWebview ?  `/m/edit-product/${product._id}` : `/edit-product/${product._id}`)}
            isWebview={isWebview}
          />
        ))}
      </div>
    )
  }

  export default ProductList;
  export {ProductSection}