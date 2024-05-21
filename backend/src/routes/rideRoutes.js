const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

router.get('/', rideController.getAllRides);
router.post('/', rideController.registerRideUsingCard);

module.exports = router;
