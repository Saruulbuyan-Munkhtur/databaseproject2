import React, { useState, useEffect } from 'react';
import CreateStationForm from '../components/stations/createStationForm';
import Rides from '../components/rides/rides';
import RideSearch from '../components/rides/RideSearch';
import { getAllRides } from '../services/rideService';

const RidesPage = () => {
  const [searchParams, setSearchParams] = useState({});
  const [rideCode, setRideCode] = useState('');
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const data = await getAllRides();
      setRides(data);
    } catch (error) {
      console.error('Error fetching rides:', error);
    }
  };

  const handleSearchSubmit = (params) => {
    setSearchParams(params);
    // You can perform search logic here based on the searchParams
  };

  const handleCodeSearch = () => {
    // Implement search by code logic here if needed
  };

  return (
    <div>
      <RideSearch onSubmit={handleSearchSubmit} />
      <div>
        <input
          type="text"
          placeholder="Enter ride code"
          value={rideCode}
          onChange={(e) => setRideCode(e.target.value)}
        />
        <button onClick={handleCodeSearch}>Search by Code</button>
      </div>
      <Rides rides={rides} searchParams={searchParams} />
    </div>
  );
};

export default RidesPage;
