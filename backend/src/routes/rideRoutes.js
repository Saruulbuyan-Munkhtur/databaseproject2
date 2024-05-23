const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

router.get('/', rideController.getAllRides);
router.get('/get-all-rides-passenger', rideController.getAllRidesP);
router.post('/register-ride-using-card', rideController.registerRideUsingCard);
router.post('/register-ride-using-passenger', rideController.registerRideUsingPassenger);
router.put('/exit-using-card/:ride_id', rideController.exitRideUsingCard);
router.put('/exit-using-passenger/:ride_id', rideController.exitRideUsingPassenger);


module.exports = router;
