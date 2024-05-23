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

exports.getAllRidesP = async (req, res) => {
  try {
    const userRides = await rideService.getAllRidesP();
    res.json(userRides);
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

exports.registerRideUsingPassenger = async (req, res) => {
  try{
      const {ID, StartStation, StartTime} = req.body;
      const newRide = await rideService.registerRideUsingPassenger(ID, StartStation, StartTime);
      res.json(newRide);
  } catch (error) {
      console.error('Error making ride:', error);
      res.status(500).send('Failed to make ride');
    }
}

exports.exitRideUsingPassenger = async (req, res) => {
  try{
      const {ride_id} = req.params;
      console.log(ride_id)
      const {EndStation, EndTime} = req.body;
      const newRide = await rideService.exitRideUsingPassenger(ride_id, EndStation, EndTime);
      res.json(newRide);
  } catch (error) {
      console.error('Error making ride:', error);
      res.status(500).send('Failed to make ride');
    }
}