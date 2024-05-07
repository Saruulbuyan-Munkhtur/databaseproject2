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

const deleteStation = async () => {
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
addStation();