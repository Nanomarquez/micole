import React from 'react'
import { Route, Routes } from "react-router-dom";
import Footer from './components/Footer'
import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home/Home';
import EnrollSchool from './pages/EnrollSchool';
import Carrusel from './components/Carrusel/Carrusel';
function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/enroll" element={<EnrollSchool/>}/>
  
    </Routes>
    <Footer/>
    </>
  )
}

export default App