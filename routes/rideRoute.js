const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');
const { deleteRideHandler } = require('../controllers/rideController');
const { updateRideHandler } = require('../controllers/rideController');
const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', rideController.getAll); //testing verifyAdmin
router.post('/', [verifyToken, verifyAdmin], rideController.createRide);
router.delete('/:id', [verifyToken, verifyAdmin], deleteRideHandler);
router.put('/:id', [verifyToken, verifyAdmin], updateRideHandler);

module.exports = router;
