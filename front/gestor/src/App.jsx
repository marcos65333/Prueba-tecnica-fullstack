import React from 'react'
import './App.css'
import Home from './pages/home/home'
import { ToastContainer } from "react-toastify"


function App() {

  return (
    <>
      <Home />
      <ToastContainer
        className="toast-container"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        position="top-center"
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </>
  )
}

export default App
