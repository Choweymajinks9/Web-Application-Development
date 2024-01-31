/* eslint-disable no-unused-vars */
import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'

// Functional component for the admin page
const Admin = () => {
  // JSX for rendering the Admin component
  return (
    <div className='admin'>
      {/* Sidebar for navigation */}
      <Sidebar />
      {/* Routes for displaying different components based on the URL */}
      <Routes>
        {/* Route for the 'Add Product' page */}
        <Route path='/addproduct' element={<AddProduct />} />
        {/* Route for the 'List Product' page */}
        <Route path='/listproduct' element={<ListProduct />} />
      </Routes>
    </div>
  )
}

export default Admin
