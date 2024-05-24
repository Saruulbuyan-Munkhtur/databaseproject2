import React from 'react';
import './rides.css';
import ExitRideUsingCardButton from './ExitRideUsingCardButton';
import ExitRideUsingPassengerButton from './ExitRideUsingPassengerButton';
import RegisterRideButton from './registerButton';

const Rides = ({ rides, ridesP }) => {
  const displayedRides = rides.slice(0, 10);
  const displayedRidesP = ridesP.slice(0, 10); // Slicing ridesP to limit to 10 items

  return (
    <div className="rides-container">
      <div className="rides-list-container">
        <h2 className="rides-header">Ongoing Card Rides</h2>
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

      <div className="rides-list-container2">
        <h2 className="rides-header">Ongoing Passenger Rides</h2>
        <div className="rides-header2">
          <p>User</p>
          <p>Start</p>
          <p>End</p>
          <p>Price</p>
        </div>
        {displayedRidesP.length > 0 ? (
          <ul className="ride-list">
            {displayedRidesP.map((rideP) => (
              <li key={rideP.user_id} className="ride-item">
                <p>{rideP.ride_id}</p>
                <p className='display-code'>{rideP.user_code}</p>
                <p className='display-start'>{rideP.start_station}</p>
                <p className='display-end'>{rideP.end_station}</p>
                <p className='display-price'>{rideP.price}</p>
                <ExitRideUsingPassengerButton rideId={rideP.ride_id} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No rides available</p>
        )}
      </div>
    </div>
  );
};

export default Rides;
