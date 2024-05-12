import api from './api';

export const getStations = async () => {
  try {
    const response = await api.get('/stations');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch stations');
  }
};

export const getStationById = async (id) => {
  try {
    const response = await api.get(`/stations/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch station details');
  }
};

export const createStation = async (stationData) => {
  try {
    const response = await api.post('/stations', stationData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create station');
  }
};

export const updateStation = async (id, stationData) => {
  try {
    const response = await api.put(`/stations/${id}`, stationData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update station');
  }
};

export const deleteStation = async (id) => {
  try {
    const response = await api.delete(`/stations/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete station');
  }
};

