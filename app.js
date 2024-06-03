const express = require('express');
const app = express();
require('dotenv').config();
const rideRoute = require('./routes/rideRoute');
const userRoute = require('./routes/userRoute');
const mongoose = require('mongoose');





// Middleware
app.use(express.json());
app.use('/rides', rideRoute);
app.use('/users', userRoute);




const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/themepark')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));