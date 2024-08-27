import React, { useState } from 'react'
import Select from 'react-select';

const ReviewForm = ({ formData, handleChange, handleSubmit, identityCategories }) => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Converts UTC date (needed for Feature Service attribute type) to local date and time for display.
  const getLocalDateTime = (utcDate) => {
    const date = new Date(utcDate);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  // Define emotion labels as options for dropdowns
  const calmAnxiousOptions = [
    { value: 1, label: 'Very Anxious' },
    { value: 2, label: 'Anxious' },
    { value: 3, label: 'Centered' },
    { value: 4, label: 'Calm' },
    { value: 5, label: 'Very Calm' },
  ];

  const happinessSadnessOptions = [
    { value: 1, label: 'Despondent' },
    { value: 2, label: 'Sad' },
    { value: 3, label: 'Balanced' },
    { value: 4, label: 'Happy' },
    { value: 5, label: 'Elated' },
  ];

  const awakeTiredOptions = [
    { value: 1, label: 'Exhausted' },
    { value: 2, label: 'Tired' },
    { value: 3, label: 'Awake' },
    { value: 4, label: 'Alert' },
    { value: 5, label: 'Energized' },
  ];

  const safetyOptions = [
    { value: 1, label: 'Dangerous' },
    { value: 2, label: 'Risky' },
    { value: 3, label: 'Uncertain' },
    { value: 4, label: 'Secure' },
    { value: 5, label: 'Very Safe' },
  ];

  const belongingOptions = [
    { value: 1, label: 'Alienated' },
    { value: 2, label: 'Lonely' },
    { value: 3, label: 'Ambivalent' },
    { value: 4, label: 'Connected' },
    { value: 5, label: 'Integrated' },
  ];

/**
 * Handles the form submission and scrolls to back to the "Action" section.
 */
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    setIsSubmitted(true);
    document.getElementById('explore-section').scrollIntoView({ behavior: 'smooth' });
  };

  if (!identityCategories) {
    return <div>Loading identity categories...</div>;
  }

  // Helper function to get subcategory options based on a selected category
  const getSubcategoryOptions = (categoryName) => {
    return identityCategories.subcategories
      .filter(subcategory => subcategory.category_name === categoryName)
      .map(subcategory => ({
        value: subcategory.subcategory_name,
        label: subcategory.subcategory_name
      }));
  };


  return (
    <div className='review-form'>
      <h1 className='section-header center'>Review & Submit Your Experience</h1>
      <p className='info-text'>
        Please review your experience details below. If everything looks
        accurate, click{' '}
        <i>
          <b>"Submit."</b>
        </i>{' '}
        If you'd like to make any changes, simply edit the fields and then click
        "Submit."
      </p>
      <div className='review-form-container'>
        {/* Location & Time: */}
        <div className='form-group'>
          <div className='form-field'>
            <label className='review-label form-labels' htmlFor='locationName'>
              Location:
            </label>
            <input
              type='text'
              id='locationName'
              name='locationName'
              value={formData.locationName}
              onChange={handleChange}
            />
            <label className='review-label form-labels' htmlFor='locationName'>
              Date & Time:
            </label>
            <input
              className='form-inputs'
              type='datetime-local'
              name='datetime'
              value={formData.datetime ? getLocalDateTime(formData.datetime) : ''}
              onChange={handleChange}
              required
            />
          </div>

          {/* Emotion: */}
          <div className='form-field'>
            <label className='review-label form-labels' htmlFor='calmAnxious'>
              Stress:
            </label>
            <Select
              name='anxious_calm'
              options={calmAnxiousOptions}
              value={calmAnxiousOptions.find(option => option.value === formData.emotions.anxious_calm)}
              onChange={(selectedOption) => handleChange({
                target: {
                  name: 'emotions',
                  value: {
                    ...formData.emotions,
                    anxious_calm: selectedOption.value
                  }
                }
              })}
              className="basic-single"
              classNamePrefix="select"
            />
            <label className='review-label form-labels'>
              Feeling:
            </label>
            <Select
              name='sad_happy'
              options={happinessSadnessOptions}
              value={happinessSadnessOptions.find(option => option.value === formData.emotions.sad_happy)}
              onChange={(selectedOption) => handleChange({
                target: {
                  name: 'emotions',
                  value: {
                    ...formData.emotions,
                    sad_happy: selectedOption.value
                  }
                }
              })}
              className="basic-single"
              classNamePrefix="select"
            />
            <label className='review-label form-labels'>
              Alertness:
            </label>
            <Select
              name='tired_awake'
              options={awakeTiredOptions}
              value={awakeTiredOptions.find(option => option.value === formData.emotions.tired_awake)}
              onChange={(selectedOption) => handleChange({
                target: {
                  name: 'emotions',
                  value: {
                    ...formData.emotions,
                    tired_awake: selectedOption.value
                  }
                }
              })}
              className="basic-single"
              classNamePrefix="select"
            />
          </div>

          {/* Safe: */}
          <div className='form-field'>
            <label className='review-label form-labels' htmlFor='safety'>
              Sense of Safety:
            </label>
            <Select
              name='unsafe_safe'
              options={safetyOptions}
              value={safetyOptions.find(option => option.value === formData.emotions.unsafe_safe)}
              onChange={(selectedOption) => handleChange({
                target: {
                  name: 'emotions',
                  value: {
                    ...formData.emotions,
                    unsafe_safe: selectedOption.value
                  }
                }
              })}
              className="basic-single"
              classNamePrefix="select"
            />
          </div>

          {/* Belong: */}
          <div className='form-field'>
            <label className='review-label form-labels' htmlFor='belonging'>
              Sense of Belonging:
            </label>
            <Select
              name='isolated_belonging'
              options={belongingOptions}
              value={belongingOptions.find(option => option.value === formData.emotions.isolated_belonging)}
              onChange={(selectedOption) => handleChange({
                target: {
                  name: 'emotions',
                  value: {
                    ...formData.emotions,
                    isolated_belonging: selectedOption.value
                  }
                }
              })}
              className="basic-single"
              classNamePrefix="select"
            />
          </div>

          {/* Identity Categories & Subcategories: */}
          {formData.selectedIdentities && formData.selectedIdentities.length > 0 && (
            <div className='form-field'>
              <label className='review-label form-labels primary-label'>
                Identity Categories & Subcategories:
              </label>
              {formData.selectedIdentities.map((identity, index) => (
                <div key={index}>
                  <label className='review-label form-labels secondary-label'>
                    {identity.category}:
                  </label>
                  <Select
                    name={`subcategory_${index}`}
                    options={getSubcategoryOptions(identity.category)}
                    value={{
                      value: identity.subcategory,
                      label: identity.subcategory,
                    }}
                    onChange={(selectedOption) => {
                      const updatedIdentities = [...formData.selectedIdentities];
                      updatedIdentities[index].subcategory = selectedOption.value;
                      handleChange({ target: { name: 'selectedIdentities', value: updatedIdentities } });
                    }}
                    className="basic-single"
                    classNamePrefix="select"
                  />
                </div>
              ))}
            </div>
          )}


          {/* Additional: */}
          <div className='form-field'>
            <label className='review-label form-labels' htmlFor='finalThoughts'>
              Additional Thoughts:
            </label>
            <textarea
              id='finalThoughts'
              name='finalThoughts'
              value={formData.finalThoughts}
              onChange={handleChange}
            />
          </div>
        </div>

          {/* SUBMIT BUTTON */}
        <button type='button' className='submit-button' onClick={onSubmit}>
          SUBMIT
        </button>
        {isSubmitted}
      </div>
    </div>
  )
}

export default ReviewForm
