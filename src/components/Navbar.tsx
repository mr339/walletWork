import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    navigate(`/${link}`);
  }

  return (
    <div className='navbar'>
      <div className="left">
        <div className={`nav-btn ${window.location.pathname === '/home' && 'nav-btn-active'}`} onClick={() => handleClick('home')}>
          HOME
        </div>
      </div>
      <div className="right">
        <div className={`nav-btn ${window.location.pathname === '/about' && 'nav-btn-active'}`} onClick={() => handleClick('about')}>
          ABOUT
        </div>
        <div className="nav-btn" onClick={() => navigate('/')}>
          LOGOUT
        </div>
      </div>
    </div>
  )
}

export default Navbar