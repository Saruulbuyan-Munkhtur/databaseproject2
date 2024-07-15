const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Station_Buses = sequelize.define('station_buses', {
  station_name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  entrance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bus_info: {
    type: DataTypes.STRING,
  },
  bus_name: {
    type: DataTypes.STRING,
  },
  bus_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  timestamps: false, // Disables createdAt and updatedAt
  tableName: 'station_buses',
});

module.exports = Station_Buses;