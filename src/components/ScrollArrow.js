import React from 'react';

const ScrollArrow = ({ targetId }) => {
  const handleClick = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({ top: targetElement.offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div className="scroll-arrow" onClick={handleClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4V20M12 20L6 14M12 20L18 14" stroke="#fbc02d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

export default ScrollArrow;