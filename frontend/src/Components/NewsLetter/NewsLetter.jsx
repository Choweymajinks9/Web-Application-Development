import React, { useState } from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async () => {
    try {
      // Basic email validation
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email address');
        return;
      }

      // Make a POST request to the server to subscribe to the newsletter
      const response = await fetch('http://localhost:4000/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      // Display the response message
      alert(data.message);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error.message);
    }
  };

  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input
          type="email"
          placeholder="Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
    </div>
  );
};

export default NewsLetter;
