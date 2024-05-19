import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getLine } from '../../services/line_stationService';

const LineDetail = () => {
  const location = useLocation();
  const lineName = location.state?.lineName;
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        if (lineName) {
          const data = await getLine(lineName);
          setStations(data);
        }
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStations();
  }, [lineName]);

  const sortedStations = stations.sort((a, b) => a.position - b.position);

  if (!lineName) {
    return <div>No line name provided.</div>;
  }

  return (
    <div className="line-detail">
      <h2>Stations for Line: {lineName}</h2>
      {sortedStations.map((station) => (
        <div key={station.station_name} className="station-item">
          <h4>{station.station_name}</h4>
          <p>Position: {station.position}</p>
          <p>Status: {station.status}</p>
        </div>
      ))}
    </div>
  );
};

export default LineDetail;