import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const citiesByCountry = {
    usa: { default: '', cities: ['New York', 'Los Angeles'] },
    canada: { default: '', cities: ['Toronto', 'Vancouver'] },
    south_africa: { default: '', cities: ['Cape Town', 'Johannesburg'] },
    germany: { default: '', cities: ['Berlin', 'Munich'] },
    japan: { default: '', cities: ['Tokyo', 'Machida'] },
    // Add more countries and cities as needed
  };

  const calculateShipping = () => {
    // Perform shipping cost calculation based on selected country and city
    // For simplicity, using hardcoded values
    if (selectedCountry === 'usa') {
      setShippingCost(1899);
    } else if (selectedCountry === 'canada') {
      setShippingCost(1599);
    } else if (selectedCountry === 'south_africa') {
      setShippingCost(299);
    } else if (selectedCountry === 'germany') {
      setShippingCost(1599);
    } else if (selectedCountry === 'japan') {
      setShippingCost(2399);
    }
    // Add more conditions for other countries
  };

  const applyPromoCode = () => {
    // You can replace this with your actual promo code validation logic
    // For simplicity, using a hardcoded promo code and discount
    if (promoCode === 'SAVE10') {
      setDiscount(10); // Apply a 10% discount
    } else if (promoCode === 'SAVE50') {
      setDiscount(50); // Apply a 50% discount
    } else {
      setDiscount(0); // Invalid promo code, reset discount
      alert('Invalid promo code. Please try again.');
    }
  };

  const proceedToCheckout = () => {
    // Apply the discount to the total amount before proceeding to checkout
    const discountedTotal = getTotalCartAmount() + shippingCost - (getTotalCartAmount() * discount) / 100;
    alert(`Proceeding to Checkout. Mockup Payment will be performed.\nTotal amount: ZAR${discountedTotal}`);
    // You can redirect to a payment page or perform other checkout actions here
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>ZAR{e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>ZAR{e.new_price * cartItems[e.id]}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      {/* Shipping Calculator */}
      <div className="shipping-calculator">
        <h2>Shipping Calculator</h2>
        <label htmlFor="country">Select Country:</label>
        <select
          id="country"
          onChange={(e) => {
            const country = e.target.value;
            setSelectedCountry(country);
            setSelectedCity(citiesByCountry[country]?.default || ''); // Set default city for the selected country
          }}
          value={selectedCountry}
        >
          <option value="">Select Country</option>
          <option value="usa">USA</option>
          <option value="canada">Canada</option>
          <option value="south_africa">South Africa</option>
          <option value="germany">Germany</option>
          <option value="japan">Japan</option>
          {/* Add more countries as needed */}
        </select>

        <label htmlFor="city">Select City:</label>
        <select
          id="city"
          onChange={(e) => setSelectedCity(e.target.value)}
          value={selectedCity}
        >
          <option value="">{selectedCity || 'Select City'}</option>
          {citiesByCountry[selectedCountry]?.cities?.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <button onClick={calculateShipping}>Calculate Shipping</button>
        <p>Shipping Cost: ZAR{shippingCost}</p>
      </div>

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>ZAR{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>ZAR{shippingCost}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Discount on item (ex Shipping)</p>
              <p>{discount}%</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>ZAR{getTotalCartAmount() + shippingCost - (getTotalCartAmount() * discount) / 100}</h3>
            </div>
          </div>
          <button onClick={proceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input
              type="text"
              placeholder='promo code'
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={applyPromoCode}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
