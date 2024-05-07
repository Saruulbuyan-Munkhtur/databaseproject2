const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lines_Station = sequelize.define('lines_station', {
  line_name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  station_name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false, // Disables createdAt and updatedAt
  tableName: 'lines_station',
});

module.exports = Lines_Station;