import React, { useState, useRef } from 'react'
import UserLocationComponent from './UserLocationComponent'
import CustomFormComponent from './CustomFormComponent'
import '../App.css'

const ContributeSection = ({ onSubmit }) => {
  // Initial form data structure - with emotions set to "3" to handle case if user does not
  // update the slider and wants to keep the neutral emotions.
  const initialFormData = {
    datetime: '',
    location: {
      longitude: '',
      latitude: ''
    },
    locationName: '',
    emotions: {
      sad_happy: 3,
      anxious_calm: 3,
      tired_awake: 3,
      unsafe_safe: 3,
      isolated_belonging: 3
    },
    selectedIdentities: [], // This should be an empty array to store objects
    finalThoughts: '',
  };

  // state to manage form data
  const [formData, setFormData] = useState(initialFormData)
  // ref to access UserLocationComponent methods - so that lat and long can be added to formData from UserLocationComponent
  // instead of relying on useEffect
  const mapComponentRef = useRef(null)

  // Handles form input changes and updates the formData state
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  // Handles slider input changes and updates the formData state (user emotions)
  const handleSliderChange = (emotion, value) => {
    setFormData(prevData => ({
      ...prevData,
      [emotion]: value
    }))
  }

  // Handles form submission and calls the onSubmit prop function.
  const handleSubmit = async e => {
    e.preventDefault()
    if (mapComponentRef.current) {
      mapComponentRef.current.updateFormDataWithPoint()
    }

    // Before submitting, make sure the user has selected a location on the map
    if (formData.location.latitude === '' || formData.location.longitude === '') {
      window.alert('Please select a location on the map before submitting.');
      return;
    }

    // Submit the form data to the server or API here
    onSubmit(formData)

    // Reset the form data after submission
    setFormData(initialFormData)

    // Show success alert
    window.alert('Your Experience was submitted successfully! THANK YOU! Your data will help support and improve community awareness and safety.')

    // Scroll to the "Explore section" element
    document
      .getElementById('explore-section')
      .scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <div id='map-section'>
        <UserLocationComponent
          ref={mapComponentRef}
          formData={formData}
          setFormData={setFormData}
          onMapReady={() => {}}
        />
      </div>
      <div id ='user-form-section'>
        <CustomFormComponent
          formData={formData}
          setFormData={setFormData}
          handleSliderChange={handleSliderChange}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default ContributeSection
