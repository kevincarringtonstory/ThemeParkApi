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

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/themepark';
mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));
