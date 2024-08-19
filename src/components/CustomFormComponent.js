import React, { useState } from 'react'
import LocationTimeForm from './LocationTimeForm.js'
import EmotionsForm from './EmotionsForm'
import SafetyForm from './SafetyForm'
import BelongingForm from './BelongingForm'
import IdentityForm from './IdentityForm'
import FinalThoughtsForm from './FinalThoughtsForm.js'
import ReviewForm from './ReviewForm.js'
import ScrollArrow from './ScrollArrow'
import '../App.css'

const CustomFormComponent = ({
  formData,
  handleSliderChange,
  handleChange,
  handleSubmit
}) => {
  console.log('formData: ', formData)

  return (
    <div className='form-section'>
      <form onSubmit={handleSubmit}>
        <div id='location-time-section'>
          <LocationTimeForm formData={formData} handleChange={handleChange} />
          <ScrollArrow targetId='emotions-section' />
        </div>
        <div id='emotions-section'>
          <EmotionsForm
            formData={formData}
            onSliderChange={handleSliderChange}
          />
          <ScrollArrow targetId='safety-section' />
        </div>

        <div id='safety-section'>
          <SafetyForm formData={formData} onSliderChange={handleSliderChange} />
          <ScrollArrow targetId='belonging-section' />
        </div>

        <div id='belonging-section'>
          <BelongingForm
            formData={formData}
            onSliderChange={handleSliderChange}
          />
          <ScrollArrow targetId='identity-section' />
        </div>

        <div id='identity-section'>
          <IdentityForm formData={formData} handleChange={handleChange} />
          <ScrollArrow targetId='final-thoughts-section' />
        </div>

        <div id='final-thoughts-section'>
          <FinalThoughtsForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <ScrollArrow targetId='review-section' />
        </div>

        <div id='review-section'>
          <ReviewForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </form>
    </div>
  )
}

export default CustomFormComponent
