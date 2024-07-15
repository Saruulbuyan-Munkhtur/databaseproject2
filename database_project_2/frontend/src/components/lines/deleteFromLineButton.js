import React, { useState } from 'react';
import './lines.css';
import { deleteLineStation } from '../../services/lineService';


const DeleteFromLineButton = ({lineName, stationName}) => {

  const handleClick = async () => {
    await deleteLineStation(lineName, stationName);
  }

  return (
    <div className='delete-station-from-line'>
      <button onClick={handleClick} >Delete</button>
    </div>
  );
};

export default DeleteFromLineButton;
