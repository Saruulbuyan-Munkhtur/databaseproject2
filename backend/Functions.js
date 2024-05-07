require('dotenv').config({path: './env'});
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  });
  

module.exports = sequelize;

const Station = require('./src/models/stations.js');
const addStation = async () => {
  try {
    const newStation = await Station.create({
      station_english_name: 'test2',
      district: 'test',
      intro: 'test',
      chinese_name: 'test'
    });
    console.log('Data inserted successfully:', newStation.toJSON());
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

// Function to update a station given an identifier and new data
const modifyStation = async (station_english_name, updatedDetails) => {
    try {
      // Find the station by its English name
      const station = await Station.findOne({
        where: { station_english_name: station_english_name },
      });
  
      if (!station) {
        console.log(`Station with English name "${station_english_name}" not found.`);
        return;
      }
  
      // Update the station with the new details
      await station.update(updatedDetails);
  
      console.log('Station updated successfully:', station.toJSON());
    } catch (error) {
      console.error('Error updating station:', error);
    }
  };


  const deleteStation = async (station_english_name) => {
    try {
      // Find the station by its English name
      const station = await Station.findOne({
        where: { station_english_name: station_english_name },
      });
  
      if (!station) {
        console.log(`Station with English name "${station_english_name}" not found.`);
        return;
      }
  
      // Update the station with the new details
      await station.destroy();
  
      console.log('Station destroyed', station.toJSON());
    } catch (error) {
      console.error('Error updating station:', error);
    }
  };
