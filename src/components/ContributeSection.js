import React, { useState, useRef, useEffect } from 'react'
import MapComponent from './MapComponent'
import CustomFormComponent from './CustomFormComponent'
import ScrollArrow from './ScrollArrow'
import '../App.css'

const ContributeSection = ({ onSubmit }) => {

  const initialFormData = {
    datetime: '',
    location: {
      longitude: null,
      latitude: null
    },
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

  const [formData, setFormData] = useState(initialFormData)

  const mapComponentRef = useRef(null)

  // useEffect hook to update the formData state with the selected point's longitude and latitude
  useEffect(() => {
    if (mapComponentRef.current) {
      mapComponentRef.current.updateFormDataWithPoint = () => {
        if (mapComponentRef.current.selectedPoint) {
          const { datetime, location, locationName } =
            mapComponentRef.current.selectedPoint
          setFormData(prevData => ({
            ...prevData,
            datetime,
            location,
            locationName
          }))
        }
      }
    }
  }, [mapComponentRef])

  // Handles form input changes and updates the formData state.
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  // Handles slider input changes and updates the formData state.
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

    console.log('formData in the ContributeSection: ', formData)
    // Check if latitude and longitude are set
    if (formData.location.latitude === null || formData.location.longitude === null) {
      window.alert('Please select a location on the map before submitting.');
      return;
    }

    // Submit the form data to the server or API here
    onSubmit(formData)

    // Clear the form inputs
    setFormData(initialFormData)

    // Show success alert
    window.alert('Your Experience was submitted successfully! THANK YOU! Your data will help support and improve community awareness and safety.')

    // Scroll to the "Action section" element
    document
      .getElementById('action-section')
      .scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <div id='map-section'>
        <MapComponent
          ref={mapComponentRef}
          formData={formData}
          setFormData={setFormData}
          onMapReady={() => {}}
        />
        {/* <ScrollArrow targetId='form-section' /> */}
      </div>
      <div className='experience-form-section'>
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
