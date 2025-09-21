import React from 'react'
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './ProductList.css'
import { Builder } from '@builder.io/react';
import { getStrapiData, getStrapiDomain } from '../../util/strapi_utils';
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
        if (category != undefined){
          endpoint = endpoint + `?filter[category][$eq]=${category}`
        }
        if (store != undefined){
          endPoint = endPoint + (category != undefined ? `&` : `?`) + `filter[store][$eq]=${store}`
        }

        if (category == undefined && store == undefined){
         endPoint = endPoint + `?populate=*`
        }

        console.log(endPoint)
        const fetchResult = await getStrapiData(getStrapiDomain() + endPoint)
        if (fetchResult.ok){
          const jsonResult = await fetchResult.json()
          console.log(jsonResult)
          // const formattedData = jsonResult.map(item => Object.values(item)[0]);
          setData(jsonResult.data)
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
            imageSrc={product.image}
            // imageAlt = {product.imageAlt}
            text={product.description}
            title={product.title}
            link={(edit == undefined || edit == false) ?  
              (isWebview ? `/m/product/${product.id}` : `/product/${product.id}`) : 
              (isWebview ?  `/m/edit-product/${product.id}` : `/edit-product/${product.id}`)}
            isWebview={isWebview}
          />
        ))}
      </div>
    )
  }

  export default ProductList;
  export {ProductSection}