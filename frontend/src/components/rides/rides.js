import React from 'react';
import './rides.css';

const Rides = ({ rides }) => {
  return (
    <div>
      {rides.length > 0 ? (
        <ul>
          {rides.map((ride) => (
            <li key={ride.user_code}>
              {/* Display relevant ride information here */}
              <p>Start: {ride.start_station}</p>
              <p>End: {ride.end_station}</p>
              <p>Price: {ride.price}</p>
              {/* Add other ride details as needed */}
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
