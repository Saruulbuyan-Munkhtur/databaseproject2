const Station = require('../models/stations');

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
    const station = await Station.findByPk(stationId);
    if (!station) {
      throw new Error('Station not found');
    }
    await station.destroy();
  } catch (error) {
    throw new Error('Error deleting station: ' + error.message);
  }
}

module.exports = {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation,
};