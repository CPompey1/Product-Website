import React, { useEffect, useState } from 'react'
import Header from '../../page_components/Header'
import LogoSection from '../../page_components/LogoSection'
import Navigation from '../../page_components/Navigation'
import { useParams } from 'react-router-dom'
import { LOGO_URL } from '../../../globals'
import { Grid, TextField } from '@mui/material'
import { SubTitleHeaderCustom } from '../../page_components/global_components/stores/SubTitle'
import { AttachMoney } from '@mui/icons-material'
import Button_b from '../../page_components/global_components/Button_b/Button_b'

function EditProductPage() {
    const productId = useParams();
    const [productResponse, setProductResponse] = useState({})
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`/api/products/product/${productId.productId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setProductResponse(data)
            }
        }
        fetchProduct()
    }, [productId])

    

  return (
    <>
        <Header/>
        <LogoSection
            src={LOGO_URL}
            alt="Logo"
        />
        <Navigation />
        <EditProductForm productResponse={productResponse}/>

    </>
  )
}

function EditProductForm({productResponse}){
    const [inputs, setInputs] = useState({})
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log("in handle change")
        setInputs(values => ({...values, [name]: value}))
      }

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return(
        <form onSubmit={handleSubmit}>
            <div style={{textAlign: 'center',alignContent: 'center'}}>
                <TextField  fontSize='32px' id="product-title" defaultValue={productResponse.title} onChange={handleChange}/>
            </div>
            <Grid style={{marginTop: '1%'}} container spacing={2}>
                <Grid item xs={8}>
                    {productResponse.imageSrc == undefined || productResponse.imageSrc.length == 0 ?  
                        <div>
                            <input type="file" name="images[]" multiple accept="image/*"/>
                        </div> : 

                        <div>
                            <div className='existing-img-container' style={{background: `url(/media/${productResponse.imageSrc}) no-repeat center center/cover`, 
                                                                            height: '450px', 
                                                                            textAlign: 'center',
                                                                            alignContent: 'center'} }>
                                <input type="file" name="images[]" multiple accept="image/*"/>
                            </div>
                            {/* <img src={`/media/${productResponse.imageSrc}`} alt="Product Image"/> */}
                        </div>
                    }
                </Grid>
                <Grid item xs={4}>
                    <TextField id="product-description" style={{overflow: 'scroll', maxHeight: '450px'}} defaultValue={productResponse.text} fullWidth multiline onChange={handleChange}/>
                    
                    <Grid style={{marginTop: '5%'}} container spacing={2}>
                        <Grid style={{textAlign: 'right',alignContent: 'center'}} item xs={6}>
                            <AttachMoney fontSize='large'/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="product-price" defaultValue={productResponse.cost} style={{textAlign: 'left', width: '30%'}} fullWidth onChange={handleChange}/>
                        </Grid>
                    </Grid>
                    
                    <div style={{marginTop: '5%',justifyItems: 'center'}}>
                        <Button_b onClick={()=>{console.log('Save Changes')}}>
                            Save Changes
                        </Button_b>
                    </div>
                    

                </Grid>
            </Grid>

        </form>
    )
}
const createImgCallFromLink = (str) => {
    const imgUrlCall = 'url(' + str + ')'
    return imgUrlCall
  }
export default EditProductPage