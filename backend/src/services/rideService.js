const CardID_Rides = require('../models/cardid_rides');
const UserID_Rides = require('../models/userid_rides');
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

exports.getAllRidesP = async () => {
  try {
    const userRides = await UserID_Rides.findAll({
        where: {status: 'ONGOING'},
    });
    return userRides;
  } catch (error) {
    throw new Error('Failed to fetch rides');
  }
};

exports.registerRideUsingCard = async (ID, StartStation, StartTime) => {
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
      await exitRide(ID, endStation, endTime);

    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

//exit ride
exports.exitRideUsingCard = async (id, ID, endStation, endTime) => {
  try {
    const exitRide = await CardID_Rides.findOne({
      where: { ride_id: id,
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

exports.registerRideUsingPassenger = async (ID, StartStation, StartTime) => {
  try {
    const maxRideId = await getIDP();
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
    await exitRide(ID, endStation, endTime);
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

exports.exitRideUsingPassenger = async (ID, endStation, endTime) => {
  try {
    const exitRide = await UserID_Rides.findOne({
      where: { ride_id: ID
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
        end_station: endStation,
      },
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

  const getIDP = async () => {
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

  exports.nthParamSearch = async (startStation, endStation, minStartTime, maxStartTime, minEndTime, maxEndTime, minPrice, maxPrice, status) => {
    let query1 = `SELECT * FROM cardid_rides cr JOIN cards c on cr.user_code = c.code WHERE ride_id > 0 `;
    let query2 = `SELECT * FROM userid_rides u JOIN passengers p ON u.user_id = p.id_number WHERE ride_id > 0 `;

    if(minStartTime !== ''){
      query1 += `AND start_time >= '${minStartTime}' `;
      query2 += `AND start_time >= '${minStartTime}' `;
    }
    if(maxStartTime !== ''){
      query1 += `AND start_time >= '${maxStartTime}' `;
      query2 += `AND start_time >= '${maxStartTime}' `;
    }
    if(minEndTime !== ''){
      query1 += `AND end_time >= '${minEndTime}' `;
      query2 += `AND end_time >= '${minEndTime}' `;
    }
    if(maxEndTime !== ''){
      query1 += `AND end_time >= '${maxEndTime}' `;
      query2 += `AND end_time >= '${maxEndTime}' `;
    }
    
    if(status == ''){
        query1 += `AND status IN ('ONGOING', 'EXPIRED') `;
        query2 += `AND status IN ('ONGOING', 'EXPIRED') `;
    } else if(status == 'ONGOING'){
        query1 += `AND status = 'ONGOING' `;
        query2 += `AND status = 'ONGOING' `;
    } else {
        query1 += `AND status = 'EXPIRED' `;
        query2 += `AND status = 'EXPIRED' `;
    }
  
    if(startStation !== ''){
        query1 += `AND start_station = '${startStation}' `;
        query2 += `AND start_station = '${startStation}' `;
    }
    if(endStation !== ''){
        query1 += `AND end_station = '${endStation}' `;
        query2 += `AND end_station = '${endStation}' `;
    }

    if(minPrice !== ''){
      query1 += `AND price >= '${minPrice}' `;
      query2 += `AND price >= '${minPrice}' `;
    }
    if(maxPrice !== ''){
      query1 += `AND price <= '${maxPrice}' `;
      query2 += `AND price <= '${maxPrice}' `;
    }

    const [result1] = await sequelize.query(query1);
    const [result2] = await sequelize.query(query2);
    console.log(result2);
    return { result1, result2 };
}
