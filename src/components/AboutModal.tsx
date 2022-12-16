import React from 'react'

const AboutModal = () => {
  const handleClick = () => {
    console.log('about');
  };

  const handleUpdateCheck = () => {
    window.electronApi.send('check-updates', true);
  };

  return (
    <div className="modal">
      <h5 className="heading">ABOUT</h5>
      <div className="about-content">
        <button className="login-btn" onClick={handleClick}>
          OPEN WIKI
        </button>
        <p className="link mt-20" onClick={handleUpdateCheck}>
          Check for Updates
        </p>
        <p className="version">Version {process.env.REACT_APP_VERSION}</p>
      </div>
    </div>
  )
}

export default AboutModal