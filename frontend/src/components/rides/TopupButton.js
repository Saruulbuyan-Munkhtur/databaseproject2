import React, { useState } from 'react';
import RegisterRideForm from './TopupForm';
import './rides.css';

const TopupButton = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleOpenForm = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className='register-ride'>
      <button onClick={handleOpenForm} >Topup Card</button>
      {isFormVisible && <RegisterRideForm onClose={handleCloseForm} />}
    </div>
  );
};

export default TopupButton;
