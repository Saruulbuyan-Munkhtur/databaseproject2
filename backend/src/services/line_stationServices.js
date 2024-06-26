const Lines_Station = require('../models/lines_station');

exports.getAllLinesStations = async () => {
  try {
    const linesStations = await Lines_Station.findAll();
    return linesStations;
  } catch (error) {
    throw new Error('Failed to retrieve lines stations');
  }
};


exports.getLineStations = async (lineName) => {
	try {
	  const lineStations = await Lines_Station.findAll({ where: { line_name: lineName } });
	  return lineStations;
	} catch (error) {
	  throw new Error('Failed to retrieve stations for the line');
	}
      };

exports.getLineStationById = async (lineName, stationName) => {
  try {
    const lineStation = await Lines_Station.findOne({ where: { line_name: lineName, station_name: stationName } });
    return lineStation;
  } catch (error) {
    throw new Error('Failed to retrieve line station');
  }
};

exports.getLineByStation = async (stationName) => {
  try {
    const lineStations = await Lines_Station.findAll({
      where: { station_name: stationName }
    });
    return lineStations;
  } catch (error) {
    console.error('Error retrieving line stations from the database:', error);
    throw new Error('Failed to retrieve line stations');
  }
};

exports.createLineStation = async (lineStationData) => {
  try {
    const createdLineStation = await Lines_Station.create(lineStationData);
    return createdLineStation;
  } catch (error) {
    throw new Error('Failed to create line station');
  }
};

exports.updateLineStation = async (lineName, stationName, updatedLineStationData) => {
  try {
    const [updatedRows] = await Lines_Station.update(updatedLineStationData, {
      where: { line_name: lineName, station_name: stationName },
    });
    if (updatedRows === 0) {
      return null;
    }
    const updatedLineStation = await Lines_Station.findOne({ where: { line_name: lineName, station_name: stationName } });
    return updatedLineStation;
  } catch (error) {
    throw new Error('Failed to update line station');
  }
};

exports.deleteLineStation = async (lineName, stationName) => {
  try {
    await Lines_Station.destroy({ where: { line_name: lineName, station_name: stationName } });
  } catch (error) {
    throw new Error('Failed to delete line station');
  }
};