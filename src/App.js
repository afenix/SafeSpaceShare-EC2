// Code to render the main application
import React, { useEffect, useState } from 'react';
import WelcomeSection from './components/WelcomeSection';
import AboutSection from './components/AboutSection';
import ContributeSection from './components/ContributeSection';
import ExploreMapSection from './components/ExploreMapSection';
import './App.css';

const App = () => {
  const [mapKey] = useState(0); // State to trigger map re-initialization
  const [submissionResponse, setSubmissionResponse] = useState(null);

  const handleSubmit = async (formData) => {
    // Prepare the payload
    // Handle use case where user answers "No"
    const identities = (formData.selectedIdentities === 0) ? [] : formData.selectedIdentities;
    const payload = {
      datetime: formData.datetime,
      location: formData.location,
      locationName: formData.locationName,
      selectedIdentities: identities,
      emotions: formData.emotions,
      finalThoughts: formData.finalThoughts
    };

    console.log("Payload from app.js:", payload); // Debugging log

    // Send the data to the backend
    const response = await fetch('http://54.241.131.41:8000/api/submit-experience', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();
    setSubmissionResponse(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <div id="welcome-section">
        <WelcomeSection />
      </div>
      <div id='about-section'>
        <AboutSection />
      </div>
      <div id="contribute">
        <ContributeSection onSubmit={handleSubmit} />
      </div>
      <div id="explore">
        <ExploreMapSection key={mapKey}/>
      </div>
    </div>
  );
}

export default App;
