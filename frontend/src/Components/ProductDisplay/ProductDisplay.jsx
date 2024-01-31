import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

// Functional component for displaying detailed information about a product
const ProductDisplay = (props) => {
    // Destructure the 'product' prop from the passed-in props
    const { product } = props;
    
    // Access the 'addToCart' function from the ShopContext
    const { addToCart } = useContext(ShopContext);

    // JSX for rendering the ProductDisplay component
    return (
        <div className='productdisplay'>
            {/* Left section with product images */}
            <div className="productdisplay-left">
                {/* List of small product images */}
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                {/* Main product image */}
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            {/* Right section with product details */}
            <div className="productdisplay-right">
                {/* Product name */}
                <h1>{product.name}</h1>
                {/* Star rating */}
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    {/* Additional space for future rating */}
                    <p></p>
                </div>
                {/* Prices (old and new) */}
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">ZAR{product.old_price}</div>
                    <div className="productdisplay-right-price-new">ZAR{product.new_price}</div>
                </div>
                {/* Product description */}
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
                {/* Button to add the product to the cart */}
                <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
                {/* Product category and tags */}
                <p className='productdisplay-right-category'><span>Category :</span>Plush</p>
                <p className='productdisplay-right-category'><span>Tags :</span>Toy</p>
            </div>
        </div>
    )
}

export default ProductDisplay;
