const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.get('/peak', viewController.getPeakHours);
router.get('/pop', viewController.getStationPopularity);
router.get('/avgTravel', viewController.getAvgTravelTimes);
router.get('/sts-pop', viewController.getStationToStationPopularity);


module.exports = router;