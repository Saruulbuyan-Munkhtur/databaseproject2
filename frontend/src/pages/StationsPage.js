import React from 'react';
import Stations from '../components/stations/stations';
import StationDetails from '../components/stations/stationDetails';
import { Route, Routes } from 'react-router-dom';
import './page.css';

const StationsPage = () => {
  return (
    <div className="stations-page">
      <h1>Stations</h1>
      <Routes>
        <Route path="/" element={<Stations />} />
        <Route path="/:id" element={<StationDetails />} />
      </Routes>
    </div>
  );
};

export default StationsPage;