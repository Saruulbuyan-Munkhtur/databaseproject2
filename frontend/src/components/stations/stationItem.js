import React from 'react';
import { Link } from 'react-router-dom';
import './stations.css';

const StationItem = ({ station }) => {
  return (
    <div className="station-item">
      <h3>{station.chinese_name}</h3>
      <p>English Name: {station.station_english_name}</p>
      <p>District: {station.district}</p>
      <Link to={`/stations/${station.station_english_name}`} className="details-link">
        View Details
      </Link>
    </div>
  );
};

export default StationItem;