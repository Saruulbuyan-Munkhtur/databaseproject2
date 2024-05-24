import React, { useState } from 'react';
import { registerRideUsingPassenger } from '../../services/rideService';


const RegisterRideFormPassenger = ({ onClose }) => {
  const [ID, setID] = useState('');
  const [startStation, setStartStation] = useState('');
  const [startTime, setStartTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerRideUsingPassenger(ID,startStation,startTime);
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
        <button type="submit">Register Ride</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default RegisterRideFormPassenger;
