const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Price = sequelize.define('price', {
  start_station: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  end_station: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
}, {
  timestamps: false, // Disables createdAt and updatedAt
  tableName: 'price',
});

module.exports = Price;