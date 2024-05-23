import React, { useState } from 'react';
import { updateStation } from '../../services/stationService';
import './stations.css';

const StationEdit = ({ station, onSubmit, onClose }) => {
  const [stationData, setStationData] = useState(station);

  const handleChange = (e) => {
    setStationData({ ...stationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { lineName, station_english_name, district, intro, chinese_name, position, status } = stationData;
      console.log('Updating station with data:', { lineName, station_english_name, district, intro, chinese_name, position, status });
      const updatedStation = await updateStation(lineName, station_english_name, district, intro, chinese_name, position, status);
      onSubmit(updatedStation);
      onClose();
    } catch (error) {
      console.error('Error updating station:', error);
      // Display an error message to the user or handle the error as needed
    }
  };

  return (
    <div className="station-edit">
      <h2>Edit Station</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="lineName"
          value={stationData.lineName}
          onChange={handleChange}
          placeholder="Line Name"
        />
        <input
          type="text"
          name="station_english_name"
          value={stationData.station_english_name}
          onChange={handleChange}
          placeholder="English Name"
        />
        <input
          type="text"
          name="chinese_name"
          value={stationData.chinese_name}
          onChange={handleChange}
          placeholder="Chinese Name"
        />
        <input
          type="text"
          name="district"
          value={stationData.district}
          onChange={handleChange}
          placeholder="District"
        />
        <input
          type="text"
          name="intro"
          value={stationData.intro}
          onChange={handleChange}
          placeholder="Intro"
        />
        <input
          type="text"
          name="position"
          value={stationData.position}
          onChange={handleChange}
          placeholder="Position"
        />
        <input
          type="text"
          name="status"
          value={stationData.status}
          onChange={handleChange}
          placeholder="Status"
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default StationEdit;