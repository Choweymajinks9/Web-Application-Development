import React, { useState } from 'react'
import './CSS/LoginSignup.css'

// Functional component for login and signup functionality
const LoginSignup = () => {

  // State to manage the current form state (Login/Sign Up)
  const [state, setState] = useState("Login");

  // State to manage form data (username, password, email)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  // Handler function to update form data on input change
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Function to handle the login process
  const login = async () => {
    console.log("Login Function Executed", formData);
    let responseData;

    // Send a POST request to the login endpoint
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => responseData = data)

    // Handle the response and redirect on success
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors)
    }
  }

  // Function to handle the signup process
  const signup = async () => {
    console.log("Signup Function Executed", formData);
    let responseData;

    // Send a POST request to the signup endpoint
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => responseData = data)

    // Handle the response and redirect on success
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors)
    }
  }

  // JSX for rendering the LoginSignup component
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        {/* Display current form state (Login/Sign Up) */}
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {/* Conditionally render username field for Sign Up */}
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
          {/* Email and password fields */}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        {/* Button to trigger either login or signup based on form state */}
        <button onClick={() => { state === "Login" ? login() : signup(); }}>Continue</button>
        {/* Toggle between Login and Sign Up and provide link to switch */}
        {state === "Sign Up"
          ? <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}> Login here</span></p>
          : <p className="loginsignup-login">Create an account? <span onClick={() => { setState("Sign Up") }}> Click here</span></p>}
        {/* Agreement checkbox */}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
