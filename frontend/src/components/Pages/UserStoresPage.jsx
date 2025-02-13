import React, { useEffect} from 'react'
import Header from '../page_components/Header'
import Navigation from '../page_components/Navigation'
import LogoSection from '../page_components/LogoSection'
import { BuilderComponent } from '@builder.io/react'
import Footer from '../page_components/Footer'
import AddStoreForm from '../page_components/AddItemsForm/AddStoreForm'
import validateUser from '../../util/accounts_manager'
import { useNavigate } from 'react-router-dom'

export default function () {
  const navigate = useNavigate()
  const checkUserLoggedIn = async () => {
      const loggedIn = await validateUser()
      if (!loggedIn) {
        navigate('/login_account')
      }
    }
    checkUserLoggedIn()
  return (
    <>
        
        <Header/>
        <LogoSection
            src="https://cdn.builder.io/api/v1/image/assets%2F6a53bff92dc24a62b49604417a4ec7f2%2F081600701cd246c09e2ac06a37be697f"
            alt="Logo"
        />
        <Navigation/>
        <AddStoreForm/>
        <BuilderComponent model="test-builder-page"/>
        <Footer/>        
    </>
  )
}
