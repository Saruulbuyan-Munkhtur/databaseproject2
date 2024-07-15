const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cards = sequelize.define('cards', {
  code: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  money: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  create_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: false, // Disables createdAt and updatedAt
  tableName: 'cards',
});

module.exports = Cards;