/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

// Functional component for adding a new product
const AddProduct = () => {
    // State variables to manage the form data and uploaded image
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "fnaf",
        new_price: "",
        old_price: "",
        description: "",
    });

    // Handler function for updating the image state when a file is selected
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    // Handler function for updating the productDetails state when form inputs change
    const changeHandler = (e) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value,
        });
        console.log(productDetails);
    };

    // Function to add the product by sending data to the server
    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = { ...productDetails };

        // Create a FormData object to handle file uploads
        let formData = new FormData();
        formData.append('product', image);

        // Upload the image to the server
        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        })
        .then((resp) => resp.json())
        .then((data) => {
            responseData = data;
        });

        // If image upload is successful, update the product object and send it to the server
        if (responseData.success) {
            product.image = responseData.image_url;

            console.log(product);

            // Add the product to the server
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            })
            .then((resp) => resp.json())
            .then((data) => {
                data.success ? alert("Product Added") : alert("Failed");
            });
        }
    };

    // JSX for the AddProduct component
    return (
        <div className='addproduct'>
            {/* Form fields for product details */}
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            {/* Price fields for old and new prices */}
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Old Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>New Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
                </div>
            </div>
            {/* Description field */}
            <div className="addproduct-itemfield">
                <p>Description</p>
                <input value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Type here' />
            </div>
            {/* Category dropdown */}
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="fnaf">FNAF</option>
                    <option value="minecraft">Minecraft</option>
                    <option value="assorted">Assorted</option>
                </select>
            </div>
            {/* File input for image upload */}
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            {/* Button to trigger the product addition process */}
            <button onClick={() => { Add_Product() }} className='addproduct-btn'>ADD</button>
        </div>
    );
};

export default AddProduct;
