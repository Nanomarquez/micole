import React from 'react'
import { Route, Routes } from "react-router-dom";
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import Home from './pages/Home';
function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App