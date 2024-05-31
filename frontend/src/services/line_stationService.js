import api from './api';

export const getLineStations = async (lineId) => {
  try {
    const response = await api.get(`/lines?lineId=${lineId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch line stations');
  }
};

export const getLineByStation = async (stationName) => {
	try {
		console.log("frontend stationName: ", stationName);
		const response = await api.get(`/lines/station/${stationName}`);
		return response.data;
	      } catch (error) {
		throw new Error('Failed to fetch line stations');
	}
}

export const getLine = async (lineName) => {
	try {
	  console.log("getLine: ", lineName);
	  const encodedLineName = encodeURIComponent(lineName);
	  const response = await api.get(`/lines/${lineName}`);
	  console.log("response", response);
	  return response.data;
	} catch (error) {
	  throw new Error('Failed to fetch line stations');
	}
      };

export const createLineStation = async (lineStationData) => {
  try {
    const response = await api.post('/line_stations', lineStationData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create line station');
  }
};

export const updateLineStation = async (id, lineStationData) => {
  try {
    const response = await api.put(`/line_stations/${id}`, lineStationData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update line station');
  }
};

export const deleteLineStation = async (lineName, stationName) => {
  try {
    const response = await api.post(`/line_stations/delete-from-station`, lineName, stationName);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete line station');
  }
};