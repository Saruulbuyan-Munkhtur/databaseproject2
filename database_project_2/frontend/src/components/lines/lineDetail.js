import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLine } from '../../services/line_stationService';
import { getLineById, deleteline, updateline, verifyStation, findNthStation, placeStationsOnLine } from '../../services/lineService';
import EditLineForm from './editLineForm';
import './lines.css';
import DeleteFromLineButton from './deleteFromLineButton';

const LineDetail = ({onDelete}) => {
  const location = useLocation();
  const lineName = location.state?.lineName;
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);
  const [lineDetails, setLineDetails] = useState(null);
  const [showIntro, setShowIntro] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [stationNameInput, setStationNameInput] = useState('');
  const [positionInput, setPositionInput] = useState('');
  const [error, setError] = useState('');
  const [nthStations, setNthStations] = useState([]);
  const [addedStations, setAddedStations] = useState([]);
  const [addedStation, setAddedStation] = useState([]);
  const [positionInput2, setPositionInput2] = useState('');

  const handleStationNameInputChange = (event) => {
    setStationNameInput(event.target.value);
  };
  const handleAddedStationNameInputChange = (event) => {
    setAddedStation(event.target.value);
  };

  const handlePositionInputChange = (event) => {
    setPositionInput(event.target.value);
  };

  const handlePositionInputChange2 = (event) => {
    setPositionInput2(event.target.value);
  };

  useEffect(() => {
    const fetchStations = async () => {
      try {
        if (lineName) {
          const stations = await getLine(lineName);
	  const lineDetails = await getLineById(lineName);
          setStations(stations || []);
          setLineDetails(lineDetails);
        }
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStations();
  }, [lineName]);

  const sortedStations = stations ? stations.sort((a, b) => a.position - b.position) : [];

  if (!lineName) {
    return <div>No line name provided.</div>;
  }
  
  const toggleIntro = () => {
    setShowIntro(!showIntro);
  };

  const handleDelete = async () => {
    try {
      await deleteline(lineName);
      onDelete();
      navigate('/lines'); // Navigate back to the lines page after successful deletion
    } catch (error) {
      console.error('Error deleting line:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = async (updatedLine) => {
    try {
      await updateline(lineName, updatedLine);
      setLineDetails(updatedLine);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating line:', error);
    }
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  const handleFindSubmit = async (event) => {
    event.preventDefault();
    try {
      const position = parseInt(positionInput);
      if (!isNaN(position) && position >= 1 && position <= sortedStations.length) {
        const nthStations = await findNthStation(lineName, stationNameInput, position);
        setNthStations(nthStations);
      } else {
        setError('Please enter a valid position between 1 and the total number of stations.');
      }
    } catch (error) {
      console.error('Error finding station by name and position:', error);
      setError('Failed to find station. Please try again.');
    }
  };

  const handleAddStation = async (event) => {
    event.preventDefault();
    const eligible = await verifyStation(lineName, addedStation);
    console.log(eligible);
    if (eligible) {
      setAddedStations([...addedStations, { station_name: addedStation }]);
      setAddedStation(''); 
    } else {
      alert('Either Station does not exist or it is part of the line already!');
    }
  };
  
  

  const handleInsertStations = async (event) => {
    event.preventDefault();
    try {
      const position = parseInt(positionInput2); //starting position to insert
      const stationsToAdd = addedStations;
      let stationNames = [];
      for(const c of stationsToAdd){
        stationNames.push(c.station_name);
      }
      const batch = await placeStationsOnLine(lineName, stationNames, position, 'OPERATIONAL');
        }  catch (error) {
      console.error('Error batch inputing', error);
    }
  };

  return (
    <div className="line-detail">
      <div className='line-detail-top'>
        <div className='line-detail-left'>
          <h2>Line: {lineName}</h2>
          <button className="delete-button" onClick={handleDelete}>
            Delete Line
          </button>
          <button className="edit-button" onClick={handleEditClick}>
            Edit Line
          </button>
          <form onSubmit={handleFindSubmit}>
            <label htmlFor="stationNameInput">Station Name:</label>
            <input
              type="text"
              id="stationNameInput"
              name="stationNameInput"
              value={stationNameInput}
              placeholder='Station Name'
              onChange={handleStationNameInputChange}
              required
            />
            <label htmlFor="positionInput">Position:</label>
            <input
              type="number"
              id="positionInput"
              name="positionInput"
              value={positionInput}
              onChange={handlePositionInputChange}
              placeholder='Position Ahead and Behind'
              required
            />
            <button type="submit" className="find-nth-button">
              Find Station
            </button>
          </form>
          <form onSubmit={handleAddStation}>
            <label htmlFor="addStationInput">Add Station to Line:</label>
            <input
              type="text"
              id="addStationInput"
              name="addStationInput"
              value={addedStation}
              onChange={handleAddedStationNameInputChange}
              placeholder='Station Name'
              required
            />
            <button type="submit" className="add-station-button">
              Add Station
            </button>
          </form>
        </div>
        <div className='line-detail-right'>
          <h3>Added Stations:</h3>
          <div className="station-list">
            {addedStations.map((station, index) => (
              <div key={index} className="station-item">
                <h4>{station.station_name}</h4>
              </div>
            ))}
          </div>
          <form onSubmit={handleInsertStations}>
            <label htmlFor="addPositionInput">Position:</label>
            <input
              type="number"
              id="addPositionInput"
              name="addPositionInput"
              value={positionInput2}
              onChange={handlePositionInputChange2}
              placeholder='Position'
              required
            />
            <button type="submit" className="add-station-button">
              Insert
            </button>
          </form>
        </div>
      </div>
      {nthStations.length > 0 && (
        <div>
          <h3>Found Stations:</h3>
          <div className="station-list2">
            {nthStations.map((station) => (
              <div key={station.station_name} className="station-item2">
                <h4>{station.station_name}</h4>
                <p>Position: {station.position}</p>
                <p className={`status ${station.status.toLowerCase()}`}>Status: {station.status}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {isEditing && (
        <div className="edit-line-popup">
          <div className="edit-line-popup-content">
            <h2>Edit Line</h2>
            <EditLineForm
              line={lineDetails}
              onSubmit={handleEditSubmit}
              onClose={handleEditClose}
            />
          </div>
        </div>
      )}
      {lineDetails && (
        <div className="line-info">
          <div className="info-row">
            <div className="info-item">
              <strong>Mileage:</strong> {lineDetails.mileage} miles
            </div>
            <div className="info-item">
              <strong>Color:</strong> <span className={`line-color ${lineDetails.color}`}>{lineDetails.color}</span>
            </div>
          </div>
          <div className="info-row">
            <div className="info-item">
              <strong>First Opening:</strong> {lineDetails.first_opening}
            </div>
            <div className="info-item">
              <strong>URL:</strong> <a href={lineDetails.url} target="_blank" rel="noopener noreferrer">{lineDetails.url}</a>
            </div>
          </div>
          <div className="info-row">
            <div className="info-item">
              <strong>Start:</strong> {lineDetails.start_time}
            </div>
            <div className="info-item">
              <strong>End:</strong> {lineDetails.end_time}
            </div>
          </div>
          <button className="intro-button" onClick={toggleIntro}>
            {showIntro ? 'Hide Introduction' : 'Show Introduction'}
          </button>
          {showIntro && (
            <div className="intro-popup">
              <h3>Introduction:</h3>
              <div className="intro-text">
                {lineDetails.intro.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <h3>Stations:</h3>
      <div className="station-list">
        {sortedStations.map((station) => (
          <div key={station.station_name} className="station-item">
            <h4>{station.station_name}</h4>
            <p>Position: {station.position}</p>
            <p className={`status ${station.status.toLowerCase()}`}>Status: {station.status}</p>
            <DeleteFromLineButton onClick={useEffect} lineName={lineName} stationName={station.station_name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineDetail;
