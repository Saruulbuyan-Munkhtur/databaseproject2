import React, { useState, useEffect } from 'react';
import CreateStationForm from '../components/stations/createStationForm';
import Rides from '../components/rides/rides';
import RideSearch from '../components/rides/RideSearch';
import { getAllRides } from '../services/rideService';
import { getAllRidesP } from '../services/rideService';
import RegisterRideButton from '../components/rides/registerButton';
import RegisterRideButtonPassenger from '../components/rides/registerPassengerButton';
import TopupButton from '../components/rides/TopupButton.js';
import '../components/rides/rides.css';
const RidesPage = () => {
  const [searchParams, setSearchParams] = useState({});
  const [rideCode, setRideCode] = useState('');
  const [rides, setRides] = useState([]);
  const [ridesP, setRidesPassenger] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState('search');
  const displayedSearch = searchParams;


  const renderComponent = () => {
    switch (selectedComponent) {
      case 'search':
        return (
  <>
  <div className='search-page'>
    <RideSearch onSubmit={handleSearchSubmit} />
    <div className='search-list'>
      {Object.entries(displayedSearch).slice(0,10).map(([key, value], index) => (
        <div key={index} className="search-results">
          <h3>{key === 'result1' ? 'Results by Cards' : 'Results by Passenger'}</h3>
          {value.length > 0 ? (
            <ul className="search-list">
              {value.map((searchParams) => (
                <li key={searchParams.ride_id} className="ride-item">
                  <p>{searchParams.ride_id}</p>
                  <p>{searchParams.start_time}</p>
                  <p>{searchParams.start_station}</p>
                  <p>{searchParams.end_station}</p>
                  <p>{searchParams.price}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No rides available</p>
          )}
        </div>
      ))}
    </div>
    </div>
  </>
);

        
      case 'rides':
        return (<div>
          <div className='register-buttons'>
                <RegisterRideButton />
                <RegisterRideButtonPassenger />
                <TopupButton />
              </div>
          <Rides rides={rides} ridesP={ridesP} searchParams={searchParams} />;
          </div>)
      default:
        return null;
    }
  };

  const handleSearchSubmit = (params) => {
    setSearchParams(params);
    setSelectedComponent('search');
  };


  useEffect(() => {
    fetchRides();
    fetchRidesPassenger();
  }, []);

  const fetchRides = async () => {
    try {
      const data = await getAllRides();
      setRides(data);
    } catch (error) {
      console.error('Error fetching rides:', error);
    }
  };

  const fetchRidesPassenger = async () => {
    try {
      const data = await getAllRidesP();
      console.log(data);
      setRidesPassenger(data);
    } catch (error) {
      console.error('Error fetching rides:', error);
    }
  };


  const handleCodeSearch = () => {
  };

  return (
    <div>
      <h1>Rides</h1>
      <div className="rides-menu">
        <button onClick={() => setSelectedComponent('search')}>Search Rides</button>
        <button onClick={() => setSelectedComponent('rides')}>View Rides</button>
      </div>
      <div className="rides-content">{renderComponent()}</div>
    </div>
  );
};

export default RidesPage;
