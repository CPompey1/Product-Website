import React, { useEffect, useState } from 'react'
import Header from '../page_components/Header'
import LogoSection from '../page_components/LogoSection'
import Navigation from '../page_components/Navigation'
import SubTitleSection from '../page_components/global_components/stores/SubTitle'
import { useParams } from 'react-router-dom'
import Footer from '../page_components/Footer'
import ProductList from '../page_components/ProductList'
import { getStrapiData, getStrapiDomain } from '../../util/strapi_utils'
import { LOGO_URL } from '../../globals'

export default function StorePage({isWebview}) {
const {storeId} = useParams();
const [storeData, setStoreData] = useState({})
    useEffect(() => {
        const fetchStoreData = async () => {

            // const response = await fetch(`/api/stores/get_store/${storeId}`, {
            //     method: 'GET',
            // })
            const response = await getStrapiData(getStrapiDomain() + `/api/stores?filters[id]=${storeId}`);

            if (response.ok){
                const jsonResult = await response.json()
                console.log(jsonResult)
                setStoreData(jsonResult.data[0])
            }
        }

        fetchStoreData()
    },[])


    return (
    <div>
        <Header isWebview={isWebview}/>
        {/* Change in the future to be store specific logo */}
        <LogoSection
            src={LOGO_URL}
            alt="Logo"
            isWebview={isWebview}
        />

        <Navigation isWebview={isWebview}/>
        {/* Change in future to say products, store name will be given by logo */}
        {/* <SubTitleSection title={storeData.title}/>
         */}
         <LogoSection
            src={storeData.logo}
            alt={storeData.title}
            isWebview={isWebview}
        />
         {/* <SubTitleSection title={storeData.title}/> */}
         {/* <BuilderComponent model='test-builder-page'></BuilderComponent> */}
        <ProductList endPoint="/api/products" store={storeData.title}/>
        <Footer/>


    </div>
    )
}
