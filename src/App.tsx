import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import About from './pages/About';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Update from './pages/Update';

import "./style/main.css";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.electronApi.on('update-app', (data: boolean) => {
      if (data[0]) {
        navigate('/update')
      }
    })
  }, [])
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/update" element={<Update />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default App