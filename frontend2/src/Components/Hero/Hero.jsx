import React from 'react'
import './Hero.css'
import jax_icon from '../Assets/jax_icon.png'
import hero_image from '../Assets/hero_image.png'

const Hero = () => {
  return (
    <div className= 'hero'>
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
         <div>
            <div className="hero-jax-icon">
                <p>new</p>
                <img src={jax_icon} alt="" />
            </div>
            <p>collection</p>
            <p>for everyone</p>
         </div>
         
    </div>
    <div className="hero-right">
        <img src={hero_image} alt="" />
    </div>
   </div> 
  )
}

export default Hero
