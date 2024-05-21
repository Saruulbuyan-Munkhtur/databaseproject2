import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLine } from '../../services/line_stationService';
import { getLineById, deleteline } from '../../services/lineService';
import './lines.css';

const LineDetail = ({onDelete}) => {
  const location = useLocation();
  const lineName = location.state?.lineName;
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);
  const [lineDetails, setLineDetails] = useState(null);
  const [showIntro, setShowIntro] = useState(false);

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

  return (
	<div className="line-detail">
      <h2>Line: {lineName}</h2>
      <button className="delete-button" onClick={handleDelete}>
            Delete Line
          </button>
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
              <strong>Start:</strong> {lineDetails.start}
            </div>
            <div className="info-item">
              <strong>End:</strong> {lineDetails.end}
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
            <p className={`status-${station.status.toLowerCase()}`}>Status: {station.status}</p>
          </div>
        ))}
      </div>
    </div>	
  );
};

export default LineDetail;