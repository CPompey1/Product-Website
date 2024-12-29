import React from 'react'
import validateUser from '../../util/accounts_manager'
import { Navigate } from 'react-router-dom'
import Header from '../page_components/Header'
import Footer from '../page_components/Footer'
export default function DeliveriesPage() {
    userValid = validateUser()
    if (userValid === false) {
        return <Navigate to="/login_account" />
    }
  return (
    <>
        <Header/>
        <Footer/>
        <div>DeliveriesPage</div>
    </>
  )
}
