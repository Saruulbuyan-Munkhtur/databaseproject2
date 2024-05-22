import React, { useState } from 'react';

const EditLineForm = ({ line, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(line);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="lineName"
        placeholder="Line Name"
        value={formData.lineName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="intro"
        placeholder="Introduction"
        value={formData.intro}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="mileage"
        placeholder="Mileage"
        value={formData.mileage}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="color"
        placeholder="Color"
        value={formData.color}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="first_opening"
        placeholder="First Opening"
        value={formData.first_opening}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="url"
        placeholder="URL"
        value={formData.url}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="start"
        placeholder="Start"
        value={formData.start}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="end"
        placeholder="End"
        value={formData.end}
        onChange={handleChange}
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default EditLineForm;