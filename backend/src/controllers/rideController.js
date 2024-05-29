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
    console.log(userRides);
    res.json(userRides);
  } catch (error) {
    console.error('Error fetching rides:', error);
    res.status(500).send('Failed to fetch rides');
  }
};

exports.registerRideUsingCard = async (req, res) => {
    try{
        const {ID, StartStation, StartTime} = req.body;
        const newRide = await rideService.registerRideUsingCard(ID, StartStation, StartTime);
        res.json(newRide);
    } catch (error) {
        console.error('Error making ride:', error);
        res.status(500).send('Failed to make ride');
      }
}

exports.exitRideUsingCard = async (req, res) => {
  try{
      const {ride_id} = req.params;
      console.log(ride_id);
      const {ID, EndStation, EndTime} = req.body;
      const newRide = await rideService.exitRideUsingCard(ride_id, ID, EndStation, EndTime);
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

exports.nthParamSearch = async (req, res) => {
  try{
      const {startStation, endStation, minStartTime, maxStartTime, minEndTime, maxEndTime, minPrice, maxPrice, status} = req.body;
      console.log(minStartTime);
      console.log(maxStartTime);
      console.log(minEndTime);
      console.log(maxEndTime);
      const newRide = await rideService.nthParamSearch(startStation, endStation, minStartTime, maxStartTime, minEndTime, maxEndTime, minPrice, maxPrice, status);
      res.json(newRide);
  } catch (error) {
      console.error('Error making ride:', error);
      res.status(500).send('Failed to make ride');
    }
}

exports.reloadCard = async (req, res) => {
  try{
    const {Code} = req.params;
    const {amount} = req.body;
    const topup = await rideService.reloadCard(Code, amount);
    res.json(topup) 
  } catch (error) {
    console.error('Error Toping up:', error);
    res.status(500).send('Failed to make ride');
  }
}