const lineStationService = require('../services/line_stationServices');

exports.getAllLinesStations = async (req, res) => {
  try {
    const linesStations = await lineStationService.getAllLinesStations();
    res.json(linesStations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve lines stations' });
  }
};


exports.getLineStations = async (req, res) => {
  try {
    const { lineName } = req.params;
    const lineStations = await lineStationService.getLineStations(lineName);
    res.json(lineStations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLineStationById = async (req, res) => {
  try {
    const { lineName, stationName } = req.params;
    const lineStation = await lineStationService.getLineStationById(lineName, stationName);
    if (lineStation) {
      res.json(lineStation);
    } else {
      res.status(404).json({ error: 'Line station not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve line station' });
  }
};

exports.getLineByStation = async (req, res) => {
  try {
    const { stationName } = req.params;
    if (!stationName) {
      return res.status(400).json({ error: 'Station name is required' });
    }
    const lineStations = await lineStationService.getLineByStation(stationName);
    if (lineStations.length > 0) {
      res.json(lineStations);
    } else {
      res.status(404).json({ error: 'No line stations found for the given station name' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve line stations' });
  }
};
exports.createLineStation = async (req, res) => {
  try {
    const lineStationData = req.body;
    const createdLineStation = await lineStationService.createLineStation(lineStationData);
    res.status(201).json(createdLineStation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create line station' });
  }
};

exports.updateLineStation = async (req, res) => {
  try {
    const { lineName, stationName } = req.params;
    const updatedLineStationData = req.body;
    const updatedLineStation = await lineStationService.updateLineStation(lineName, stationName, updatedLineStationData);
    if (updatedLineStation) {
      res.json(updatedLineStation);
    } else {
      res.status(404).json({ error: 'Line station not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update line station' });
  }
};

exports.deleteLineStation = async (req, res) => {
  try {
    const { lineName, stationName } = req.body;
    await lineStationService.deleteLineStation(lineName, stationName);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete line station' });
  }
};