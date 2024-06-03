const graphService = require('../services/graphService');

exports.getShortestPath = async (req, res) => {
  try {
    const { startNodeName, endNodeName } = req.query;
    const path = await graphService.getShortestPath(startNodeName, endNodeName);
    res.json(path);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdjacencyList = async (req, res) => {
  try {
    const { stationName } = req.params;
    const adjacencyList = await graphService.getAdjacencyList(stationName);
    res.status(200).json(adjacencyList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStationStatus = async (req, res) => {
  try {
    const { stationName } = req.params;
    const { updatedStatus } = req.body;
    await graphService.updateStationStatus(stationName, updatedStatus);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBusesAtStations = async (req, res) => {
  try {
    const { station1, station2 } = req.query;
    const path = await graphService.getBusesAtStations(station1, station2);
    console.log(path)
    res.json(path);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};