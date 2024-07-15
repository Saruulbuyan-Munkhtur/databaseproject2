import React, { useState } from 'react';
import RegisterRideFormPassenger from './passengerRideForm';
import './rides.css';

const RegisterRideButtonPassenger = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleOpenForm = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className='register-ride'>
      <button onClick={handleOpenForm} >Register Ride Using ID</button>
      {isFormVisible && <RegisterRideFormPassenger onClose={handleCloseForm} />}
    </div>
  );
};

export default RegisterRideButtonPassenger;
