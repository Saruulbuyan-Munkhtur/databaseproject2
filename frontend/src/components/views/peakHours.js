import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const PeakHours = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => `${entry.hour}:00`),
    datasets: [
      {
        label: 'Number of Trips',
        data: data.map((entry) => entry.numberOfTrips),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Trips',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Hour',
        },
      },
    },
  };

  return (
    <div className="peak-hours">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default PeakHours;