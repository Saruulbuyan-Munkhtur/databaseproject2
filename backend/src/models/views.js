const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AvgTravelTime = sequelize.define('AvgTravelTime', {

    startStation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endStation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avgTravelTime: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'avg_travel_time',
    timestamps: false,
//     primaryKey: false,
    defaultScope: {
	attributes: { exclude: ['id'] },
      },
});

const StationPopularity = sequelize.define('StationPopularity', {
	station: {
	    type: DataTypes.STRING,
	    allowNull: false,
	},
	numberOfTrips: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	},
    }, {
	tableName: 'station_popularity',
	timestamps: false,
	// primaryKey: false,
	defaultScope: {
		attributes: { exclude: ['id'] },
	      },
    });

const PeakHours = sequelize.define('PeakHours', {
	hour: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	numberOfTrips: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	}, {
	tableName: 'peak_hours',
	timestamps: false,
	// primaryKey: false,
	defaultScope: {
		attributes: { exclude: ['id'] },
	      },
});

const StationToStationPopularity = sequelize.define('StationToStationPopularity', {
	startStation: {
	  type: DataTypes.STRING,
	  allowNull: false,
	  field: 'Start Station',
	},
	endStation: {
	  type: DataTypes.STRING,
	  allowNull: false,
	  field: 'End Station',
	},
	numberOfTrips: {
	  type: DataTypes.INTEGER,
	  allowNull: false,
	  field: 'Number of Trips',
	},
      }, {
	tableName: 'station_to_station_popularity',
	timestamps: false,
	defaultScope: {
		attributes: { exclude: ['id'] },
	      },
      });

module.exports = {AvgTravelTime, PeakHours, StationPopularity, StationToStationPopularity};