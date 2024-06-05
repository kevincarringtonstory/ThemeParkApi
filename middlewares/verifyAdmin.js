const User = require('../models/userModel');

const verifyAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      console.log('No user ID found in request');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isAdmin) {
      console.log('User is admin:', user);
      next();
    } else {
      console.log('User is not an admin');
      res.status(403).json({ message: 'Access denied. Wizards only fool.' });
    }
  } catch (error) {
    console.error('Error verifying admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = verifyAdmin;
