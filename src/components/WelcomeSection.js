import React from 'react';
import '../App.css';

const WelcomeSection = () => {
  return (
    <div>
    <header className="App-header">
      <h1 id="welcome-header" className="s3-header">WELCOME</h1>
      <p id="sub-item" className="s3-header">to</p>
      <h2 id="sub-heading">SafeSpaceShare (S3)</h2>
      <img id="s3-icon" src={`${process.env.PUBLIC_URL}/img/S3_Icon_Orange.png`} alt="icon" className="s3-icon3" />
      <h3 id="tagline">You belong here.</h3>
    </header>
  </div>
  );
};

export default WelcomeSection;