import React, { useState } from 'react';
import { updateStationStatus } from '../../services/graphService';

const UpdateStationStatus = () => {
  const [stationName, setStationName] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStationStatus(stationName, updatedStatus);
      // Handle the result if needed
    } catch (error) {
      console.error('Error updating station status:', error);
    }
  };

  return (
    <div className="update-station-status">
      <h2>Update Station Status</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Station Name"
          value={stationName}
          onChange={(e) => setStationName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Updated Status"
          value={updatedStatus}
          onChange={(e) => setUpdatedStatus(e.target.value)}
        />
        <button type="submit">Update Status</button>
      </form>
    </div>
  );
};

export default UpdateStationStatus;