const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lines = sequelize.define('lines', {
  line_name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  intro: {
    type: DataTypes.STRING,
  },
  mileage: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_opening: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
  },
  start_time: {
    type: DataTypes.TIME,
  },
  end_time: {
    type: DataTypes.TIME,
  },
}, {
  timestamps: false, // Disables createdAt and updatedAt
  tableName: 'lines',
});

module.exports = Lines;