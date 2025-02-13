import React, { useState } from 'react'
import FormInput, { InputLabel } from '../global_components/Forms/FormInput';
import Button_b from '../global_components/Button_b/Button_b';
import { Fab } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { SubTitleHeaderCustom } from '../global_components/stores/SubTitle';
import './AddItemsForm.css'
export default function AddProductForm({storeName,storeId}) {
    const [inputs, setInputs] = useState({});
    const [addProductFormVisible,setAddProductFormVisible] = useState(false);
    const [productCreationError, setProductCreationError] = useState(false);
    
    const addFormButtonClicked = () => {
        console.log("AddFormButtonClicked")
        setAddProductFormVisible(true)
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log("in handle change")
        setInputs(values => ({...values, [name]: value}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const fetchData = async () => {
          const formData = new FormData()
          formData.append("title",inputs.Title)
          formData.append("description",inputs.Description)
        //   formData.append('image',imginputs.Image)
          formData.append("category",inputs.Category)
          formData.append("store",inputs.Store)
          formData.append("cost","$" + inputs.Cost) 
          
          const fetchResult = await fetch("/add_product", {
            method: "POST",
            body: formData,
          });

          if (fetchResult.ok) {
            console.log("Product created")
            setAddProductFormVisible(false)
          } else {
            console.log("Error creating product")
            setProductCreationError(true)
          }

          console.log(fetchResult)
        }
        fetchData()
    }


  return (
    <>
        {addProductFormVisible ?
        <></>
        :
            <div className='add-store-button-container'>
                <Fab variant="extended" sx={{background: 'black', marginBottom:'15%'} } onClick={addFormButtonClicked}>
                    <AddCircleOutline sx={{ color: 'white' }}/>

                    <SubTitleHeaderCustom title={'Add Product'} fontSize={'30px'}  color={'white'}/>
                </Fab>  
            </div>

        }

        {productCreationError ?
            <div className='item-creation-error'> Error creating product </div>
        :
        <></>
        }

        {addProductFormVisible ?
            <div className='add-item-form'>
                <div className='Input-container'>
                    <InputLabel name={"Product Name"}/>
                    <FormInput type={"text"} name={"title"} placeholder={"Product name"} onChangeF={handleChange}/>
                </div>

                <div className='Input-container'>
                    <InputLabel name={"Description"}/>
                    <FormInput type={"text"} name={"description"} placeholder={"Product description"} onChangeF={handleChange}/>
                </div>

                <div className='Input-container'>
                    <InputLabel name={"Category"}/>
                    <FormInput type={"text"} name={"category"} placeholder={"Product category"} onChangeF={handleChange}/>
                </div>

                {/* TODO: Remove this input, should be parsed based off current page store id */}
                <div className='Input-container'>
                    <InputLabel name={"Store name"}/>
                    <FormInput type={"text"} name={"store"} placeholder={"Product store"} onChangeF={handleChange}/>
                </div>

                <div className='Input-container'>
                    <InputLabel name={"Product Cost"}/>
                    <FormInput type={"text"} name={"cost"} placeholder={"Product cost"} onChangeF={handleChange}/>
                </div>

                
                {/* TODO: add image handling(multuple images) */}
                
                <Button_b action={handleSubmit}> Add Product </Button_b>
            </div>
        :
        <></>
        }
    </>
  )
}
