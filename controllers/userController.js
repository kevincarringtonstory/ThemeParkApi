const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    if (user.msg) return res.status(400).send('Validation Failed');
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const signin = async (req, res) => {
  try {
    const userExists = await userService.checkUser(req.body);
    if (userExists.msg) return res.status(400).send('Validation Failed');
    if (userExists) {
      res.json({
        token: userExists,
      });
    } else {
      res.json({
        message: 'User does not exist',
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const register = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const token = await userService.loginUser(req.body);
    if (token.msg) {
      return res.status(400).json(token);
    }
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createUser, signin, register, login };
