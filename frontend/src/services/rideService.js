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

export const getAllRidesP = async () => {
  try {
    const response = await api.get('/rides/get-all-rides-passenger');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching rides:', error);
    throw new Error('Failed to fetch rides');
  }
};

export const registerRideUsingCard = async (ID, StartStation, StartTime) => {
    try{
        console.log(StartStation);
        const response = await api.post('/rides/register-ride-using-card', { ID, StartStation, StartTime});
        return response.data;
    } catch(error) {
        throw new Error('Failed to create ride');
    }
}

export const exitRideUsingCard = async (id, ID, EndStation, EndTime) => {
  try {
    const response = await api.put(`/rides/exit-using-card/${id}`, { ID, EndStation, EndTime });
    return response.data;
  } catch (error) {
    throw new Error('Failed to exit ride');
  }
}

export const registerRideUsingPassenger = async (ID, StartStation, StartTime) => {
  try{
    const response = await api.post('/rides/register-ride-using-passenger', { ID, StartStation, StartTime });
      return response.data;
  } catch(error) {
      throw new Error('Failed to create ride');
  }
}

export const exitRideUsingPassenger = async (id, EndStation, EndTime) => {
  try {
    console.log(id);
    const response = await api.put(`/rides/exit-using-passenger/${id}`, { EndStation, EndTime });
    return response.data;
  } catch (error) {
    throw new Error('Failed to exit ride');
  }
}


export const nthParamSearch = async (startStation, endStation, minStartTime, maxStartTime, minEndTime, maxEndTime, minPrice, maxPrice, status ) => {
  try {
    console.log(minStartTime);
    const response = await api.post('/rides/nth-param-search', { startStation, endStation, minStartTime, maxStartTime, minEndTime, maxEndTime, minPrice, maxPrice, status });
    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve rides');
  }
}

export const reloadCard = async (Code, amount) => {
  try{
    const response = await api.put(`/rides/reload-card/${Code}`, {amount});
    return response.data;
  } catch (error) {
    throw new Error('Failed to reload card');
  }

}
