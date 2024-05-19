import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteConfirmation from '../buttons/deleteConfirmation';
import './stations.css';

const StationItem = ({ station, onDeleteStation, onEditStation }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleUndo = () => {
    setIsDeleting(false);
  };

  const handleConfirmDelete = async (stationId) => {
    try {
      onDeleteStation(stationId);
    } catch (error) {
      console.error('Error deleting station:', error);
    }
  };

  return (
    <div className="station-item">
      <div className="station-info">
        <h3>{station.station_english_name}</h3>
        <p>{station.chinese_name}</p>
        <p>District: {station.district}</p>
      </div>
      <div className="station-actions">
        <Link to={`/stations/${station.station_english_name}`} className="details-link">
          View Details
        </Link>
        <button onClick={() => onEditStation(station)} className="edit-button">
          Edit
        </button>
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
    </div>
  );
};

export default StationItem;