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
