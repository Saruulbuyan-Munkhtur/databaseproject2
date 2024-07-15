import React, { useState } from 'react';
import CreateStationForm from '../components/stations/createStationForm';
import StationEdit from '../components/stations/stationEdit';
import { createStation, updateStation } from '../services/stationService';
import Stations from '../components/stations/stations';

const StationsPage = () => {
  const [editingStation, setEditingStation] = useState(null);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const handleEditStation = (station) => {
    setEditingStation(station);
    setIsEditFormOpen(true);
  };
  const onAddClick = ()=>{
    setIsCreateFormOpen(true);
  }

  const handleUpdateStation = (formData) => {
    const { id, lineName, station_english_name, district, intro, chinese_name, position, status } = formData;

    console.log("Updating station with data:", formData);

    updateStation(id, lineName, station_english_name, district, intro, chinese_name, position, status)
      .then((updatedStation) => {
        console.log("Station updated:", updatedStation);
        setEditingStation(null);
        setIsEditFormOpen(false);
      })
      .catch((error) => {
        console.error('Error updating station:', error);
        // Handle error
      });
  };

  const handleCreateStation = (formData) => {
    const { lineName, station_english_name, district, intro, chinese_name, position, status } = formData;

    console.log("Creating new station with data:", formData);

    createStation(lineName, station_english_name, district, intro, chinese_name, position, status)
      .then((newStation) => {
        console.log("New station created:", newStation);
        setIsCreateFormOpen(false);
      })
      .catch((error) => {
        console.error('Error creating station:', error);
        // Handle error
      });
  };

  return (
    <div className="stations-page">
      <h1>Stations</h1>
      {/* <button onClick={() => setIsCreateFormOpen(true)}>Add Station</button> */}
      {isCreateFormOpen && (
        <CreateStationForm onSubmit={handleCreateStation} onClose={() => setIsCreateFormOpen(false)} />
      )}
      {isEditFormOpen && (
        <StationEdit
          station={editingStation}
          onSubmit={handleUpdateStation}
          onClose={() => setIsEditFormOpen(false)}
        />
      )}
      <Stations onEditStation={handleEditStation} onAddStation = {onAddClick} />
    </div>
  );
};

export default StationsPage;