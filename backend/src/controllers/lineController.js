const linesService = require('../services/lineService');

exports.getAllLines = async (req, res) => {
  try {
    const lines = await linesService.getAllLines();
    res.json(lines);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getLineByName = async (req, res) => {
  try {
    const { lineName } = req.params;
    const line = await linesService.getLineByName(lineName);
    if (line) {
      res.json(line);
    } else {
      res.status(404).json({ error: 'Line not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createLine = async (req, res) => {
  try {
    console.log("EOIFHWEOIFHOWI");
    const { lineName, intro, mileage, color, first_opening, url, start,end } = req.body;
    const createdLine = await linesService.createLine(lineName, intro, mileage, color, first_opening, url, start,end);
    res.status(201).json(createdLine);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateLine = async (req, res) => {
  try {
    const { lineName } = req.params;
    const updatedData = req.body;
    const updatedLine = await linesService.updateLine(lineName, updatedData);
    if (updatedLine) {
      res.json(updatedLine);
    } else {
      res.status(404).json({ error: 'Line not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteLine = async (req, res) => {
  try {
    const { lineName } = req.params;
    const deletedLine = await linesService.deleteLine(lineName);
    if (deletedLine) {
      res.json({ message: 'Line deleted successfully' });
    } else {
      res.status(404).json({ error: 'Line not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.findNthStation = async (req, res) => {
  try {
    const { lineName, stationNameInput, position } = req.body;
    console.log(stationNameInput);
    console.log(position);
    const stations = await linesService.findNthStation(lineName, stationNameInput, position);
    if (stations) {
      res.json(stations);
    } else {
      res.status(404).json({ error: 'Station not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteLineStation = async (req, res) => {
  try {
    const { lineName, stationName } = req.body;
    await linesService.deleteLineStation(lineName, stationName);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete line station' });
  }
};

