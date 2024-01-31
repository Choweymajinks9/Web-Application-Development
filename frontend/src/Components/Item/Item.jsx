import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

// Functional component for rendering individual items
const Item = (props) => {
  // JSX for rendering the Item component
  return (
    <div className='item'>
      {/* Link to the product details page */}
      <Link to={`/product/${props.id}`}>
        {/* Image of the item */}
        <img onClick={window.scrollTo(0, 0)} src={props.image} alt="" />
      </Link>
      {/* Name of the item */}
      <p>{props.name}</p>
      {/* Prices of the item (new and old) */}
      <div className="item-prices">
        {/* New price */}
        <div className="item-price-new">
          ZAR{props.new_price}
        </div>
        {/* Old price */}
        <div className="item-price-old">
          ZAR{props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item
