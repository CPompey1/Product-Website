import React, { useEffect, useState } from 'react'
import Header from '../page_components/Header'
import LogoSection from '../page_components/LogoSection'
import Navigation from '../page_components/Navigation'
import SubTitle from '../page_components/global_components/stores/SubTitle'
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
            src="https://cdn.builder.io/api/v1/image/assets%2F6a53bff92dc24a62b49604417a4ec7f2%2F081600701cd246c09e2ac06a37be697f"
            alt="Logo"
        />

        <Navigation/>
        {/* Change in future to say products, store name will be given by logo */}
        <SubTitle title={storeData.title}/>
        <ProductList endPoint="/api/product_list" store={storeData.title}/>
        <Footer/>


    </div>
    )
}
