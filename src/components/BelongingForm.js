import React from 'react';
import SliderComponent from './SliderComponent';

const BelongingForm = ({ formData, onSliderChange }) => {
  return (
    <div>
      <h1 className="section-header">Do you feel a sense of BELONGING?</h1>
      <p className="info-text">
        Please use the slider below to rate how much you feel like you BELONG right now:
      </p>
      <SliderComponent
        labelLeft="NO!"
        labelRight="YES!"
        value={formData.belonging}
        onChange={(value) => onSliderChange('belonging', value)}
        emojiLabels={['😶‍🌫️', '😔', '🤷', '🤗', '🥰']}
        labels={['Alienated', 'Lonely', 'Ambivalent', 'Connected', 'Integrated']}
      />
    </div>

  );
};

export default BelongingForm;