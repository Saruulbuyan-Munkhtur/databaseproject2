import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const TravelTimePopularity = ({ travelTimeData, popularityData }) => {
  // Sort the popularity data in descending order
  const sortedPopularityData = popularityData.sort((a, b) => b.numberOfTrips - a.numberOfTrips);

  // Get the top 100 station-to-station data points
  const top100Data = sortedPopularityData.slice(0, 100);

  // Get the corresponding travel time data for the top 100 stations
  const top100TravelTimeData = travelTimeData.filter((entry) => {
    const stationPair = `${entry.startStation} - ${entry.endStation}`;
    return top100Data.some((item) => `${item.startStation} - ${item.endStation}` === stationPair);
  });

  // Prepare the data for the chart
  const labels = top100Data.map((entry) => `${entry.startStation} - ${entry.endStation}`);
  const travelTimes = top100TravelTimeData.map((entry) => entry.avgTravelTime);
  const popularity = top100Data.map((entry) => entry.numberOfTrips);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Average Travel Time (minutes)',
        data: travelTimes,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        yAxisID: 'travelTime',
      },
      {
        label: 'Number of Trips',
        data: popularity,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        yAxisID: 'popularity',
      },
    ],
  };

  const chartOptions = {
    scales: {
      travelTime: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Average Travel Time (minutes)',
        },
        ticks: {
          beginAtZero: true,
        },
      },
      popularity: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Number of Trips',
        },
        ticks: {
          beginAtZero: true,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="travel-time-popularity">
      <h2>Top 100 Travel Time vs. Popularity</h2>
      <div style={{ height: '600px' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default TravelTimePopularity;