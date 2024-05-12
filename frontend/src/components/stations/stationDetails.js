import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStationById } from '../../services/stationServices';
import './stations.css';

const StationDetails = () => {
  const { id } = useParams();
  const [station, setStation] = useState(null);

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const data = await getStationById(id);
        setStation(data);
      } catch (error) {
        console.error('Error fetching station details:', error);
      }
    };

    fetchStation();
  }, [id]);

  if (!station) {
    return <div>Loading station details...</div>;
  }

  return (
    <div className="station-details">
      <h2>{station.chinese_name}</h2>
      <p>English Name: {station.station_english_name}</p>
      <p>District: {station.district}</p>
      <p>Introduction: {station.intro}</p>
    </div>
  );
};

export default StationDetails;