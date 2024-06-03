import React, { useState } from 'react';
import { getBusesAtStations } from '../../services/graphService';
import StationItem from '../stations/stationItem';
import './graph.css';

const Buses = () => {
  const [station1, setStartNodeName] = useState('');
  const [station2, setEndNodeName] = useState('');
  const [busPath, setBusPath] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(station1)
      const path = await getBusesAtStations(station1, station2);
      console.log(path)
      setBusPath(path);
    } catch (error) {
      console.error('Error fetching Buses:', error);
    }
  };

  return (
    <div className="shortest-path">
      <h2>Buses</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Start Node"
          value={station1}
          onChange={(e) => setStartNodeName(e.target.value)}
        />
        <input
          type="text"
          placeholder="End Node"
          value={station2}
          onChange={(e) => setEndNodeName(e.target.value)}
        />
        <button type="submit">Find Bus Rides</button>
      </form>
      {busPath.length > 0 && (
        <div className="shortest-path-result">
          <h3>Available Buses:</h3>
          <div className='bus-path-container'>
          <ul className="bus-list">
            {busPath.map((bus, index) => (
              <li className="bus-item" key={index}>
                <div className="bus-info">{bus.bus_info}</div>
                <div className="bus-entrance">{bus.entrance}</div>
              </li>
            ))}
          </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default Buses;