const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'harroldtok', '6969', {
  host: 'localhost',
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