import React, { useState } from 'react';
import { exitRideUsingCard } from '../../services/rideService';
import './rides.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ExitRideForm = ({ onClose, rideId, code }) => {
  const [endStation, setEndStation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endTime = new Date().toISOString();
    try {
      await exitRideUsingCard(rideId, code, endStation, endTime);
      alert('Ride exited successfully');
      onClose();
    } catch (error) {
      console.error('Error exiting ride:', error);
      alert('Failed to exit ride');
    }
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="exit-ride-form">
        <div>
          <label htmlFor="endStation">End Station:</label>
          <input
            type="text"
            id="endStation"
            value={endStation}
            onChange={(e) => setEndStation(e.target.value)}
          />
        </div>
        <button type="submit">Exit Ride</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default ExitRideForm;


{/* <DatePicker
selected={endTime}
onChange={handleEndTimeChange}
showTimeSelect
timeFormat="HH:mm"
timeIntervals={15}
dateFormat="yyyy-MM-dd HH:mm:ss"
placeholderText="Select End Time"
/> */}