import React, { useState } from 'react';
import SliderComponent from './SliderComponent';

const EmotionsForm = ({ formData, onSliderChange }) => {
  const [emotions, setEmotions] = useState({
    anxiousCalm: 2,
    sadHappy: 2,
    exhaustedAwake: 2,
  });

  const handleSliderChange = (emotion) => (event) => {
    setEmotions({ ...emotions, [emotion]: event.target.value });
  };

  return (
    <div>
      <h1 className="section-header">How do you feel?</h1>
      <p className="info-text">
        Emotions can be complex, but we'd like to know how you're feeling right now.
        Please use the sliders below to rate your current emotional state:
      </p>
      <SliderComponent
        labelLeft="Anxious"
        labelRight="Calm"
        value={formData.calmAnxious}
        onChange={(value) => onSliderChange('calmAnxious', value)}
        emojiLabels={['😟', '😕', '😐', '🙂', '😌']}
        labels={['Very Anxious', 'Anxious', 'Centered', 'Calm', 'Very Calm']}
      />
      <SliderComponent
        labelLeft="Sad"
        labelRight="Happy"
        value={formData.happinessSadness}
        onChange={(value) => onSliderChange('happinessSadness', value)}
        emojiLabels={['😢', '😞', '😐', '😊', '😁']}
        labels={['Despondent', 'Sad', 'Balanced', 'Happy', 'Elated']}
      />
      <SliderComponent
        labelLeft="Exhausted"
        labelRight="Awake"
        value={formData.awakeTired}
        onChange={(value) => onSliderChange('awakeTired', value)}
        emojiLabels={['😴', '😪', '😐', '🙂', '😃']}
        labels={['Exhausted', 'Tired', 'Awake', 'Alert', 'Energized']}
      />

    </div>
  );
};

export default EmotionsForm;