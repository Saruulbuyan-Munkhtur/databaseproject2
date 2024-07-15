const { shortestPath, printAdjacencyList, modifyStatus, getAdjacencyList, shortestPathWithBus } = require('../../Graph');
const Station_Buses = require('../models/station_buses.js');
const Sequelize = require('sequelize');
const sequelize = require('../config/database.js')


exports.getShortestPath = async (startNodeName, endNodeName) => {
  try {
    const path = await shortestPath(startNodeName, endNodeName);
    return path;
  } catch (error) {
    throw new Error('Failed to find shortest path');
  }
};


exports.getShortestPathWithBus = async (startNodeName, endNodeName) => {
  try {
    const path = await shortestPathWithBus(startNodeName, endNodeName);
    return path;
  } catch (error) {
    throw new Error('Failed to find shortest path');
  }
};

exports.getAdjacencyList = async (stationName) => {
  try {
    const adjacencyList = getAdjacencyList(stationName);
    return adjacencyList;
  } catch (error) {
    throw new Error('Failed to get adjacency list');
  }
};

exports.updateStationStatus = async (stationName, updatedStatus) => {
  try {
    await modifyStatus(stationName, updatedStatus);
  } catch (error) {
    throw new Error('Failed to update station status');
  }
};

exports.getBusesAtStations = async (station1, station2) => {
  try {

    const query = `
      SELECT DISTINCT t1.entrance,  t1.bus_info
      FROM station_buses AS t1
      JOIN station_buses AS t2 ON t1.bus_info = t2.bus_info
      WHERE t1.station_name = :station1 AND t2.station_name = :station2;
    `;

    const buses = await sequelize.query(query, {
      replacements: { station1, station2 },
      type: Sequelize.QueryTypes.SELECT,
    });

    console.log('Buses:', buses);
    return buses;
  } catch (error) {
    console.error('Error fetching buses:', error);
    return null;
  }
};