import React from 'react';

const SliderComponent = ({ value, onChange, emojiLabels, labels }) => {
  return (
    <div className="slider-section">
      <div className="slider-labels">
      {labels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="slider"
      />
      <div className="emoji-labels">
        {emojiLabels.map((emoji, index) => (
          <span key={index} className="emoji">
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SliderComponent;