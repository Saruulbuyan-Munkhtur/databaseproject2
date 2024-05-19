const stationService = require('../services/stationService');

exports.createStation = async (req, res) => {
  try {
    const { station_english_name, district, intro, chinese_name } = req.body;
    const newStation = await stationService.createStation(station_english_name, district, intro, chinese_name);
    res.status(201).json(newStation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create station' });
  }
};

exports.getAllStations = async (req, res) => {
  try {
    const stations = await stationService.getAllStations();
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve stations' });
  }
};

exports.getStationById = async (req, res) => {
  try {
    console.log(req);
    const { id } = req.params;
    const station = await stationService.getStationById(id);
    if (station) {
      res.status(200).json(station);
    } else {
      res.status(404).json({ error: 'Station not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve station' });
  }
};

// exports.updateStation = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { district, intro, chinese_name } = req.body;
//     const updatedStation = await stationService.updateStation(id, district, intro, chinese_name);
//     if (updatedStation) {
//       res.status(200).json(updatedStation);
//     } else {
//       res.status(404).json({ error: 'Station not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update station' });
//   }
// };

exports.updateStation = async (req, res) => {
  try {
    const { id } = req.params;
    const { district, intro, chinese_name } = req.body;

    const updatedStation = await stationService.updateStation(id, { district, intro, chinese_name });

    if (!updatedStation) {
      return res.status(404).json({ error: 'Station not found' });
    }

    res.json(updatedStation);
  } catch (error) {
    console.error('Error updating station:', error);
    res.status(500).json({ error: 'Failed to update station' });
  }
};

exports.deleteStation = async (req, res) => {
  try {
    const { id } = req.params;
    await stationService.deleteStation(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete station' });
  }
};