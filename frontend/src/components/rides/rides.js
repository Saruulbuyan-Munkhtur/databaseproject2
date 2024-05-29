import React from 'react';
import './rides.css';
import ExitRideUsingCardButton from './ExitRideUsingCardButton';
import ExitRideUsingPassengerButton from './ExitRideUsingPassengerButton';
import RegisterRideButton from './registerButton';

const Rides = ({ rides, ridesP }) => {
  const displayedRides = rides.slice(0, 10);
  const displayedRidesP = ridesP.slice(0, 10);

  return (
    <div className="rides-container">
      <div className="rides-list-container">
        <h2 className="rides-header">Ongoing Card Rides</h2>
        <div className="rides-header2">
          <p>Ride ID</p>
          <p>Card Number</p>
          <p>Money</p>
          <p>Create Time</p>
          <p>Start Station</p>
          <p>Start Time</p>
          <p>Status</p>
        </div>
        {displayedRides.length > 0 ? (
          <ul className="ride-list">
            {displayedRides.map((rideArray, index) => (
            <div key={index}>
            {rideArray[0].map((ride) => (
            <div key={ride.user_code} className="ride-item">
              <p>{ride.ride_id}</p>
              <p className='display-code'>{ride.user_code}</p>
              <p className='display-money'>{ride.money}</p>
              <p className='display-create-time'>{ride.create_time}</p>
              <p className='display-start-station'>{ride.start_station}</p>
              <p className='display-start-time'>{ride.start_time}</p>
              <p className='display-status'>{ride.status}</p>
              <ExitRideUsingCardButton rideId={ride.ride_id} code={ride.user_code} />
            </div>
            ))}
            </div>
            ))}
          </ul>
        ) : (
          <p>No rides available</p>
        )}
      </div>

      <div className="rides-list-container2">
        <h2 className="rides-header">Ongoing Passenger Rides</h2>
        <div className="rides-header2">
          <p>Ride ID</p>
          <p>ID Number</p>
          <p>Name</p>
          <p>Phone Number</p>
          <p>Gender</p>
          <p>District</p>
          <p>Start Station</p>
          <p>Start Time</p>
          <p>Status</p>
        </div>
        {displayedRidesP.length > 0 ? (
          <ul className="ride-list">
            {displayedRidesP.map((ridePArray, index) => (
              <div key={index}>
                {ridePArray[0].map((rideP) => (
                  <div key={rideP.user_id} className="ride-item">
                  <p>{rideP.ride_id}</p>
                  <p className='display-code'>{rideP.id_number}</p>
                  <p className='display-start'>{rideP.name}</p>
                  <p className='display-end'>{rideP.phone_number}</p>
                  <p className='display-gender'>{rideP.gender}</p>
                  <p className='display-district'>{rideP.district}</p>
                  <p className='display-start-station'>{rideP.start_station}</p>
                  <p className='display-start-time'>{rideP.start_time}</p>
                  <p className='display-status'>{rideP.status}</p>
                  <ExitRideUsingPassengerButton rideId={rideP.ride_id} />
                </div>
                ))}
              </div>
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
