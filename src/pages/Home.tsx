// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import React from "react"
import Navbar from "src/components/Navbar"
import Logo from "../assets/logo-big.png"

const Home = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     setIsLoggedIn(false);
  //     navigate('/login')
  //   }
  // },[]);

  const handleClick = () => {
    window.location.href = "steam://run/1325860"
  }
  return (
    <>
      <Navbar />
      <div className='main-bg'>
        <div className="modal">
          <img src={Logo} alt="Avalon Launcher" className="logo" />
          <div className="home-content">
            <button className="login-btn" onClick={handleClick}>
              Open VTube Studio
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home