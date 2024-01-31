// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/product_list_icon.svg'

// Functional component for the sidebar navigation
const Sidebar = () => {
  // JSX for rendering the Sidebar component
  return (
    <div className='sidebar'>
      {/* Link to the 'Add Product' page */}
      <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          {/* Icon for adding a product */}
          <img src={add_product_icon} alt="" />
          {/* Text for adding a product */}
          <p>Add Product</p>
        </div>
      </Link>
      {/* Link to the 'List Product' page */}
      <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          {/* Icon for listing products */}
          <img src={list_product_icon} alt="" />
          {/* Text for listing products */}
          <p>List Product</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
