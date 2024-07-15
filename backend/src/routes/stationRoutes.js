const express = require("express");
const router = express.Router();
const stationController = require("../controllers/stationController");

router.post("/", stationController.createStation);
router.post("/cr", stationController.createStation2);
router.get("/", stationController.getAllStations);
router.get("/:id", stationController.getStationById);
router.put("/:id", stationController.updateStation);
router.delete("/:id", stationController.deleteStation);
module.exports = router;
