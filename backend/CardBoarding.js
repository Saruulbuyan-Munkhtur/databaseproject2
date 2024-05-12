require('dotenv').config({path: '/Users/harroldtok/databaseproject2/backend/.env'});
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  });
  

module.exports = sequelize;

const Cards = require('./src/models/cards.js');
const CardID_Rides = require('./src/models/cardid_rides.js');

//register new Card
const registerCard = async (user, money, createTime) => {
    try {
      const newCard = await Cards.create({
        user_id: user,
        money: money,
        create_time: createTime,
      });
      console.log('Data inserted successfully:', newCard.toJSON());
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };
//register ride
const registerRideUsingCard = async (ID, StartStation, Price, StartTime) => {
    try {
      const newRide = await CardID_Rides.create({
        card_id: ID,
        start_station: StartStation,
        end_station: StartStation,
        price: Price,
        start_time: StartTime,
        end_time: StartTime,
        Status: 'ONGOING'
      });
      console.log('Ride registered successfully:', newRide.toJSON());
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

//exit ride
const exitRide = async (ID, endStation) => {
  try {
    const exitRide = await CardID_Rides.findOne({
      where: { id_number: ID,
               Status: 'ONGOING',
           },
    });
    await exitRide.update({end_station: endStation, end_time: endTime, status: 'EXPIRED'});
    console.log('Exit Ride:', newRide.toJSON());
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