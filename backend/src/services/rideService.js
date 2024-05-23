const CardID_Rides = require('../models/cardid_rides');
const Station = require('../models/stations.js');
const Cards = require('../models/cards.js');
const Price = require('../models/price.js');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
});
exports.getAllRides = async () => {
  try {
    const cardRides = await CardID_Rides.findAll({
        where: {status: 'ONGOING'},
    });
    return cardRides;
  } catch (error) {
    throw new Error('Failed to fetch rides');
  }
};

exports.registerRideUsingCard = async (ID, StartStation, StartTime, startLine, endLine) => {
    try {
      console.log(ID);
      const maxRideId = await getID();
      const newRideId = maxRideId + 1;
      const newRide = await CardID_Rides.create({
        ride_id: newRideId,
        user_code: ID,
        start_station: StartStation,
        end_station: StartStation,
        price: 0,
        start_time: StartTime,
        end_time: StartTime,
        status: 'ONGOING'
      });
      console.log('Ride registered successfully:', newRide.toJSON());
      await exitRide(ID, endStation, endTime, startLine, endLine);

    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

//exit ride
exports.exitRideUsingCard = async (id, ID, endStation, startLine, endTime, endLine) => {
  try {
    const exitRide = await CardID_Rides.findOne({
      where: { ride_id: id,
           },
    });
    
    const start = await getChineseName(exitRide.start_station);
    const end = await getChineseName(endStation);
    console.log(startLine);
    const JourneyPrice = await getPrice(start, end, startLine, endLine);
    await exitRide.update({end_station: endStation, end_time: endTime, price: JourneyPrice, status: 'EXPIRED'});
    console.log('Exit Ride:', exitRide.toJSON());
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const getChineseName = async (stationName) => {
    try {
      const station = await Station.findOne({
        where: { station_english_name: stationName },
      });
  
      // Check if station exists and return its Chinese name
      if (station) {
        return station.chinese_name;
      } else {
        // Handle the case where the station is not found
        console.log(`Station with English name '${stationName}' not found.`);
        return null; // or throw an error if desired
      }
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  const getPrice = async (startStation, endStation, startLine, endLine) => {
    try {
      const Journey = await Price.findOne({
        where: { start_station: startStation,
        end_station: endStation,
        start_station_line: startLine,
        end_station_line: endLine, },
      });
  
      // Check if station exists and return its Chinese name
      if (Journey) {
        return Journey.price;
      } else {
        // Handle the case where the station is not found
        console.log(`Journey not found.`);
        return null; // or throw an error if desired
      }
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const getID = async () => {
    try {
      const sql = 'SELECT max(ride_id) as max_ride_id FROM cardid_rides'; // Alias the max(ride_id) column
      const [results] = await sequelize.query(sql);
      console.log('Query results:', results); // Log query results
      const maxRideId = parseInt(results[0].max_ride_id) || 0; // Access the result using the alias
      console.log('Max ride ID:', maxRideId); // Log parsed max ride ID
      return maxRideId;
    } catch (error) {
      console.error('Error fetching max ride ID:', error); // Log any errors
      throw error;
    }
  }