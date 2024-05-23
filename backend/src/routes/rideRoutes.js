const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

router.get('/', rideController.getAllRides);
router.post('/register-ride-using-card', rideController.registerRideUsingCard);
router.post('/register-ride-using-passenger', rideController.registerRideUsingPassenger);
router.put('/:ride_id', rideController.exitRideUsingCard);


module.exports = router;
