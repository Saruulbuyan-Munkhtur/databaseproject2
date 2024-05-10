const express = require('express');
const router = express.Router();
const linesController = require('../controllers/lineController');

router.get('/', linesController.getAllLines);
router.get('/:lineName', linesController.getLineByName);
router.post('/', linesController.createLine);
router.put('/:lineName', linesController.updateLine);
router.delete('/:lineName', linesController.deleteLine);

module.exports = router;