import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/logo-small.png"

const LoginModal = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (isChecked) {
      navigate('/home');
    } else {
      setErrorMessage('Please accept before logging in')
    }
  };

  const handleUpdateCheck = () => {
    window.electronApi.send('check-updates', true);
  };

  const handleAccept = () => {
    setIsChecked(!isChecked);
    setErrorMessage('');
  }

  return (
    <div className='modal'>
      <img src={Logo} alt="Avalon Launcher" className="logo-small" />
      <div className="login">
        <button className='login-btn' onClick={handleLogin}>Login</button>
        <label className="container"><p>Accept Terms of Service and Privacy Policy</p>
          <input type="checkbox" checked={isChecked} onClick={handleAccept} />
          <span className="checkmark" />
        </label>
        <p className="error">{errorMessage}</p>
      </div>
      <div className="update-check">
        <p onClick={handleUpdateCheck} className='link'>Check for Updates</p>
        <p>Version {process.env.REACT_APP_VERSION}</p>
      </div>
    </div>
  )
}

export default LoginModal