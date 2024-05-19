const Station = require('../models/stations');
const Lines_Station = require('../models/lines_station');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

// Create a new station
async function createStation(stationData) {
  try {
    const station = await Station.create(stationData);
    return station;
  } catch (error) {
    throw new Error('Error creating station: ' + error.message);
  }
}

// Get all stations
async function getAllStations() {
  try {
    const stations = await Station.findAll();
    return stations;
  } catch (error) {
    throw new Error('Error retrieving stations: ' + error.message);
  }
}

// Get a station by ID
async function getStationById(stationId) {
  try {
    const station = await Station.findByPk(stationId);
    if (!station) {
      throw new Error('Station not found');
    }
    return station;
  } catch (error) {
    throw new Error('Error retrieving station: ' + error.message);
  }
}

async function updateStation(stationId, stationData) {
  try {
    const station = await Station.findByPk(stationId);

    if (!station) {
      console.log('Station not found with ID:', stationId);
      return null;
    }

    const updatedStation = await station.update(stationData);
    console.log('Updated station:', updatedStation);
    return updatedStation;
  } catch (error) {
    console.error('Error updating station:', error);
    throw new Error('Error updating station: ' + error.message);
  }
}

// Delete a station
async function deleteStation(stationId) {
  try {
    // Find the station by its English name
    console.log("EOIEHOIEFIOHOHO");
    const station_english_name = stationId;
    const station = await Station.findOne({
        where: { station_english_name: station_english_name },
    });

    if (!station) {
      console.log(`Station with English name "${station_english_name}" not found.`);
      return;
  }

    const stationOnLine = await Lines_Station.findAll({
      where: {
        station_name: station_english_name,
      }
    });

    // Get the station's position
    for(const stations of stationOnLine) {
      const stationPosition = stations.position;
      const stationsToUpdate = await Lines_Station.findAll({
        where: {
            line_name: stations.line_name,
            position: { [Sequelize.Op.gt]: stationPosition }
        },
        order: [['position', 'ASC']]
    });
      y = stations.position;
      for (const stationToUpdate of stationsToUpdate) {
        await stationToUpdate.update({ position: y});
        y++;
      }
      stations.destroy();
    }

    // Delete the station
    await station.destroy();

    console.log('Station destroyed:', station.toJSON());
} catch (error) {
    console.error('Error deleting station:', error);
}
};


module.exports = {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation,
};