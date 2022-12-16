import React from 'react';
import AboutModal from 'src/components/AboutModal';
import Navbar from 'src/components/Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="main-bg">
        <AboutModal />
      </div>
    </>
  );
};

export default About;
