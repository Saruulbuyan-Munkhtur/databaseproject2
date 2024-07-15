// ExitRideUsingCardButton.js
import React, { useState } from 'react';
import ExitRideForm from './ExitRideForm.js'; 
import './rides.css';

const ExitRideUsingCardButton = ({ rideId, code }) => {
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
      <button onClick={handleOpenForm}>Exit Ride Using Card</button>
      {isFormVisible && (
        <ExitRideForm
          onClose={handleCloseForm}
          rideId={rideId}
          code={code}
        />
      )}
    </div>
  );
};

export default ExitRideUsingCardButton;
