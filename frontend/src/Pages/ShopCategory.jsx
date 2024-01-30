import React, { useContext, useEffect, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [exclusiveItems, setExclusiveItems] = useState([]);

  useEffect(() => {
    // Fetch exclusive products for the '/exclusive-offers' endpoint
    if (props.category === 'exclusive') {
      fetch(`http://localhost:4000/exclusive-offers`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched Exclusive Items:", data);
          setExclusiveItems(data);
        })
        .catch((error) => console.error("Fetch Error:", error));
    } else {
      // For other categories, set exclusiveItems to an empty array
      setExclusiveItems([]);
    }
  }, [props.category]);
  

  // Filter regular products based on the category
  const regularProducts = all_product.filter((item) => item.category === props.category);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt='' />
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing</span> {props.category} products
        </p>
      </div>
      <div className='shopcategory-products'>
        {/* Render regular products based on the category */}
        {regularProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}

        {/* Render random exclusive products */}
        {exclusiveItems.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            exclusive // Optionally, add a flag to distinguish exclusive products
          />
        ))}
      </div>
      <div className='shopcategory-loadmore'>{/* Add load more logic if needed */}</div>
    </div>
  );
};

export default ShopCategory;
