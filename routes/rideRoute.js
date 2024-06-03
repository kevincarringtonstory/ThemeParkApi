const express = require('express')
const router = express.Router()
const rideController = require('../controllers/rideController')
const { deleteRideHandler } = require('../controllers/rideController')
const { updateRideHandler } = require('../controllers/rideController')
const userService = require('../services/userService')

router.get('/', rideController.getAll)
router.post('/', [userService.verifyToken], rideController.createRide)
router.delete('/:id', deleteRideHandler)
router.put('/:id', updateRideHandler)

module.exports = router;