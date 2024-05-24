import React, { useState } from 'react';
import { exitRideUsingPassenger } from '../../services/rideService';
import './rides.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ExitRideFormP = ({ onClose, rideId}) => {
  const [endStation, setEndStation] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await exitRideUsingPassenger(rideId, endStation, endTime);
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
        <div>
        <label htmlFor="endTime">End Time:</label>
        <input
            type="text"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>=
        <button type="submit">Exit Ride</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default ExitRideFormP;


{/* <DatePicker
selected={endTime}
onChange={handleEndTimeChange}
showTimeSelect
timeFormat="HH:mm"
timeIntervals={15}
dateFormat="yyyy-MM-dd HH:mm:ss"
placeholderText="Select End Time"
/> */}