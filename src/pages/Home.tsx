// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import React from "react"

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
    <div className='main-bg'>
      <div className="modal">
        <button className="login-btn" onClick={handleClick}>
          Open VTube Studio
        </button>
      </div>
    </div>
  )
}

export default Home