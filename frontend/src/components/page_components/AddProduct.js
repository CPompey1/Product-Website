import React from 'react'
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './AddProduct.css'
import backendUrl from '../../globals';
import { Navigate, redirect } from 'react-router-dom';
function AddProduct() {
    const [inputs, setInputs] = useState({});
    const [response,setResponse] = useState({});
    const [imginputs, setImgInputs] = useState({
      Description: '',
      Image: undefined,
    });
    console.log("Enter AddProduct")
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
          const formData = new FormData()
          formData.append("Title",inputs.Title)
          formData.append("Description",inputs.Description)
          formData.append('Image',imginputs.Image)
          
          const fetchResult = await fetch("/add_product", {
            method: "POST",
            body: formData,
          });
          const jsonResult = await fetchResult.json()
          setResponse(jsonResult)
          console.log(jsonResult)
        }

  
        fetchData()
        window.location.href = "/"


      }
  return (
    <div className = "add-product-form">
      <form onSubmit= {HandleSubmit} >
        
        <div>
          <label>Title:
          <input
            type="text" 
            name="Title" 
            value={inputs.Title || ""} 
            onChange={handleChange}
          />
          </label>
        </div>

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