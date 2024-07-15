import React, { useState } from 'react';

const CreateStationForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    lineName: '',
    station_english_name: '',
    district: '',
    intro: '',
    chinese_name: '',
    position: '',
    status: '',
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
        name="station_english_name"
        placeholder="Station Name"
        value={formData.station_english_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="district"
        placeholder="District"
        value={formData.district}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="intro"
        placeholder="Intro"
        value={formData.intro}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="chinese_name"
        placeholder="Chinese Name"
        value={formData.chinese_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="status"
        placeholder="Status"
        value={formData.status}
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

export default CreateStationForm;