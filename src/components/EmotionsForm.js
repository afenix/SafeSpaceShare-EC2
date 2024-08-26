import React, { useState, useEffect } from 'react';
import SliderComponent from './SliderComponent';

const EmotionsForm = ({ formData, setFormData }) => {

  const handleSliderChange = (emotionKey, value) => {
    const newEmotions = {
      ...formData.emotions,
      [emotionKey]: parseInt(value, 10),
    };

    setFormData(prevData => ({
      ...prevData,
      emotions: newEmotions,
    }));
  };

  return (
    <div>
      <h1 className="section-header dark">How do you feel?</h1>
      <p className="info-text dark">
      Please use the sliders below to rate your current emotional state:
      </p>
      <SliderComponent
        value={formData.emotions.anxious_calm}
        onChange={(value) => handleSliderChange('anxious_calm', value)}
        emojiLabels={['😟', '😕', '😐', '🙂', '😌']}
        labels={['Very Anxious', 'Anxious', 'Centered', 'Calm', 'Very Calm']}
      />
      <SliderComponent
        value={formData.emotions.sad_happy}
        onChange={(value) => handleSliderChange('sad_happy', value)}
        emojiLabels={['😢', '😞', '😐', '😊', '😁']}
        labels={['Despondent', 'Sad', 'Balanced', 'Happy', 'Elated']}
      />
      <SliderComponent
        value={formData.emotions.tired_awake}
        onChange={(value) => handleSliderChange('tired_awake', value)}
        emojiLabels={['😴', '😪', '😐', '🙂', '😃']}
        labels={['Exhausted', 'Tired', 'Awake', 'Alert', 'Energized']}
      />
    </div>
  );
};

export default EmotionsForm;