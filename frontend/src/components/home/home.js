import React, { useEffect, useState } from 'react';
import './home.css';
import { getStations } from '../../services/stationService';
import StationItem from '../stations/stationItem';

const Home = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await getStations();
        console.log(data);
        setStations(data);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStations();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Subway Company</h1>
        <p>Discover the convenience and efficiency of our subway system.</p>
        <a href="/lines" className="cta-button">Explore Lines</a>
      </section>

      <section className="featured-stations">
        <h2>Featured Stations</h2>
        {stations.length === 0 ? (
          <p>Loading stations...</p>
        ) : (
          <div className="station-grid">
            {stations.slice(0, 3).map((station) => (
              <StationItem
                key={station.station_english_name}
                stationName={station.station_english_name}
                onDeleteStation={() => {}}
                onEditStation={() => {}}
                onViewDetails={() => {}}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;