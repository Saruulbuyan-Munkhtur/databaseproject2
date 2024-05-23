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
    await graphService.getAdjacencyList(stationName);
    res.sendStatus(200);
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