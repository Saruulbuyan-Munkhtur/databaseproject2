import api from './api';

export const getLines = async () => {
	try {
	  const response = await api.get('/line');
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
    const response = await api.get(`/line/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch line details');
  }
};

export const createLine = async (lineName, intro, mileage, color, first_opening, url, start,end) => {
  try {
    const response = await api.post('/line', {lineName, intro, mileage, color, first_opening, url, start,end});
    return response.data;
  } catch (error) {
    throw new Error('Failed to create line');
  }
};

export const updateline = async (id, lineData) => {
  try {
    const response = await api.put(`/line/${id}`, lineData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update line');
  }
};

export const deleteline = async (id) => {
  try {
    console.log("LINENAME: ", id);
    const response = await api.delete(`/line/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete line');
  }
};


export const findNthStation = async (lineName, stationNameInput, position) => {
  try {
    console.log(lineName);
    console.log(stationNameInput);
    console.log(position);
    const response = await api.post(`/line/find-nth-position`, {lineName, stationNameInput, position});
    return response.data;
  } catch (error) {
    throw new Error('Failed to get stations');
  }
};

export const deleteLineStation = async (lineName, stationName) => {
  try {
    const response = await api.post(`/line/delete-from-station`, {lineName, stationName});
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete line station');
  }
};

