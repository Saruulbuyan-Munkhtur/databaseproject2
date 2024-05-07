const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Station = sequelize.define('stations', {
  station_english_name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  intro: {
    type: DataTypes.STRING,
  },
  chinese_name: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false, // Disables createdAt and updatedAt
  tableName: 'stations',
});

module.exports = Station;