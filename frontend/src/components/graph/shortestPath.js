import React, { useState } from 'react';
import { getShortestPath } from '../../services/graphService';
import StationItem from '../stations/stationItem';
import './graph.css';

const ShortestPath = () => {
  const [startNodeName, setStartNodeName] = useState('');
  const [endNodeName, setEndNodeName] = useState('');
  const [shortestPath, setShortestPath] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const path = await getShortestPath(startNodeName, endNodeName);
      setShortestPath(path);
    } catch (error) {
      console.error('Error fetching shortest path:', error);
    }
  };

  return (
    <div className="shortest-path">
      <h2>Shortest Path</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Start Node"
          value={startNodeName}
          onChange={(e) => setStartNodeName(e.target.value)}
        />
        <input
          type="text"
          placeholder="End Node"
          value={endNodeName}
          onChange={(e) => setEndNodeName(e.target.value)}
        />
        <button type="submit">Find Shortest Path</button>
      </form>
      {shortestPath.length > 0 && (
        <div className="shortest-path-result">
          <h3>Shortest Path:</h3>
          <div className="path-container">
            {shortestPath.map((station, index) => (
              <React.Fragment key={station}>
                <StationItem station={{ station_english_name: station }} />
                {index < shortestPath.length - 1 && (
                  <div className="arrow">&#8594;</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortestPath;