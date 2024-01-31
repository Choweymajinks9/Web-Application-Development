/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

// Functional component for displaying a list of products
const ListProduct = () => {

  // State variable to store the list of all products
  const [allproducts, setAllProducts] = useState([]);

  // Function to fetch product information from the server
  const fetchInfo = async () => {
    // Fetch data from the server's 'allproduct' endpoint
    await fetch('http://localhost:4000/allproduct')
      .then((res) => res.json())
      .then((data) => { setAllProducts(data) });
  }

  // useEffect hook to fetch product information when the component mounts
  useEffect(() => {
    fetchInfo();
  }, [])

  // Function to remove a product by sending a request to the server
  const remove_product = async (id) => {
    // Send a POST request to the server's 'removeproduct' endpoint
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    })
    // Fetch updated product information after removal
    await fetchInfo();
  }

  // JSX for rendering the ListProduct component
  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      {/* Header for the product list */}
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Description</p>
        <p>Remove</p>
      </div>
      {/* Display each product in the list */}
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return <>
            <div key={index} className="listproduct-format-main listproduct-format">
              {/* Display product information */}
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>ZAR{product.old_price}</p>
              <p>ZAR{product.new_price}</p>
              <p>{product.category}</p>
              <p>{product.description}</p>
              {/* Button to remove the product */}
              <img onClick={() => { remove_product(product.id) }} className='listproduct-remove-icon' src={cross_icon} alt="" />
            </div>
            <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct
