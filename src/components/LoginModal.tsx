import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo-small.png"

const LoginModal = () => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/home');
  };

  return (
    <div className='modal'>
      <img src={Logo} alt="Avalon Launcher" className="logo-small" />
      <div className="login">
        <button className='login-btn' onClick={handleLogin}>Login</button>
        <label className="container"><p>Accept Terms of Service and Privacy Policy</p>
          <input type="checkbox" />
          <span className="checkmark" />
        </label>
      </div>
      <div className="update-check">
        <Link to='/update'><u>Check for Updates</u></Link>
        <p>Version 1.0.0</p>
      </div>
    </div>
  )
}

export default LoginModal