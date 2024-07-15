import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteConfirmation from '../buttons/deleteConfirmation';
import { getStationById } from '../../services/stationService';
import { getLineByStation } from '../../services/line_stationService';
import './stations.css';

const StationItem = ({ stationName, onDeleteStation, onEditStation, onViewDetails }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [station, setStation] = useState(null);
  const [lineStations, setLineStations] = useState([]);

  useEffect(() => {
    const fetchStationDetails = async () => {
      try {
        const stationData = await getStationById(stationName);
        setStation(stationData);

        const lineStations = await getLineByStation(stationName);
        console.log(lineStations);
        setLineStations(lineStations);
      } catch (error) {
        console.error('Error fetching station details:', error);
      }
    };

    fetchStationDetails();
  }, [stationName]);

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleUndo = () => {
    setIsDeleting(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await onDeleteStation(stationName);
    } catch (error) {
      console.error('Error deleting station:', error);
    }
  };

  const handleViewDetails = () => {
    onViewDetails(station);
  };

  if (!station) {
    return <div>Loading...</div>;
  }

  return (
    <div className="station-item">
      <div className="station-info">
        <h3>{station.station_english_name}</h3>
        <p>{station.chinese_name}</p>
        <p>District: {station.district}</p>
        <h4>Lines:</h4>
        <ul>
          {lineStations.map((lineStation) => (
            <li key={lineStation.line_name}>
              <p>Line: {lineStation.line_name}</p>
              <p>Position: {lineStation.position}</p>
              <p className={`status ${lineStation.status.toLowerCase()}`}>
                Status: {lineStation.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="station-actions">
        <button onClick={handleViewDetails} className="details-link">
          View Details
        </button>
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