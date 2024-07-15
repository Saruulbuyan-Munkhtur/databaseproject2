import React, { useState } from 'react';
import { getAdjacencyList } from '../../services/graphService';
import StationItem from '../stations/stationItem';

const AdjacencyList = () => {
  const [stationName, setStationName] = useState('');
  const [adjacencyList, setAdjacencyList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Stationname for adjacency list: ", stationName);
      const list = await getAdjacencyList(stationName);
      setAdjacencyList(list);
    } catch (error) {
      console.error('Error fetching adjacency list:', error);
    }
  };

  return (
    <div className="adjacency-list">
      <h2>Adjacency List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Station Name"
          value={stationName}
          onChange={(e) => setStationName(e.target.value)}
        />
        <button type="submit">Get Adjacency List</button>
      </form>
      {adjacencyList.length > 0 && (
        <div>
          <h3>Adjacent Stations:</h3>
          <ul className="station-list">
            {adjacencyList.map((station) => (
              <StationItem key={station} stationName={ station } />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdjacencyList;