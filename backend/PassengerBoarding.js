require('dotenv').config({path: '/Users/harroldtok/databaseproject2/backend/.env'});
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  });
  

module.exports = sequelize;

const Passengers = require('./src/models/passengers.js');
const UserID_Rides = require('./src/models/userid_rides.js');

//register passenger
const registerPassenger = async (ID, Name, Phone_number, Gender, District) => {
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
const registerRide = async (ID, StartStation, Price, StartTime, Status) => {
    try {
      const newRide = await UserID_Rides.create({
        user_id: ID,
        start_station: StartStation,
        end_station: StartStation,
        price: Price,
        start_time: StartTime,
        end_time: StartTime,
      });
      console.log('Ride registered successfully:', newRide.toJSON());
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

//exit ride









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