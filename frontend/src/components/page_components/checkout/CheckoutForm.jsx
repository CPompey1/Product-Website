import React, { useState } from "react";
import styles from "./CheckoutForm.module.css";
import { ProductSection } from "../ProductList";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button_b from "../global_components/Button_b/Button_b";
import { SubTitleHeaderCustom } from "../global_components/stores/SubTitle";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import { Button, Grid2, Menu, MenuItem } from "@mui/material";
import { getStrapiData, getStrapiDomain } from "../../../util/strapi_utils";
const formFields = [
  { id: "name", label: "Name", type: "text" },
  { id: "address1", label: "Address", type: "text" },
  { id: "address2", label: "Address 2", type: "text" },
  { id: "city", label: "City", type: "text" },
  { id: "country", label: "Country", type: "text" },
];

export default function CheckoutForm({productId}) {
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const [productData, setProductData] = useState([]);
  const [inputs,setInputs] = useState({})
  const [ordeerPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const amountMenuOpen = Boolean(anchorEl);
  const MAX_ORDER_AMOUNT = 10;
  // const productId = useParams().productId

  const handleAmountButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAmmountButtonClose = (event) => {
    setAnchorEl(null);
  };
  

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("in handle change")
    setInputs(values => ({...values, [name]: value}))
  }

  const submitForm = async (event) =>  {
    if (inputs.name == null || inputs.address1 == null || inputs.address2 == null  || inputs.city == null || inputs.country == null || inputs.amount == null){
      setFormErrorMessage("Please fill out all fields")
      return
    }

    const response = await fetch(`/api/checkout/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs)
    })

    if (response.ok){
      const jsonResult = await response.json()
      console.log(jsonResult)
      setOrderId("null")
    }



  }
  
  useEffect(() => {
    const fetchData = async () => {
      // const fetchResult = await fetch(`/api/products/product/${productId}`, {
      //   method: 'GET',
      // })
      // const fetchResult = await fetch(`/api/products?filters[id]=${productId}`);
      const fetchResult = await getStrapiData(getStrapiDomain() + `/api/products?filters[id]=${productId}`);
    
      if (fetchResult.ok){
        const jsonResult = await fetchResult.json()
        setProductData(jsonResult.data[0])
        console.log(jsonResult)
      }
      console.log(productData)
    }
    fetchData()

  },[])

  return (

    <>
    {orderId != null ? 
      
      <OrderPlaced orderId={orderId}/> 
  
      :
    
      <main className={styles.container}>
        <section className={styles.mainSection}>
          
        
      
          <div className={styles.checkoutContainer}>
            <div className={styles.contentWrapper}>
              <div className={styles.twoColumnLayout}>
                <div style={{width: '50%'}}>
                <ProductSection 
                    className={styles.productWrapper} 
                    key={productData.id}
                    imageSrc={productData.image}
                    imageAlt = {productData.description}
                    text={productData.text}
                    title={productData.title}
                    link={`/product/${productData.id}`}
                />
                </div>

                <section className={styles.formColumn}>
                  <div className={styles.formContainer}>
                    <form
                      className={styles.checkoutForm}
                      method="POST"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      {formFields.map((field) => (
                        <div key={field.id} className={styles.formField}>
                          <label htmlFor={field.id}>{field.label}</label>
                          <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            className={styles.formInput}
                            aria-label={field.label}
                            value={inputs[field.id]}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      ))}
                    
                      <Grid2 container spacing={2} className={styles.costGrid}>
                        <Grid2 xs={6} className={styles.gridItem}>
                          <p>
                            ${productData.cost} x
                          </p>
                        </Grid2>
                        <Grid2 xs={6} className={styles.gridItem}>
                          <Button
                            id="basic-button"
                            aria-controls={amountMenuOpen ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={amountMenuOpen ? 'true' : undefined}
                            onClick={handleAmountButtonClick}
                            sx={{
                              backgroundColor: 'black', // Set the background color
                              color: 'white', // Set the text color
                              borderColor: 'black',
                              '&:hover': {
                                backgroundColor: 'grey', // Set the hover background color
                              },
                            }}

                          >
                            Count
                          </Button>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={amountMenuOpen}
                            onClose={handleAmmountButtonClose}
                            MenuListProps={{
                              'aria-labelledby': 'basic-button',
                            }}
                          >
                            {Array.from({ length: MAX_ORDER_AMOUNT }, (_, i) => i + 1).map((number) => (
                              <MenuItem key={number} onClick={() => {setInputs(values => ({...values, amount: number})); setAnchorEl(null); }}>
                                {number}
                              </MenuItem>
                            ))}
                         
                          </Menu>
           
                        </Grid2>
                      </Grid2>

                      <div style={{alignSelf: 'center'}}>
                       <label >Total Cost</label>
                        <p>${(productData.cost * inputs.amount) || 0}</p>
                      </div> 
                      <div
                        className={styles.messageContainer}
                        role="alert"
                        aria-live="polite"
                      >
                        {formErrorMessage && <div style={{backgroundColor: 'red', borderRadius: '3%'}}>{formErrorMessage}</div>}
                      </div>
                    </form>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <Button_b className={styles.submitButton} action={submitForm}>
            Submit
          </Button_b>
        </section>
      </main>
    }
  </>
  );
}

function OrderPlaced ( {orderId}){
  const navigate = useNavigate()
  return (
    <>
      <div className={styles.orderPlacedContainer}> 
        <CheckCircleOutlineOutlined style={{fontSize: '815%', color: '#64b164'}}/>
        <SubTitleHeaderCustom title={'Order Placed'}  color={'black'} fontSize={'45px'}/>
        <Button_b action={() => navigate(`/orders/order/${orderId}`)}>View Order</Button_b>
      </div>
    </>
  )
}