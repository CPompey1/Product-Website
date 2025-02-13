import React, { useEffect, useState } from 'react'
import './AddItemsForm.css'
import FormInput, { InputLabel } from '../global_components/Forms/FormInput'
import Button_b from '../global_components/Button_b/Button_b'
import { Fab, Grid } from '@mui/material'
import { AddCircle, AddCircleOutline } from '@mui/icons-material'
import SubTitleSection, { SubTitleHeaderCustom } from '../global_components/stores/SubTitle'
import UserStoreRow from './UserStoreRow'

function AddStoreForm() {
  const [inputs, setInputs] = useState({})
  const [addStoreFormVisible, setAddStoreFormVisible] = useState(false)
  const [storeCreationError, setStoreCreationError] = useState(false)
  const [userStores, setUserStores] = useState([])
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("in handle change")
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async () => {
    console.log("in handle submit")
    const response = await fetch('/add_store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    })
    if (response.ok) {
      console.log("Store created")
      setAddStoreFormVisible(false)
    } else {
      console.log("Error creating store")
      setStoreCreationError(true)
    }
  }

  const addFormButtonClicked = () => {
    console.log("AddFormButtonClicked")
    setAddStoreFormVisible(true)
  }

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

  useEffect(() => {
    fetchUserStores()

  }, [addStoreFormVisible])

  return (
    <>
      {addStoreFormVisible ? 
        <></> 
      : 
        <div className='add-store-button-container'>
          <Fab variant="extended" sx={{background: 'black', marginBottom:'15%'} } onClick={addFormButtonClicked}>
            <AddCircleOutline sx={{ color: 'white' }}/>

            <SubTitleHeaderCustom title={'Add store'} fontSize={'30px'}  color={'white'}/>
          </Fab>  
        </div>
      }

      {storeCreationError ? 
        <div className='store-creation-error'> Error creating store </div>
      :
        <></>
      }
      {addStoreFormVisible ? 
        
        <div className="add-item-form">
          <div className='Input-container'>
            <InputLabel name={"Store Name"}/>
            <FormInput type={"text"} name={"store_name"} placeholder={"Store Name"} onChangeF={handleChange}/>
          </div>

          <div className='Input-container'>
            <InputLabel name={"Store Description"}/>
            <FormInput type={"text"} name={"store_description"} placeholder={"Store Description"} onChangeF={handleChange}/>
          </div>
          

          <div className='Input-container'>
            <InputLabel name={"Store Address"}/>
            <FormInput type={"text"} name={"store_address"} placeholder={"Store Address"} onChangeF={handleChange}/>
          </div>

          <div className='Input-container'>
            <InputLabel name={"Store Phone"}/>
            <FormInput type={"text"} name={"store_phone"} placeholder={"Store Phone"} onChangeF={handleChange}/> 
          </div>

          {/* TODO: Add image input, need to figure out content hosting other than directly on our server*/}
          <div className='Input-container'>
          <Button_b action={handleSubmit}> Add Store </Button_b>
          </div>
        </div>
      : 
        <></>
      }
      
      <div className='store-list-container'>
        {userStores.map(store => 
          <UserStoreRow logoSrc={store.logo} title={store.title} description={store.description} location={store.location} />
        )}
      </div>
    

    </>
  )
}

export default AddStoreForm