import React, { useState } from 'react'

const ReviewForm = ({ formData, handleChange, handleSubmit }) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  // Add labels for each question to display label instead of numeric values stored in Feature Class.
  const calmAnxiousLabels = ['Very Anxious', 'Anxious', 'Centered', 'Calm', 'Very Calm'];
  const happinessSadnessLabels = ['Despondent', 'Sad', 'Balanced', 'Happy', 'Elated'];
  const awakeTiredLabels = ['Exhausted', 'Tired', 'Awake', 'Alert', 'Energized'];
  const safetyLabels = ['Dangerous', 'Risky', 'Uncertain', 'Secure', 'Very Safe'];
  const belongingLabels = ['Alienated', 'Lonely', 'Ambivalent', 'Connected', 'Integrated'];
  const identityInterpretationLabels = ['No', 'Yes', 'Uncertain'];

  // Converts UTC date (needed for Feature Service attribute type) to local date and time for display.
  const getLocalDateTime = (utcDate) => {
    const date = new Date(utcDate);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  // Converts the selected value to a label for display.
  const getLabel = (labels, value) => labels[value];

  // Converts the label back to its corresponding value.
  const labelToValue = (labels, label) => labels.indexOf(label);

  // Convert labels back to numeric values for form submission.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const labels = getLabels(name);
    const numericValue = labelToValue(labels, value);
    handleChange({ target: { name, value: numericValue } });
  };

  const getLabels = (name) => {
    switch (name) {
      case 'calmAnxious':
        return calmAnxiousLabels;
      case 'happinessSadness':
        return happinessSadnessLabels;
      case 'awakeTired':
        return awakeTiredLabels;
      case 'safety':
        return safetyLabels;
      case 'belonging':
        return belongingLabels;
      case 'identityInterpretation':
        return identityInterpretationLabels;
      default:
        return [];
    }
  };

/**
 * Handles the form submission and scrolls to back to the "Action" section.
 */
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    setIsSubmitted(true);
    document.getElementById('explore-section').scrollIntoView({ behavior: 'smooth' });
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
              name='experience_date'
              value={formData.experience_date ? getLocalDateTime(formData.experience_date) : ''}
              onChange={handleChange}
              required
            />
          </div>

          {/* Emotion: */}

          <div className='form-field'>
            <label className='review-label form-labels' htmlFor='calmAnxious'>
              Stress:
            </label>
            <input
              type='text'
              name='calmAnxious'
              value={getLabel(calmAnxiousLabels, formData.calmAnxious)}
              onChange={handleInputChange}
            />
            <label className='review-label form-labels'>
              Feeling:
            </label>
            <input
              type='text'
              name='happinessSadness'
              value={getLabel(happinessSadnessLabels, formData.happinessSadness)}
              onChange={handleInputChange}
            />
            <label className='review-label form-labels'>
              Alertness:
            </label>
            <input
              type='text'
              name='awakeTired'
              value={getLabel(awakeTiredLabels, formData.awakeTired)}
              onChange={handleInputChange}
            />
          </div>

          {/* Safe: */}
          <div className='form-field'>
            <label className='review-label form-labels' htmlFor='safety'>
              Sense of Safety:
            </label>
            <input
              type='text'
              id='safety'
              name='safety'
              value={getLabel(safetyLabels, formData.safety)}
              onChange={handleInputChange}
            />
          </div>

          {/* Belong: */}
          <div className='form-field'>
            <label className='review-label form-labels' htmlFor='belonging'>
              Sense of Belonging:
            </label>
            <input
              type='text'
              id='belonging'
              name='belonging'
              value={getLabel(belongingLabels, formData.belonging)}
              onChange={handleInputChange}
            />
          </div>

          {/* Identity Related?: */}
          <div className='form-field'>
            <label
              className='review-label form-labels'
              htmlFor='identityInterpretation'
            >
              Identity Related?:
            </label>
            <input
              type='text'
              id='identityInterpretation'
              name='identityInterpretation'
              value={getLabel(identityInterpretationLabels, formData.identityInterpretation)}
              onChange={handleInputChange}
            />
          </div>

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
