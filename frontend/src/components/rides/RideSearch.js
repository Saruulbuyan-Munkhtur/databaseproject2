import React, { useState } from 'react';
import { nthParamSearch } from '../../services/rideService';
import './RideSearch.css'; 

const RideSearch = ({ onSubmit }) => {
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [minStartTime, setMinStartTime] = useState('');
  const [maxStartTime, setMaxStartTime] = useState('');
  const [minEndTime, setMinEndTime] = useState('');
  const [maxEndTime, setMaxEndTime] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [status, setStatus] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchParams = {
      startStation: startStation, 
      endStation: endStation,
      minStartTime: minStartTime,
      maxStartTime: maxStartTime,
      minEndTime: minEndTime,
      maxEndTime: maxEndTime,
      minPrice: minPrice, 
      maxPrice: maxPrice,
      status,
    };
    try {
      const rides = await nthParamSearch(searchParams.startStation, searchParams.endStation, searchParams.minStartTime, searchParams.maxStartTime, searchParams.minEndTime, searchParams.maxEndTime, searchParams.minPrice, searchParams.maxPrice,);
      onSubmit(rides);
    } catch (error) {
      console.error('Error fetching rides:', error);
    }
  };

  return (
    <div className={`ride-search-container ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleOpen} className="open-search-button">Open Search</button>
      <form onSubmit={handleSubmit} className="ride-search">
        <h2>Filter Rides</h2>
        <div>
          <input
            type="text"
            id="startStation"
            value={startStation}
            onChange={(e) => setStartStation(e.target.value)}
            placeholder="Enter Start Station"
          />
        </div>
        <div>
          <input
            type="text"
            id="endStation"
            value={endStation}
            onChange={(e) => setEndStation(e.target.value)}
            placeholder="Enter End Station"
          />
        </div>
        <div className="time-range">
          <label htmlFor="minStartTime">Min Start Time:</label>
          <input
            type="datetime-local"
            id="minStartTime"
            value={minStartTime}
            onChange={(e) => setMinStartTime(e.target.value)}
          />
          <label htmlFor="maxStartTime">Max Start Time:</label>
          <input
            type="datetime-local"
            id="maxStartTime"
            value={maxStartTime}
            onChange={(e) => setMaxStartTime(e.target.value)}
          />
        </div>
        <div className="time-range">
          <label htmlFor="minEndTime">Min End Time:</label>
          <input
            type="datetime-local"
            id="minEndTime"
            value={minEndTime}
            onChange={(e) => setMinEndTime(e.target.value)}
          />
          <label htmlFor="maxEndTime">Max End Time:</label>
          <input
            type="datetime-local"
            id="maxEndTime"
            value={maxEndTime}
            onChange={(e) => setMaxEndTime(e.target.value)}
          />
        </div>
        <div className="price-range">
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price"
          />
          <p>-</p>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"
          />
        </div>
        <div>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Enter Status"
          />
        </div>
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default RideSearch;
