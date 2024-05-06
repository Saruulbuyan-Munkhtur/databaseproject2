const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Station = sequelize.define('Station', {
  station_english_name: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  intro: {
	type: DataTypes.TEXT,
	allowNull: false,
  },
  chinese_name:{
	type: DataTypes.STRING,
	allowNull: false,
  },

  // Add more attributes as needed
});

module.exports = Station;