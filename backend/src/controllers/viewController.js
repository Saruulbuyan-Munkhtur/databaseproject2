const {AvgTravelTime, StationPopularity, PeakHours, StationToStationPopularity} = require('../models/views');

exports.getPeakHours = async (req, res) => {
    try {
        
        const peakHours = await PeakHours.findAll();

        res.json(peakHours);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAvgTravelTimes = async (req, res) => {
    try {
        const avgTravelTimes = await AvgTravelTime.findAll();
        res.json(avgTravelTimes);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getStationPopularity = async (req, res) => {
    try {
        const stationPopularity = await StationPopularity.findAll();
        res.json(stationPopularity);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getStationToStationPopularity = async (req, res) => {
    try {
      const popularityData = await StationToStationPopularity.findAll();
      res.json(popularityData);
    } catch (error) {
      console.error('Error fetching station-to-station popularity data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };