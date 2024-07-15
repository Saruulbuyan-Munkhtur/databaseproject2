import React, { useEffect, useState } from 'react';
import './home.css';
import { getStations } from '../../services/stationService';
import { getPeakHours, getStationPopularity, getAvgTravelTime, getStationToStationPopularity } from '../../services/viewService';
import StationItem from '../stations/stationItem';
import PeakHours from '../views/peakHours';
import StationPopularity from '../views/stationPopularity';
import TravelTimePopularity from '../views/travelTimePopularity';

const Home = () => {
  const [stations, setStations] = useState([]);
  const [peakHoursData, setPeakHoursData] = useState([]);
  const [stationPopularityData, setStationPopularityData] = useState([]);
  const [avgTravelTimeData, setAvgTravelTimeData] = useState([]);
  const [stsPopularityData, setStsPopularityData] = useState([]);

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

    const fetchPeakHours = async () => {
      try {
        const data = await getPeakHours();
        console.log(data);
        setPeakHoursData(data);
      } catch (error) {
        console.error('Error fetching peak hours:', error);
      }
    };
    const fetchStationPopularity = async () => {
      try {
        const data = await getStationPopularity();
        console.log(data);
        setStationPopularityData(data);
      } catch (error) {
        console.error('Error fetching station popularity:', error);
      }
    };
    const fetchAvgTravelTime = async () => {
      try{
        const data = await getAvgTravelTime();
        console.log(data);
        setAvgTravelTimeData(data);
      } catch(error){
        console.error('Erro fetching station popularity: ', error);
      }
    }
    const fetchstsPopularity = async () => {
      try{
        const data = await getStationToStationPopularity();
        console.log(data);
        setStsPopularityData(data);
      } catch(error){
        console.error('Erro fetching station popularity: ', error);
      }
    }

    fetchStations();
    fetchPeakHours();
    fetchStationPopularity();
    fetchAvgTravelTime();
    fetchstsPopularity();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Subway Company</h1>
        <p>Discover the convenience and efficiency of our subway system.</p>
        <a href="/lines" className="cta-button">Explore Lines</a>
      </section>

      {/* <section className="featured-stations">
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
      </section> */}

      <section className="peak-hours">
        <h2>Peak Hours</h2>
        {peakHoursData.length === 0 ? (
          <p>Loading peak hours...</p>
        ) : (
          <PeakHours data={peakHoursData} />
        )}
      </section>
      <section className="station-popularity">
        <h2>Station Popularity</h2>
        {stationPopularityData.length === 0 ? (
          <p>Loading Station Popularity...</p>
        ) : (
          <StationPopularity data={stationPopularityData} />
        )}
      </section>
      <section className="travel-time-popularity">
        <h2>Time Travel Popularity</h2>
        {stationPopularityData.length === 0 ? (
          <p>Loading time travel popularity...</p>
        ) : (
          <TravelTimePopularity travelTimeData={avgTravelTimeData} popularityData={stsPopularityData} />
        )}
      </section>
    </div>
  );
};

export default Home;