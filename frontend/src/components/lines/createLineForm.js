import React, { useState } from 'react';

const CreateLineForm = ({ onSubmit, onClose }) => {

function getCurrentDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate)
    return formattedDate.substring(0,10);
}

const date = getCurrentDate();
  const [formData, setFormData] = useState({
    lineName: '',
    intro: '',
    mileage: '',
    color: '',
    first_opening: date,
    url: '',
    start: '',
    end: '',
  });

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
      <button type="submit">Create</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default CreateLineForm;