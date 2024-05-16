import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteConfirmation from '../buttons/deleteConfirmation';
// import {deleteStation} from '../../services/stationServices';
import './stations.css';

const StationItem = ({ station, onDeleteStation }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleUndo = () => {
    setIsDeleting(false);
  };

  const handleConfirmDelete = async (stationId) => {
    try {
      console.log("DIDIDI: ", stationId);
      // await deleteStation(stationId);
      onDeleteStation(stationId);
    } catch (error) {
      console.error('Error deleting station:', error);
    }
  };

  return (
    <div className="station-item">
      <h3>{station.chinese_name}</h3>
      <p>English Name: {station.station_english_name}</p>
      <p>District: {station.district}</p>
      <Link to={`/stations/${station.station_english_name}`} className="details-link">
        View Details
      </Link>
      {!isDeleting && (
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      )}
      {isDeleting && (
        <DeleteConfirmation
          itemId={station.station_english_name}
          itemType={"station"}
          onUndo={handleUndo}
          onDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default StationItem;