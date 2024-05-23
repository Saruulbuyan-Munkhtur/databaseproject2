import api from './api';

export const getShortestPath = async (startNodeName, endNodeName) => {
  try {
    const response = await api.get(`/graph/shortest-path?startNodeName=${startNodeName}&endNodeName=${endNodeName}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch shortest path');
  }
};

export const getAdjacencyList = async (stationName) => {
  try {
    const response = await api.get(`/graph/adjacency-list/${stationName}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch adjacency list');
  }
};

export const updateStationStatus = async (stationName, updatedStatus) => {
  try {
    await api.put(`/graph/update-status/${stationName}`, { updatedStatus });
  } catch (error) {
    throw new Error('Failed to update station status');
  }
};