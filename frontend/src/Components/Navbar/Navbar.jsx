import React, { useContext, useState, useRef } from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown_icon.png'

// Functional component for the navigation bar
const Navbar = () => {

    // State to manage the active menu item
    const [menu, setMenu] = useState("shop");

    // Context to access cart-related functions
    const { getTotalCartItems } = useContext(ShopContext);

    // Reference for the menu dropdown
    const menuRef = useRef();

    // Function to toggle the visibility of the menu dropdown
    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    // JSX for rendering the Navbar component
    return (
        <div className='navbar'>
            {/* Logo and store name */}
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>MPS Store</p>
            </div>
            {/* Dropdown icon to toggle the menu */}
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            {/* Menu items */}
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => { setMenu("shop") }}>
                    {/* Link to the Shop page */}
                    <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>
                    {/* Highlight the menu item if it is active */}
                    {menu === "shop" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("fnaf") }}>
                    {/* Link to the FNAF page */}
                    <Link style={{ textDecoration: 'none' }} to='/fnaf'>FNAF</Link>
                    {menu === "fnaf" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("minecraft") }}>
                    {/* Link to the Minecraft page */}
                    <Link style={{ textDecoration: 'none' }} to='/minecraft'>Minecraft</Link>
                    {menu === "minecraft" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("assorted") }}>
                    {/* Link to the Assorted Toys page */}
                    <Link style={{ textDecoration: 'none' }} to='/assorted'>Assorted Toys</Link>
                    {menu === "assorted" ? <hr /> : <></>}
                </li>
            </ul>
            {/* Login and Cart section */}
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                    ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
                    : <Link to='/login'><button>Login</button></Link>}
                {/* Link to the Cart page */}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                {/* Display the total number of items in the cart */}
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar
