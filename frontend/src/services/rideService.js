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
        console.log(StartStation);
        const response = await api.post('/rides', {ID, StartStation, StartTime, startLine, endLine});
        return response.data;
    } catch(error) {
        throw new Error('Failed to create ride');
    }
}

export const exitRideUsingCard = async (id, ID, EndStation, StartLine, EndTime, endLine) => {
  try {
    console.log(id);
    console.log(ID);
    console.log(EndStation);
    console.log(StartLine);
    const response = await api.put(`/rides/${id}`, { ID, EndStation, StartLine, EndTime, endLine });
    return response.data;
  } catch (error) {
    throw new Error('Failed to exit ride');
  }
}
