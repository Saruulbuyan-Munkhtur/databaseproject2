import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const PopularStations = ({ data }) => {
  // Sort the data by number of trips in descending order
  console.log("POPULAR STATIONS: ", data);
  const sortedData = data.sort((a, b) => b.numberOfTrips - a.numberOfTrips);

  // Get the top 20 stations
  const top20Stations = sortedData.slice(0, 20);

  const chartData = {
    labels: top20Stations.map((entry) => entry.station),
    datasets: [
      {
        label: 'Number of Trips',
        data: top20Stations.map((entry) => entry.numberOfTrips),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Trips',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Station',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="popular-stations">
      <h2>Top 20 Most Popular Stations</h2>
      <div style={{ height: '600px' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PopularStations;