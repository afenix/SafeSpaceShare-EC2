import React, { useState, useEffect } from 'react';

const ExperienceForm = () => {
    const [datetime, setDatetime] = useState('');
    const [location, setLocation] = useState({ lat: '', long: '' });
    const [experience, setExperience] = useState('');
    const [selectedIdentities, setSelectedIdentities] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [emotions, setEmotions] = useState({
        sad_happy: 3,
        anxious_calm: 3,
        tired_awake: 3,
        unsafe_safe: 3,
        isolated_belonging: 3
    });
    const [submissionResponse, setSubmissionResponse] = useState(null);

    // Predefined latitude and longitude for testing
    const testLat = 45.5016889;
    const testLong = -122.6756296;

    useEffect(() => {
        console.log("Selected Identities:", selectedIdentities); // Debugging log
    }, [selectedIdentities]);

    // Handle location access (refactored for testing)
    const fetchLocation = () => {
        setLocation({
            lat: testLat,
            long: testLong
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Prepare the payload
        const payload = {
            datetime,
            location,
            experience,
            selectedIdentities,
            emotions
        };

        console.log("Payload:", payload); // Debugging log

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

    const handleEmotionChange = (e, emotion) => {
        setEmotions({
            ...emotions,
            [emotion]: parseInt(e.target.value)
        });
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedSubcategory(''); // Reset subcategory when a new category is selected
    };

    const handleSubcategoryChange = (e) => {
        setSelectedSubcategory(e.target.value);
    };

    const handleAddIdentity = () => {
      if (selectedCategory && selectedSubcategory) {
          console.log("Adding Identity:", selectedCategory, selectedSubcategory); // Debugging log
          // Add both the category and subcategory to the selectedIdentities array
          setSelectedIdentities([
              ...selectedIdentities,
              { category: selectedCategory, subcategory: selectedSubcategory }
          ]);
      } else {
          console.log("Category or Subcategory not selected"); // Debugging log
      }
  };


    // Options for main categories and subcategories
    const categoryOptions = [
        { key: 'religion', value: 'Religious Beliefs', label: 'Religion' },
        { key: 'gender', value: 'Gender', label: 'Gender' }
    ];

    const subcategoryOptions = {
        'Religious Beliefs': [
            { value: 'Jewish', label: 'Jewish' },
            { value: 'Muslim', label: 'Muslim' },
            { value: 'Christian', label: 'Christian' },
            { value: 'Atheist', label: 'Atheist' },
            { value: 'Hindu', label: 'Hindu' }
        ],
        'Gender': [
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Non-binary', label: 'Non-binary' },
            { value: 'Genderqueer', label: 'Genderqueer' }
        ]
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="datetime-local"
                    value={datetime}
                    onChange={(e) => setDatetime(e.target.value)}
                    required
                />

                <button type="button" onClick={fetchLocation}>
                    Fetch Location
                </button>
                <div>Lat: {location.lat} Long: {location.long}</div>

                <textarea
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Name of location"
                />

                <div>
                    <label>Select Main Identity Category:</label>
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">--Select Category--</option>
                        {categoryOptions.map(option => (
                            <option key={option.key} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedCategory && (
                    <div>
                        <label>Select Subcategory:</label>
                        <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
                            <option value="">--Select Subcategory--</option>
                            {subcategoryOptions[selectedCategory].map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={handleAddIdentity}>
                            Add Identity
                        </button>
                    </div>
                )}

                <div>
                    <label>Selected Identities:</label>
                    <ul>
                        {selectedIdentities.map((identity, index) => (
                            <li key={index}>
                                {identity.category}: {identity.subcategory}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <label>Sad - Happy:</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={emotions.sad_happy}
                        onChange={(e) => handleEmotionChange(e, 'sad_happy')}
                    />
                </div>

                <div>
                    <label>Anxious - Calm:</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={emotions.anxious_calm}
                        onChange={(e) => handleEmotionChange(e, 'anxious_calm')}
                    />
                </div>

                <div>
                    <label>Tired - Awake:</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={emotions.tired_awake}
                        onChange={(e) => handleEmotionChange(e, 'tired_awake')}
                    />
                </div>

                <div>
                    <label>Unsafe - Safe:</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={emotions.unsafe_safe}
                        onChange={(e) => handleEmotionChange(e, 'unsafe_safe')}
                    />
                </div>

                <div>
                    <label>Isolated - Belonging:</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={emotions.isolated_belonging}
                        onChange={(e) => handleEmotionChange(e, 'isolated_belonging')}
                    />
                </div>

                <button type="submit">Submit</button>
            </form>

            {submissionResponse && (
                <div>
                    <h3>Success! The following data was added to the database:</h3>
                    <p><strong>Experience ID:</strong> {submissionResponse.experience.experience_id}</p>
                    <p><strong>Location:</strong> {submissionResponse.experience.location_name} (Lat: {submissionResponse.experience.latitude}, Long: {submissionResponse.experience.longitude})</p>
                    <p><strong>Date and Time:</strong> {submissionResponse.experience.datetime}</p>
                    <p><strong>Identities:</strong></p>
                    <ul>
                        {submissionResponse.identities.map((identity, index) => (
                            <li key={index}>
                                {identity.category}: {identity.subcategory}
                            </li>
                        ))}
                    </ul>
                    <p><strong>Emotions:</strong></p>
                    <ul>
                        <li>Sad - Happy: {submissionResponse.emotions.sad_happy}</li>
                        <li>Anxious - Calm: {submissionResponse.emotions.anxious_calm}</li>
                        <li>Tired - Awake: {submissionResponse.emotions.tired_awake}</li>
                        <li>Unsafe - Safe: {submissionResponse.emotions.unsafe_safe}</li>
                        <li>Isolated - Belonging: {submissionResponse.emotions.isolated_belonging}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ExperienceForm;
