// ExitRideUsingCardButton.js
import React, { useState } from 'react';
import ExitRideFormP from './ExitRideFormP.js'; 
import './rides.css';

const ExitRideUsingPassengerButton = ({ rideId }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleOpenForm = () => {
    console.log("open")
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className='exit-ride'>
      <button onClick={handleOpenForm}>Exit Ride</button>
      {isFormVisible && (
        <ExitRideFormP
          onClose={handleCloseForm}
          rideId={rideId}
        />
      )}
    </div>
  );
};

export default ExitRideUsingPassengerButton;
