import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStationById } from '../../services/stationServices';

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
      <h2>{station.name}</h2>
      <p>Line: {station.line}</p>
      <p>Location: {station.location}</p>
      <p>Description: {station.description}</p>
      <p>Opened: {station.openingDate}</p>
      <p>Facilities: {station.facilities.join(', ')}</p>
    </div>
  );
};

export default StationDetails;