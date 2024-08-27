import React from 'react';
import '../App.css';

const WelcomeSection = () => {
  return (
    <div>
    <header className="App-header">
      <h1 className="section-header">WELCOME</h1>
      <p>to</p>
      <h2 className="sub-heading">Safe Space Share</h2>
      <img id="s3-icon" src={`${process.env.PUBLIC_URL}/img/SafeSpaceShare_logo.png`} alt="icon" className="s3-icon3" />
      <h3 className="tagline">You belong here.</h3>
    </header>
  </div>
  );
};

export default WelcomeSection;