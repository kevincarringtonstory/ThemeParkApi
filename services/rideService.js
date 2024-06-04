const rideRepository = require('../repositories/rideRepository');
const { deleteRideById } = require('../repositories/rideRepository');
const { updateRideById } = require('../repositories/rideRepository');

const getAll = async (query) => {
  console.log('in service');
  const rides = await rideRepository.getRides(query);
  console.log(rides);
  return rides;
};

const createRide = async (req) => {
  const {
    name,
    description,
    thrill_level,
    height_restrictions,
    current_wait_time,
  } = req;
  if (
    name == null ||
    description == null ||
    thrill_level == null ||
    height_restrictions == null ||
    current_wait_time == null
  ) {
    return { msg: 'Please include all required fields' };
  }
  return await rideRepository.createRide(req);
};

const deleteRide = async (rideId) => {
  try {
    console.log(`Service: Deleting ride with ID: ${rideId}`);
    const result = await deleteRideById(rideId);
    return result;
  } catch (error) {
    console.error('Error in deleteRide:', error);
    throw error;
  }
};

const updateRide = async (rideId, rideData) => {
  try {
    console.log(`Service: Updating ride with ID: ${rideId}`);
    const result = await updateRideById(rideId, rideData);
    return result;
  } catch (error) {
    console.error('Error in updateRide:', error);
    throw error;
  }
};

module.exports = { getAll, createRide, deleteRide, updateRide };
