import React, { useState, useRef, useEffect } from 'react'
import MapComponent from './MapComponent'
import CustomFormComponent from './CustomFormComponent'
import ScrollArrow from './ScrollArrow'
import '../App.css'

const ContributeSection = ({ onSubmit }) => {
  // Utily function for converting a local date string to a unix timestamp
  const convertToUnixTimestamp = dateString => {
    const date = new Date(dateString)
    return date.getTime()
  }

  const initialFormData = {
    locationName: '',
    experience_date: '',
    happinessSadness: '',
    calmAnxious: '',
    awakeTired: '',
    safety: '',
    belonging: '',
    identityInterpretation: '',
     // identityTypes: '',
    finalThoughts: '',
    geometry: {
      longitude: null,
      latitude: null
    }
  }

  const [formData, setFormData] = useState(initialFormData)

  const mapComponentRef = useRef(null)

  // useEffect hook to update the formData state with the selected point's longitude and latitude
  useEffect(() => {
    if (mapComponentRef.current) {
      mapComponentRef.current.updateFormDataWithPoint = () => {
        if (mapComponentRef.current.selectedPoint) {
          const { longitude, latitude, experience_date } =
            mapComponentRef.current.selectedPoint
          setFormData(prevData => ({
            ...prevData,
            experience_date,
            geometry: {
              longitude,
              latitude
            }
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
    const formDataWithTimestamp = {
      ...formData,
      experience_date: convertToUnixTimestamp(formData.experience_date) // Convert to Unix timestamp
    }
    // Submit the form data to the server or API here
    onSubmit(formDataWithTimestamp)

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
        <ScrollArrow targetId='form-section' />
      </div>
      <div id='form-section'>
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
