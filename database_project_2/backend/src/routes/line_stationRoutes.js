const express = require("express");
const lineStationController = require("../controllers/line_stationController");

const router = express.Router();

router.get("/", lineStationController.getAllLinesStations);
// router.get('/:lineName/:stationName', lineStationController.getLineStationById);
router.post("/", lineStationController.createLineStation);
router.put("/:lineName/:stationName", lineStationController.updateLineStation);
router.post("/delete-from-station", lineStationController.deleteLineStation);
router.get("/:lineName", lineStationController.getLineStations);
router.get("/station/:stationName", lineStationController.getLineByStation);
module.exports = router;
