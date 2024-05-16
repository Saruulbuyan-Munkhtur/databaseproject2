require('dotenv').config({path: '/Users/harroldtok/databaseproject2/backend/.env'});
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  });
  

module.exports = sequelize;

const Station = require('./src/models/stations.js');
const Passengers = require('./src/models/passengers.js');
const UserID_Rides = require('./src/models/userid_rides.js');
const Price = require('./src/models/price.js');
const { exit } = require('process');

//register passenger
const registerPassengerUsingID = async (ID, Name, Phone_number, Gender, District) => {
    try {
      const newPassenger = await Passengers.create({
        id_number: ID,
        name: Name,
        phone_number: Phone_number,
        gender: Gender,
        district: District,
      });
      console.log('Data inserted successfully:', newPassenger.toJSON());
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };
//register ride
const registerRide = async (ID, StartStation, StartTime) => {
  try {
    const maxRideId = await getID();
    const newRideId = maxRideId + 1;
    const newRide = await UserID_Rides.create({
      ride_id: newRideId,
      user_id: ID,
      start_station: StartStation,
      end_station: StartStation,
      price: 0,
      start_time: StartTime,
      end_time: StartTime,
      status: 'ONGOING',
      returning: false,
    });
    console.log('Ride registered successfully:', newRide.toJSON());
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

//exit ride
const exitRide = async (ID, endStation, endTime) => {
  try {
    const exitRide = await UserID_Rides.findOne({
      where: { user_id: ID,
               status: 'ONGOING',
           },
    });
    const start = await getChineseName(exitRide.start_station);
    const end = await getChineseName(endStation);
    const JourneyPrice = await getPrice(start, end);
    await exitRide.update({end_station: endStation, end_time: endTime, price: JourneyPrice, status: 'EXPIRED'});
    console.log('Exit Ride:', exitRide.toJSON());
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

//find ride details
const findRideDetails = async (ID, StartStation, EndStation, Price, StartTime, EndTime) => {
    try {
      const newRide = await UserID_Rides.create({
        user_id: ID,
        start_station: StartStation,
        end_station: EndStation,
        price: Price,
        start_time: StartTime,
        end_time: EndTime,
      });
      console.log('Ride registered successfully:', newRide.toJSON());
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };
//retrieve passenger history

//generate report

// Function to get the Chinese name of the station
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

const getPrice = async (startStation, endStation) => {
  try {
    const Journey = await Price.findOne({
      where: { start_station: startStation,
      end_station: endStation },
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

async function getID() {
  try {
    const sql = 'SELECT max(ride_id) as max_ride_id FROM userid_rides'; // Alias the max(ride_id) column
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

//registerRide('830000195707117710', 'Luohu', 1);
exitRide('830000195707117710', 'Tanglang', 1);
