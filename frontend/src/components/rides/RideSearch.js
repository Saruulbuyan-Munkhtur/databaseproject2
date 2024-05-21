import React, { useState } from 'react';

const RideSearch = ({ onSubmit }) => {
  const [station, setStation] = useState('');
  const [passengers, setPassengers] = useState('');
  const [timePeriod, setTimePeriod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = {
      station,
      passengers,
      timePeriod,
    };
    onSubmit(searchParams);
  };

  return (
    <form onSubmit={handleSubmit} className="ride-search">
      <div>
        <label htmlFor="station">Station:</label>
        <input
          type="text"
          id="station"
          value={station}
          onChange={(e) => setStation(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="passengers">Passengers:</label>
        <input
          type="number"
          id="passengers"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="timePeriod">Time Period:</label>
        <input
          type="text"
          id="timePeriod"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default RideSearch;