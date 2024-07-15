import React, { useState, useEffect } from 'react';
import './deleteConfirmation.css';

const DeleteConfirmation = ({ itemId, itemType, onUndo, onDelete }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timeout = setTimeout(() => {
	console.log("HERE: ", itemId);
      onDelete(itemId);
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [itemId, onDelete]);

  return (
    <div className="delete-confirmation">
      <p>
        {itemType} {itemId} will be deleted in {countdown} seconds.
      </p>
      <button onClick={onUndo} className="undo-button">
        Undo
      </button>
    </div>
  );
};

export default DeleteConfirmation;