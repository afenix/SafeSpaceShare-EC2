import React from 'react';
import '../App.css';

const ActionSection = () => {
  return (
    <div id="action-section">
      <h1 className="section-header">What would you like to do today?</h1>
      <p className="info-text">Click on an option below to get started</p>
      <div className="navigation-buttons">
        <button onClick={() => document.getElementById('contribute').scrollIntoView({ behavior: 'smooth' })}>
          Share Your Experience
        </button>
        <button onClick={() => document.getElementById('explore').scrollIntoView({ behavior: 'smooth' })}>
          Explore Experiences
        </button>
      </div>
    </div>
  );
};

export default ActionSection;