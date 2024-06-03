import api from './api';

export const getStationPopularity = async () => {
  try {
    const response = await api.get('/views/pop');
    console.log("RESPONSE OF POPULAR: ", response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch station popularity data');
  }
};

export const getAvgTravelTime = async () => {
  try {
    const response = await api.get('/views/avgTravel');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch average travel time data');
  }
};

export const getPeakHours = async () => {
  try {
    const response = await api.get('/views/peak');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch peak hours data');
  }
};

export const getStationToStationPopularity = async () => {
  try {
    const response = await api.get('/views/sts-pop');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch station-to-station popularity data');
  }
};