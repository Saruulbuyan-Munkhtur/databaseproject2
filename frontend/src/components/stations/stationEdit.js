import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateStation } from '../../services/stationService';

const StationEdit = ({ station, onUpdateStation }) => {
  const [stationData, setStationData] = useState(station);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setStationData({ ...stationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
	try {
	  const { district, intro, chinese_name } = stationData;
	  console.log('Updating station with data:', { district, intro, chinese_name });
	  const updatedStation = await updateStation(stationData.station_english_name, stationData);
	  onUpdateStation(updatedStation);
	  navigate(`/stations/${updatedStation.station_english_name}`);
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
          name="chinese_name"
          value={stationData.chinese_name}
          onChange={handleChange}
          placeholder="Chinese Name"
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default StationEdit;