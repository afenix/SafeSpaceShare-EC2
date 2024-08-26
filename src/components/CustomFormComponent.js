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
      <div id='location-time-section'>
        <LocationTimeForm formData={formData} handleChange={handleChange} />
        {/* <ScrollArrow targetId='emotions-section' /> */}
      </div>
      <div id='emotions-container'>
        <div id='emotions-section' className='form-section'>
          <EmotionsForm
            formData={formData}
            setFormData={setFormData}
            onSliderChange={handleSliderChange}
          />
          {/* <ScrollArrow targetId='safety-section' /> */}
        </div>
      </div>
      <div id='safety-container'>
        <div id='safety-section' className='form-section'>
          <SafetyForm
            formData={formData}
            setFormData={setFormData}
            onSliderChange={handleSliderChange}
          />
          {/* <ScrollArrow targetId='belonging-section' /> */}
        </div>
      </div>
      <div id='belonging-container'>
        <div id='belonging-section' className='form-section'>
          <BelongingForm
            formData={formData}
            setFormData={setFormData}
            onSliderChange={handleSliderChange}
          />
          {/* <ScrollArrow targetId='identity-section' /> */}
        </div>
      </div>
      <div id='identity-container'>
        <div id='identity-section' className='form-section'>
          <IdentityForm formData={formData} handleChange={handleChange} />
          {/* <ScrollArrow targetId='final-thoughts-section' /> */}
        </div>
      </div>
      <div id='final-thoughts-container'>
        <div id='final-thoughts-section' className='form-section'>
          <FinalThoughtsForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          {/* <ScrollArrow targetId='review-section' /> */}
        </div>
      </div>
      <div id='review-container'>
        <div id='review-section' class='form-section'>
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
