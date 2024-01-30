import React from 'react'
import '../../Pages/CSS/ShopCategory.css'
import Item from '../Item/Item'
import { useEffect, useState } from "react";

const ExclusiveOffers = () => {

    const [exclusiveItems, setExclusiveItems] = useState([]);
  
    useEffect(() => {
      // Fetch data from the backend for exclusive items
      fetch('http://localhost:4000/exclusive-offers/')
        .then((response) => response.json())
        .then((data) => setExclusiveItems(data));
    }, []);
  
    return (
      <div className='exclusive-offers'>
        <h1>EXCLUSIVE OFFERS</h1>
        <hr />
        <div className="exclusive-offers-item">
          {exclusiveItems.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
          })}
        </div>
      </div>
    );
  };
  
  export default ExclusiveOffers;