const rideSchema = require('../models/rideModel')
const Ride = require('../models/rideModel');

const getRides = async (query) => {
    console.log('In repository: ', query.thrill_level)
    let rides = null
    if (query.thrill_level != null) {
        console.log('Inside filter condition')
        try {
            rides = await rideSchema.find({ thrill_level: query.thrill_level, description: query.description });
        } catch (error) { console.log(error) }
    }
    else {
        rides = await rideSchema.find();
        console.log('Getting All')
    }
    console.log(rides)
    return rides
}

const createRide = async (req) => {
    const newRide = new rideSchema(req);
    const ride = await newRide.save();
    return ride
}

const deleteRideById = async (rideId) => {
    try {
        console.log(`Repository: Deleting ride with ID: ${rideId}`);
        const result = await Ride.findByIdAndDelete(rideId); // Correctly using Mongoose method
        return result;
    } catch (error) {
        console.error('Error in deleteRideById:', error);
        throw error;
    }
};

const updateRideById = async (rideId, rideData) => {
    try {
        console.log(`Repository: Updating ride with ID: ${rideId}`);
        const result = await Ride.findByIdAndUpdate(rideId, rideData, { new: true });
        return result;
    } catch (error) {
        console.error('Error in updateRideById:', error);
        throw error;
    }
};

module.exports = {
    getRides,
    createRide,
    deleteRideById,
    updateRideById
}