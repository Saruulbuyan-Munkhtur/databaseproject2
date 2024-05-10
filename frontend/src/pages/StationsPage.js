import React from 'react';
import { Route, useMatch } from 'react-router-dom';
import Stations from '../components/stations/stations';
import StationDetails from '../components/stations/stationDetails';

const StationsPage = () => {
  const match = useMatch();

  return (
    <div className="stations-page">
      <h1>Stations</h1>
      <Route exact path={match.path} element={<Stations />} />
      <Route path={`${match.path}/:id`} element={<StationDetails />} />
    </div>
  );
};

export default StationsPage;