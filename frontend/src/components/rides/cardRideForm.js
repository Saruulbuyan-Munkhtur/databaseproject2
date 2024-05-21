import React, { useState } from 'react';
import { registerRideUsingCard } from '../../services/rideService';


const RegisterRideForm = ({ onClose }) => {
  const [ID, setID] = useState('');
  const [startStation, setStartStation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [startLine, setStartLine] = useState('');
  const [endLine, setEndLine] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerRideUsingCard(ID,startStation,startTime,startLine,endLine);
      alert('Ride registered successfully');
      onClose();
    } catch (error) {
      console.error('Error registering ride:', error);
      alert('Failed to register ride');
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="register-ride-form">
        <div>
          <label htmlFor="ID">ID:</label>
          <input
            type="text"
            id="ID"
            value={ID}
            onChange={(e) => setID(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startStation">Start Station:</label>
          <input
            type="text"
            id="startStation"
            value={startStation}
            onChange={(e) => setStartStation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="text"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startLine">Start Line:</label>
          <input
            type="text"
            id="startLine"
            value={startLine}
            onChange={(e) => setStartLine(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endLine">End Line:</label>
          <input
            type="text"
            id="endLine"
            value={endLine}
            onChange={(e) => setEndLine(e.target.value)}
          />
        </div>
        <button type="submit">Register Ride</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default RegisterRideForm;
