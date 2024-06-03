const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    thrill_level: { type: String, required: true },
    height_restrictions: { type: String, required: true },
    current_wait_time: { type: Number, required: true },
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
