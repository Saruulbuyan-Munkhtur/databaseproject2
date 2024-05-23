const { buildGraph, shortestPath, printAdjacencyList, modifyStatus } = require('../../Graph');

exports.getShortestPath = async (startNodeName, endNodeName) => {
  try {
    const path = await shortestPath(startNodeName, endNodeName);
    return path;
  } catch (error) {
    throw new Error('Failed to find shortest path');
  }
};

exports.getAdjacencyList = async (stationName) => {
  try {
    await printAdjacencyList(stationName);
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