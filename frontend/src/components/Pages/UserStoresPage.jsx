import React, { useEffect} from 'react'
import Header from '../page_components/Header'
import Navigation from '../page_components/Navigation'
import LogoSection from '../page_components/LogoSection'
import { BuilderComponent } from '@builder.io/react'
import Footer from '../page_components/Footer'
import AddStoreForm from '../page_components/UserSpecificStores/AddStoreForm'
import validateUser from '../../util/accounts_manager'
import { useNavigate } from 'react-router-dom'
import UserStoresList from '../page_components/UserSpecificStores/UserStoresList'
import { LOGO_URL } from '../../globals'

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
            src={LOGO_URL}
            alt="Logo"
        />
        <Navigation/>
        <AddStoreForm/>
        <UserStoresList/>
        <Footer/>        
    </>
  )
}
