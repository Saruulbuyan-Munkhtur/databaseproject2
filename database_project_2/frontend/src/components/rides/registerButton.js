import React, { useState } from 'react';
import RegisterRideForm from './cardRideForm';
import './rides.css';

const RegisterRideButton = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleOpenForm = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className='register-ride'>
      <button onClick={handleOpenForm} >Register Ride Using Card</button>
      {isFormVisible && <RegisterRideForm onClose={handleCloseForm} />}
    </div>
  );
};

export default RegisterRideButton;
