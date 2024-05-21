import React, { useState } from 'react';
import CreateStationForm from '../components/stations/createStationForm'; // Import the CreateStationForm component
import { createStation } from '../services/stationService';
import Stations from '../components/stations/stations';
const StationsPage = () => {
  const [editingStation, setEditingStation] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false); // State variable to track the visibility of the form

  const handleEditStation = (station) => {
    setEditingStation(station);
  };

  const handleUpdateStation = (updatedStation) => {
    setEditingStation(null);
  };

  const handleCreateStation = (formData) => {
    const {lineName, station_english_name, district, intro, chinese_name, position, status} = formData;
    // Implement this function to handle the submission of form data
    console.log("Creating new station with data:", formData);
    // Call the createStation function from the station service
    
    createStation(lineName, station_english_name, district, intro, chinese_name, position, status)
      .then((newStation) => {
        console.log("New station created:", newStation);
        setIsFormOpen(false); // Close the form after successful submission
      })
      .catch((error) => {
        console.error('Error creating station:', error);
        // Handle error
      });
  };

  return (
    <div className="stations-page">
      <h1>Stations</h1>
      <button onClick={() => setIsFormOpen(true)}>Add Station</button>
      {isFormOpen && (
        <CreateStationForm onSubmit={handleCreateStation} onClose={() => setIsFormOpen(false)} />
      )}
      <Stations onEditStation={handleEditStation} />
    </div>
  );
};

export default StationsPage;
