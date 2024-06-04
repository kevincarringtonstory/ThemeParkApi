const controller = require('../controllers/userController');
const express = require('express');
const router = express.Router();
router.post('/', controller.createUser);
router.post('/signin', controller.signin);
router.post('/register', controller.register);
router.post('/login', controller.login);

module.exports = router;
