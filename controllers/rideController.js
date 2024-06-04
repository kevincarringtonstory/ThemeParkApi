const rideService = require('../services/rideService');
const { deleteRide } = require('../services/rideService');
const { updateRide } = require('../services/rideService');
const jwt = require('jsonwebtoken');

const getAll = async (req, res) => {
  try {
    console.log('Query Parameters: ', req.query);
    const ride = await rideService.getAll(req.query);
    if (!ride) return res.status(404).send('Ride not found');
    res.json(ride);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createRide = async (req, res) => {
  try {
    const ride = await rideService.createRide(req.body);
    if (ride.msg) return res.status(400).send('Validation Failed');
    res.json(ride);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteRideHandler = async (req, res) => {
  try {
    const rideId = req.params.id;
    console.log(`Received request to delete ride with ID: ${rideId}`);
    const result = await deleteRide(rideId);
    if (result) {
      res.status(200).json({ msg: 'Ride deleted successfully' });
    } else {
      res.status(404).json({ msg: 'Ride not found' });
    }
  } catch (error) {
    console.error('Error in deleteRideHandler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateRideHandler = async (req, res) => {
  try {
    const rideId = req.params.id;
    const rideData = req.body;
    console.log(`Received request to update ride with ID: ${rideId}`);
    const result = await updateRide(rideId, rideData);
    if (result) {
      res.status(200).json({ msg: 'Ride updated successfully', data: result });
    } else {
      res.status(404).json({ msg: 'Ride not found' });
    }
  } catch (error) {
    console.error('Error in updateRideHandler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = {
  getAll,
  createRide,
  deleteRideHandler,
  updateRideHandler,
  verifyToken,
};
