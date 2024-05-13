import api from './api';

export const getLines = async () => {
	try {
	  const response = await api.get('/lines');
	  console.log('Response:', response);
	  console.log('Response Data:', response.data);
	  return response.data;
	} catch (error) {
	  console.error('Error:', error);
	  throw new Error('Failed to fetch lines');
	}
      };

export const getLineById = async (id) => {
  try {
    const response = await api.get(`/lines/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch line details');
  }
};

export const createLine = async (lineData) => {
  try {
    const response = await api.post('/lines', lineData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create line');
  }
};

export const updateline = async (id, lineData) => {
  try {
    const response = await api.put(`/lines/${id}`, lineData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update line');
  }
};

export const deleteline = async (id) => {
  try {
    const response = await api.delete(`/lines/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete line');
  }
};

