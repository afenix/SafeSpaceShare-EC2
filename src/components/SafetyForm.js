import React from 'react';
import SliderComponent from './SliderComponent';

const SafetyForm = ({ formData, onSliderChange }) => {
  return (
    <div>
      <h1 className="section-header">Do you feel SAFE?</h1>
      <p className="warning">
        Warning: If you are in immediate danger, STOP NOW, <br/> seek safety and call 911.
      </p>
      <p className="info-text">
        Please use the slider below to rate how SAFE you feel right now:
      </p>
      <SliderComponent
        labelLeft="NO!"
        labelRight="YES!"
        value={formData.emotions.unsafe_safe}
        onChange={(value) => onSliderChange('unsafe_safe', value)}
        emojiLabels={['🚨', '⚠️', '🤷', '🤝', '💚 ']}
        labels={['Dangerous', 'Risky', 'Uncertain', 'Secure', 'Very Safe']}
      />
    </div>

  );
};

export default SafetyForm;