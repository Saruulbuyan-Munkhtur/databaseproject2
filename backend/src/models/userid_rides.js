const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserID_rides = sequelize.define('userid_rides', {
  ride_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_station: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  end_station: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  class: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false, // Disables createdAt and updatedAt
  tableName: 'userid_rides',
});

module.exports = UserID_rides;