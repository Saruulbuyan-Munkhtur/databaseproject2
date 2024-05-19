import React, { useState } from 'react';
import Stations from '../components/stations/stations';
import StationDetails from '../components/stations/stationDetails';
import StationEdit from '../components/stations/stationEdit';
import { Route, Routes } from 'react-router-dom';
import './page.css';

const StationsPage = () => {
  const [editingStation, setEditingStation] = useState(null);

  const handleEditStation = (station) => {
    setEditingStation(station);
  };

  const handleUpdateStation = (updatedStation) => {
    setEditingStation(null);
  };

  return (
    <div className="stations-page">
      <h1>Stations</h1>
      <Routes>
        <Route
          path="/*"
          element={
            editingStation ? (
              <StationEdit station={editingStation} onUpdateStation={handleUpdateStation} />
            ) : (
              <Stations onEditStation={handleEditStation} />
            )
          }
        />
        <Route path="/:id" element={<StationDetails />} />
      </Routes>
    </div>
  );
};

export default StationsPage;