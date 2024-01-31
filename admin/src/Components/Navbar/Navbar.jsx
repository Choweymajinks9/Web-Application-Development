/* eslint-disable no-unused-vars */
import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'

// Functional component for the navigation bar
const Navbar = () => {
  // JSX for rendering the Navbar component
  return (
    <div className='navbar'>
      {/* Logo for the navigation bar */}
      <img src={navlogo} alt="" className="nav-logo" />
      {/* Profile icon for the navigation bar */}
      <img src={navProfile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar
