const CardID_Rides = require('../models/cardid_rides');

exports.getAllRides = async () => {
  try {
    const cardRides = await CardID_Rides.findAll();
    return cardRides;
  } catch (error) {
    throw new Error('Failed to fetch rides');
  }
};