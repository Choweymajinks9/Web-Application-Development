import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

// Functional component for displaying new collections
const NewCollections = () => {

  // State to store the new collection items
  const [new_collection, setNew_collection] = useState([]);

  // Fetch new collections data when the component mounts
  useEffect(() => {
    fetch('http://localhost:4000/newcollections')
      .then((response) => response.json())
      .then((data) => setNew_collection(data));
  }, []);

  // JSX for rendering the NewCollections component
  return (
    <div className='newcollections'>
      {/* Heading for the new collections section */}
      <h1>NEW COLLECTIONS</h1>
      {/* Horizontal line for visual separation */}
      <hr />
      <div className="collections">
        {/* Map through new_collection state to render individual items */}
        {new_collection.map((item, i) => {
          // Render the Item component for each item in new_collection
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
        })}
      </div>
    </div>
  );
}

export default NewCollections;
