import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item';

// Functional component for displaying popular products in Minecraft
const Popular = () => {

  // State to store the popular products
  const [popularProducts, setPopularProducts] = useState([]);

  // Fetch popular products in Minecraft data when the component mounts
  useEffect(() => {
    fetch('http://localhost:4000/popularinminecraft')
      .then((response) => response.json())
      .then((data) => setPopularProducts(data));
  }, []);

  // JSX for rendering the Popular component
  return (
    <div className='popular'>
      {/* Heading for the popular products section in Minecraft */}
      <h1>POPULAR IN MINECRAFT</h1>
      {/* Horizontal line for visual separation */}
      <hr />
      <div className="popular-item">
        {/* Map through popularProducts state to render individual items */}
        {popularProducts.map((item, i) => {
          // Render the Item component for each popular product
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
        })}
      </div>
    </div>
  );
}

export default Popular;
