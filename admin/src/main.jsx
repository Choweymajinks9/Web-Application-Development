import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"

// Use React StrictMode for additional runtime checks
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Use BrowserRouter for enabling client-side routing */}
    <BrowserRouter>
      {/* Root component of the application */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
