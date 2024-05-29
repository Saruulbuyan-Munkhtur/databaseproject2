import React, { useState } from 'react';
import './rides.css';
import { reloadCard } from '../../services/rideService';
const TopupForm = ({ onClose}) => {
  const [card, setCard] = useState('');
  const [amount, setAmmount] = useState('');

  const handleSubmit = async (e) => {
    try{
        await reloadCard(card, amount);
        alert('Ride exited successfully');
        onClose();
    } catch (error) {
        console.error('Error exiting ride:', error);
        alert('Failed to exit ride');
    }
}

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="exit-ride-form">
        <div>
          <label htmlFor="endStation">Card Number:</label>
          <input
            type="text"
            id="card number"
            value={card}
            onChange={(e) => setCard(e.target.value)}
          />
        </div>
        <div>
        <label htmlFor="endTime">Topup Amount:</label>
        <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmmount(e.target.value)}
          />
        </div>
        <button type="submit">Topup</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default TopupForm;