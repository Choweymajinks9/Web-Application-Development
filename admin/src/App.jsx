/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'

// Functional component for the main App
const App = () => {
  // JSX for rendering the App component
  return (
    <div>
      {/* Navigation bar component */}
      <Navbar />
      {/* Admin page component */}
      <Admin />
    </div>
  )
}

export default App
