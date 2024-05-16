import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './stations.css';
import { getStations, deleteStation } from '../../services/stationServices';
import StationItem from './stationItem';
import StationDetails from './stationDetails';

const Stations = () => {
  const [stations, setStations] = useState([]);
  const { id } = useParams();

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

  const handleDeleteStation = async (stationId) => {
    try {
      console.log("handleDeleteStation in station.js: ", id)
      await deleteStation(stationId);
      setStations((prevStations) =>
        prevStations.filter((station) => station.station_english_name !== stationId)
      );
    } catch (error) {
      console.error('Error deleting station:', error);
    }
  };

  return (
    <div className="stations">
      <h2>Stations</h2>
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
              />
            ))}
          </ul>
          {id && <StationDetails />}
        </div>
      )}
    </div>
  );
};

export default Stations;