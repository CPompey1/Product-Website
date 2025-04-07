import React from 'react'
import './AddItemsForm.css'
import { useState,useEffect } from 'react'
import UserStoreRow from './UserStoreRow'
export default function UserStoresList() {
    const [userStores, setUserStores] = useState([])

    useEffect(() => {

        const fetchUserStores = async () => {
            //Update to fetch vender specific roles, need to figure out remembering authenticated users
            const response = await fetch('/api/stores/get_stores/user_stores', 
            {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            })
            if (response.ok) {
            const data = await response.json()
            setUserStores(data)
            }
        }
        
        console.log("UserStoresList")
        fetchUserStores()
    },[])

  return (
    <>
        <div className='store-list-container'>
            {userStores.map(store => 
                <UserStoreRow key={store._id} id={store._id} logoSrc={`/media/${store.logo}`} title={store.title} description={store.description} location={store.location} />
            )}
        </div>
    
    </>
  )
}
