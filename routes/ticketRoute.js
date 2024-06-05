
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { verifyToken } = require('../services/userService');

router.post('/purchase', verifyToken, ticketController.purchaseTicket);
router.get('/mytickets', verifyToken, ticketController.getUserTickets);

module.exports = router;
