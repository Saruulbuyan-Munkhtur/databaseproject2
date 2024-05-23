import React from 'react';

const StationDetails = ({ station }) => {
  if (!station) {
    return <div>No station selected.</div>;
  }

  return (
    <div className="station-details">
      <h2>Station Details</h2>
      <p>English Name: {station.station_english_name}</p>
      <p>Chinese Name: {station.chinese_name}</p>
      <p>District: {station.district}</p>
      <p>Introduction: {station.intro}</p>
    </div>
  );
};

export default StationDetails;