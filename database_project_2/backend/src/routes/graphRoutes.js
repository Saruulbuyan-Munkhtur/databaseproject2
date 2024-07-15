const express = require('express');
const router = express.Router();
const graphController = require('../controllers/graphController');

router.get('/shortest-path', graphController.getShortestPath);
router.get('/adjacency-list/:stationName', graphController.getAdjacencyList);
router.get('/get-buses', graphController.getBusesAtStations);
router.put('/update-status/:stationName', graphController.updateStationStatus);
router.get('/shortest-path-bus', graphController.getShortestPathWithBus);

module.exports = router;