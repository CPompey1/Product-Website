import React, { useState } from "react";
import styles from "./CheckoutForm.module.css";
import { ProductSection } from "../ProductList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button_b from "../global_components/Button_b/Button_b";
import { SubTitleHeaderCustom } from "../global_components/stores/SubTitle";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
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
  

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("in handle change")
    setInputs(values => ({...values, [name]: value}))
  }

  const submitForm = async (event) =>  {

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
      const fetchResult = await fetch(`/api/products/product/${productId}`, {
        method: 'GET',
      })
    
      if (fetchResult.ok){
        const jsonResult = await fetchResult.json()
        setProductData(jsonResult)
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
       
          <ProductSection 
            className={styles.productWrapper} 
            key={productData._id}
            imageSrc={`/media/${productData.imageSrc}`}
            imageAlt = {productData.imageAlt}
            text={productData.text}
            title={productData.title}
            link={`/product/${productData._id}`}
        />
      
          <div className={styles.checkoutContainer}>
            <div className={styles.contentWrapper}>
              <div className={styles.twoColumnLayout}>
                <section className={styles.quantityColumn}>
                  <div className={styles.priceCalculator}>
                    <div className={styles.calculatorWrapper}>
                      <div className={styles.calculatorGrid}>
                        <div className={styles.quantityColumn}>
                          <input
                            type="number"
                            name="amount"
                            aria-label="Quantity"
                            className={styles.quantityInput}
                            value={inputs["amount"]}
                            onChange={handleChange}
                          />
                        </div>
                        <div className={styles.multiplyColumn}>
                          <p className={styles.multiplySymbol}>x</p>
                        </div>
                        <div className={styles.priceColumn}>
                          <p className={styles.priceDisplay}>35$</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

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

                      <div
                        className={styles.messageContainer}
                        role="alert"
                        aria-live="polite"
                      >
                        {formErrorMessage && <p>{formErrorMessage}</p>}
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
        <Button_b  action={() => navigate(`/orders/order/${orderId}`)}>View Order</Button_b>
      </div>
    </>
  )
}