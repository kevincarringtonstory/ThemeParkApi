const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/userModel');

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({
      message: 'No Token Provided',
    });
  }

  jsonwebtoken.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: 'Unauthorized',
      });
    }

    try {
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      req.user = { id: user._id, isAdmin: user.isAdmin };
      console.log('User verified:', req.user); // Logging the user object
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error fetching user information.' });
    }
  });
};

module.exports = verifyToken;
