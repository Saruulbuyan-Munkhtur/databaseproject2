import React, { useState } from 'react';

const CreateStation2Form = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    station_english_name: '',
    district: '',
    intro: '',
    chinese_name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="create-station2-form">
      <h2>Create Station Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          English Name:
          <input type="text" name="station_english_name" value={formData.station_english_name} onChange={handleChange} />
        </label>
        <label>
          District:
          <input type="text" name="district" value={formData.district} onChange={handleChange} />
        </label>
        <label>
          Introduction:
          <textarea name="intro" value={formData.intro} onChange={handleChange} />
        </label>
        <label>
          Chinese Name:
          <input type="text" name="chinese_name" value={formData.chinese_name} onChange={handleChange} />
        </label>
        <div className="form-buttons">
          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateStation2Form;
