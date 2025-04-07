import React, { useEffect, useState } from 'react'
import Header from '../page_components/Header'
import LogoSection from '../page_components/LogoSection'
import Navigation from '../page_components/Navigation'
import SubTitleSection from '../page_components/global_components/stores/SubTitle'
import { useParams } from 'react-router-dom'
import Footer from '../page_components/Footer'
import ProductList from '../page_components/ProductList'

export default function StorePage() {
const {storeId} = useParams();
const [storeData, setStoreData] = useState({})
    useEffect(() => {
        const fetchStoreData = async () => {
            const response = await fetch(`/api/stores/get_store/${storeId}`, {
                method: 'GET',
            })

            if (response.ok){
                const jsonResult = await response.json()
                console.log(jsonResult)
                setStoreData(jsonResult)
            }
        }

        fetchStoreData()
    },[])


    return (
    <div>
        <Header/>
        {/* Change in the future to be store specific logo */}
        <LogoSection
            src={storeData.logo}
            alt="Logo"
        />

        <Navigation/>
        {/* Change in future to say products, store name will be given by logo */}
        <SubTitleSection title={storeData.title}/>
        <ProductList endPoint="/api/products/product_list" store={storeData.title}/>
        <Footer/>


    </div>
    )
}
