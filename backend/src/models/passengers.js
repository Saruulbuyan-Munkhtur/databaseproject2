const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Passengers = sequelize.define('passengers', {
  id_number: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, // Disables createdAt and updatedAt
  tableName: 'passengers',
});

module.exports = Passengers;