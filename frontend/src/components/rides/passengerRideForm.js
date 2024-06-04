import React, { useState } from 'react';
import { registerRideUsingPassenger } from '../../services/rideService';
import './rides.css'

const RegisterRideFormPassenger = ({ onClose }) => {
  const [ID, setID] = useState('');
  const [startStation, setStartStation] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const startTime = new Date().toISOString();
    try {
      const ride = await registerRideUsingPassenger(ID, startStation, startTime, type);
      if(ride == 1){
        alert('You have an ONGOING ride!');
      } else{
        alert('Ride registered successfully');
      }
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
        <button className='economy-button' type="button" onClick={() => setType('ECONOMY')}>Economy Class</button>
          <button className='business-button' type="button" onClick={() => setType('BUSINESS')}>Business Class</button>
        <button type="submit">Register Ride</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default RegisterRideFormPassenger;
