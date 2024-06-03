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
    console.log("id: ", id);
    const response = await api.get(`/stations/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch station details');
  }
};

export const createStation = async (lineName, station_english_name, district, intro, chinese_name, position, status) => {
  try {
    console.log("station name: ",station_english_name);
    const response = await api.post('/stations', {lineName, station_english_name, district, intro, chinese_name, position, status});
    return response.data;
  } catch (error) {
    throw new Error('Failed to create station');
  }
};

export const updateStation = async (lineName, station_english_name, district, intro, chinese_name, position, status) => {
  try {
    console.log("ID: ", station_english_name);
    const response = await api.put(`/stations/${station_english_name}`, {lineName, station_english_name, district, intro, chinese_name, position, status });
    return response.data;
  } catch (error) {
    console.error('Error updating station:', error);
    console.error('Error response:', error.response);
    throw new Error('Failed to update station');
  }
};

export const deleteStation = async (id) => {
  try {
    console.log("id: ", id )
    const response = await api.delete(`/stations/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete station');
  }
};

