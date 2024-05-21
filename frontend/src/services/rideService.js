import api from './api';

export const getAllRides = async () => {
  try {
    const response = await api.get('/rides');
    return response.data;
  } catch (error) {
    console.error('Error fetching rides:', error);
    throw new Error('Failed to fetch rides');
  }
};

export const registerRideUsingCard = async (ID, StartStation, StartTime, startLine, endLine) => {
    try{
        const response = await api.post('/rides', {ID, StartStation, StartTime, startLine, endLine});
        return response.data;
    } catch(error) {
        throw new Error('Failed to create ride');
    }
}