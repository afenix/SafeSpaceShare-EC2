import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import useIdentityCategories from '../hooks/useIdentityCategories';
import Select from 'react-select';

const IdentityForm = ({ formData, handleChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [identityInterpretation, setIdentityInterpretation] = useState(formData.identityInterpretation || null);
  const { identityCategories, loading } = useIdentityCategories();

  const handleButtonClick = (value, e) => {
    e.preventDefault();
    setIdentityInterpretation(value);
    handleChange({ target: { name: 'identityInterpretation', value } });
  };

  const handleCategoryChange = (selectedOptions) => {
    const selectedCategoryValues = selectedOptions.map(option => option.value);
    setSelectedCategories(selectedCategoryValues);
    handleChange({ target: { name: 'selectedCategories', value: selectedCategoryValues } });
  };

  const handleSubcategoryChange = (category, selectedOption) => {
    const updatedIdentities = (formData.selectedIdentities || []).filter(id => id.category !== category);

    const newIdentity = {
      category: category,
      subcategory: selectedOption.value,
    };

    const allIdentities = [...updatedIdentities, newIdentity];

    handleChange({ target: { name: 'selectedIdentities', value: allIdentities } });
  };

  if (loading) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  }

  const categoryOptions = identityCategories.categories.map(category => ({
    value: category.category_name,
    label: category.category_name
  }));

  return (
    <div>
      <h1 className='section-header'>Is Your Experience Related to Your Perceived Identity?</h1>
      <p className='info-text'>
        Do you feel your experience is related in any way to your perceived identity?
      </p>
      <p className='hint'>
        <i>Hint: Consider aspects such as gender, religious or political views, race, ethnicity, etc.</i>
      </p>

      <div className="button-group mb-3">
        <button
          className={`option-button ${identityInterpretation === 1 ? 'selected' : ''}`}
          onClick={(e) => handleButtonClick(1, e)}
        >
          YES
        </button>
        <button
          className={`option-button ${identityInterpretation === 0 ? 'selected' : ''}`}
          onClick={(e) => handleButtonClick(0, e)}
        >
          NO
        </button>
        <button
          className={`option-button ${identityInterpretation === 2 ? 'selected' : ''}`}
          onClick={(e) => handleButtonClick(2, e)}
        >
          UNCERTAIN
        </button>
      </div>

      {(identityInterpretation === 1 || identityInterpretation === 2) && (
        <>
          <div className="mb-3">
            <label htmlFor='identityCategories' className="form-label">Select Identity Categories:</label>
            <Select
              isMulti
              options={categoryOptions}
              onChange={handleCategoryChange}
              value={categoryOptions.filter(option => selectedCategories.includes(option.value))}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>

          {selectedCategories.map(category => {
            const subcategoryOptions = identityCategories.subcategories
              .filter(subcategory => subcategory.category_name === category)
              .map(subcategory => ({
                value: subcategory.subcategory_name,
                label: subcategory.subcategory_name
              }));

            return (
              <div key={category} className="mb-3">
                <label htmlFor={`${category}-subcategory`} className="form-label">Select {category} Subcategory:</label>
                <Select
                  options={subcategoryOptions}
                  onChange={(selectedOption) => handleSubcategoryChange(category, selectedOption)}
                  value={subcategoryOptions.find(option =>
                    (formData.selectedIdentities || []).some(id => id.category === category && id.subcategory === option.value))}
                  className="basic-single-select"
                  classNamePrefix="select"
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default IdentityForm;