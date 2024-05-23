import React, { useEffect, useState } from 'react';
import './stations.css';
import { getStations, deleteStation } from '../../services/stationService';
import StationItem from './stationItem';
import StationDetails from './stationDetails';

const Stations = ({ onEditStation, onAddStation }) => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const data = await getStations();
      setStations(data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const handleButtonClick = () => {
    console.log('Add Station button clicked');
  };

  const handleDeleteStation = async (stationId) => {
    try {
      await deleteStation(stationId);
      setStations((prevStations) =>
        prevStations.filter((station) => station.station_english_name !== stationId)
      );
    } catch (error) {
      console.error('Error deleting station:', error);
    }
  };

  const handleUpdateStation = (updatedStation) => {
    setStations((prevStations) =>
      prevStations.map((station) =>
        station.station_english_name === updatedStation.station_english_name ? updatedStation : station
      )
    );
  };

  const handleViewDetails = (station) => {
    setSelectedStation(station);
  };

  return (
    <div className="stations">
      {!selectedStation &&
      <div>
      <button onClick={onAddStation}>Add Station</button> 
      {stations.length === 0 ? (
        <p>Loading stations...</p>
      ) : (
        <div>
          <ul className="station-list">
            {stations.map((station) => (
              <StationItem
              key={station.station_english_name}
              station={station}
              onDeleteStation={() => handleDeleteStation(station.station_english_name)}
              onEditStation={() => onEditStation(station)}
              onViewDetails={handleViewDetails}
              />
            ))}
          </ul>
        </div>
      )}
          </div>}
      {selectedStation && <StationDetails station={selectedStation} />}
    </div>
  );
};

export default Stations;