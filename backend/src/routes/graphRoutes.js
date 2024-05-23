const express = require('express');
const router = express.Router();
const graphController = require('../controllers/graphController');

router.get('/shortest-path', graphController.getShortestPath);
router.get('/adjacency-list/:stationName', graphController.getAdjacencyList);
router.put('/update-status/:stationName', graphController.updateStationStatus);

module.exports = router;