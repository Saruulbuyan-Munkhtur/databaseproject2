import React from 'react';
import './rides.css';
import ExitRideUsingCardButton from './ExitRideUsingCardButton';
import RegisterRideButton from './registerButton';

const Rides = ({ rides }) => {
  const displayedRides = rides.slice(0, 10);

  return (
    <div className="rides-container">
      <h2 className="rides-header">Ongoing Rides</h2>
      <div className="rides-header2">
        <p>User</p>
        <p>Start</p>
        <p>End</p>
        <p>Price</p>
      </div>
      {displayedRides.length > 0 ? (
        <ul className="ride-list">
          {displayedRides.map((ride) => (
            <li key={ride.user_code} className="ride-item">
              <p>{ride.ride_id}</p>
              <p className='display-code'>{ride.user_code}</p>
              <p className='display-start'>{ride.start_station}</p>
              <p className='display-end'>{ride.end_station}</p>
              <p className='display-price'>{ride.price}</p>
              <ExitRideUsingCardButton rideId={ride.ride_id} code={ride.user_code} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No rides available</p>
      )}
    </div>
  );
};

export default Rides;
