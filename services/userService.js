const userRepository = require('../repositories/userRepository');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const registerUser = async (userData) => {
  const { name, email, password } = userData;
  const existingUser = await userRepository.getUser(email);

  if (existingUser) {
    return { msg: 'User already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ email });

  if (!user) {
    return { msg: 'User does not exist' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { msg: 'Invalid password' };
  }

  const token = jsonwebtoken.sign({ id: user._id }, process.env.TOKEN_KEY, {
    expiresIn: '1h',
  });

  return token;
};

module.exports = {
  registerUser,
  loginUser,
};
