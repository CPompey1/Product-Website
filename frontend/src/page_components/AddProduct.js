import React from 'react'
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './AddProduct.css'
import backendUrl from '../globals';
function AddProduct() {
    const [inputs, setInputs] = useState({});
    const [response,setResponse] = useState({});
    const [imginputs, setImgInputs] = useState({
      Description: '',
      Image: undefined,
    });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const handleImgChange = (e) => {
      const { name, value, type, files } = e.target;
      if (type === 'file') {
        setImgInputs((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      } else {
        setImgInputs((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    };
    const HandleSubmit = (event) => {
        event.preventDefault();
        const fetchData = async () => {
          const requestOptions = {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(inputs)
          };
          console.log(requestOptions)
          const fetchResult = await fetch("/add_product",requestOptions)
          const jsonResult = await fetchResult.json()
          setResponse(jsonResult)

          console.log(jsonResult)
        }
        fetchData()
        
      }
  return (
    <div className = "add-product-form">
      <form action='/add_product' method="post" encType="multipart/form-data">
        
        <div>
          <label>Strain:
          <input
            type="text" 
            name="Strain" 
            value={inputs.Strain || ""} 
            onChange={handleChange}
          />
          </label>
        </div>

        {/* <div>

          <label htmlFor="type">Type:
    
          <select id = "type" name="Type" onChange={handleChange}>
            <option value={"Sativa"} >Sativa</option>
            <option value={"Hybrid"} >Hybrid</option>
            <option value={"Indica"} >Indica</option>
    
          </select>

          </label>
        </div> */}

        <div>
          <label>Description:
            <input 
              type="text" 
              name="Description" 
              value={inputs.Description || ""} 
              onChange={handleChange}
            />
            </label>
          </div>
          <div>
            <label>Image
              <input type="file" name = "Image" value = {inputs.Image} onChange={handleImgChange}/>
            </label>
          </div>
          <input type="submit" />
      </form>
    </div>
  )
};
export default AddProduct;
