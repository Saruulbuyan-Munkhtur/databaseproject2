const CardID_Rides = require('../models/cardid_rides');
const rideService = require('../services/rideService');

exports.getAllRides = async (req, res) => {
  try {
    const cardRides = await rideService.getAllRides();
    res.json(cardRides);
  } catch (error) {
    console.error('Error fetching rides:', error);
    res.status(500).send('Failed to fetch rides');
  }
};