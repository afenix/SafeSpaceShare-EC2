import React from 'react'
import useIdentityCategories from '../hooks/useIdentityCategories.js';
import LocationTimeForm from './LocationTimeForm.js'
import EmotionsForm from './EmotionsForm'
import SafetyForm from './SafetyForm'
import BelongingForm from './BelongingForm'
import IdentityForm from './IdentityForm'
import FinalThoughtsForm from './FinalThoughtsForm.js'
import ReviewForm from './ReviewForm.js'
import '../App.css'

const CustomFormComponent = ({
  formData,
  setFormData,
  handleChange,
  handleSubmit
}) => {

  const handleSliderChange = (emotionKey, value) => {
    setFormData(prevData => ({
      ...prevData,
      emotions: {
        ...prevData.emotions,
        [emotionKey]: parseInt(value, 10)
      }
    }));
  };

  const { identityCategories } = useIdentityCategories();

  return (
    <form onSubmit={handleSubmit}>
       <div id='location-time-container'>
        <div id='location-time-section' className='form-section'>
          <LocationTimeForm formData={formData} handleChange={handleChange} />
        </div>
      </div>
      <div id='emotions-container'>
        <div id='emotions-section' className='form-section'>
          <EmotionsForm
            formData={formData}
            setFormData={setFormData}
            onSliderChange={handleSliderChange}
          />
        </div>
      </div>
      <div id='safety-container'>
        <div id='safety-section' className='form-section'>
          <SafetyForm
            formData={formData}
            setFormData={setFormData}
            onSliderChange={handleSliderChange}
          />
        </div>
      </div>
      <div id='belonging-container'>
        <div id='belonging-section' className='form-section'>
          <BelongingForm
            formData={formData}
            setFormData={setFormData}
            onSliderChange={handleSliderChange}
          />
        </div>
      </div>
      <div id='identity-container'>
        <div id='identity-section'>
          <IdentityForm formData={formData} handleChange={handleChange} />
        </div>
      </div>
      <div id='final-thoughts-container'>
        <div id='final-thoughts-section' className='form-section'>
          <FinalThoughtsForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <div id='review-container'>
        <div id='review-section'>
          <ReviewForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            identityCategories={identityCategories}
          />
        </div>
      </div>
    </form>
  )
}

export default CustomFormComponent
