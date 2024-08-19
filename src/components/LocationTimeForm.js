import React, { useState } from 'react'

const LocationTimeForm = ({ formData, handleChange }) => {
  return (
    <div>
      <h1 className='section-header'>
        Next, Set the Scene:
      </h1>
      <div className='form-subheader'>Share the Location and Time of Your Experience</div>
      <p className='info-text'>
        Please provide the name of the location (if known) and the date and time
        of your experience.
      </p>
      <div id='location-date-container'>
        <div className='form-group'>
          <label className='form-labels'>Name of Location:</label>
          <input
            className='form-inputs'
            type='text'
            name='locationName'
            value={formData.locationName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-labels'>Date and Time of Experience:</label>
          <input
            className='form-inputs'
            type='datetime-local'
            name='experience_date'
            value={formData.experience_date}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  )
}

export default LocationTimeForm
