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

exports.registerRideUsingCard = async (req, res) => {
    try{
        const {ID, StartStation, StartTime, startLine, endLine} = req.body;
        console.log(StartStation);
        const newRide = await rideService.registerRideUsingCard(ID, StartStation, StartTime, startLine, endLine);
        res.json(newRide);
    } catch (error) {
        console.error('Error making ride:', error);
        res.status(500).send('Failed to make ride');
      }
}

exports.exitRideUsingCard = async (req, res) => {
  try{
      const {id} = req.params;
      const {ID, EndStation, StartLine, EndTime, endLine} = req.body;
      console.log(StartLine)
      console.log(endLine)
      console.log(EndTime)
      const newRide = await rideService.exitRideUsingCard(id, ID, EndStation, StartLine, EndTime, endLine);
      res.json(newRide);
  } catch (error) {
      console.error('Error making ride:', error);
      res.status(500).send('Failed to make ride');
    }
}