const ticketService = require('../services/ticketService');

const purchaseTicket = async (req, res) => {
  try {
    console.log('Purchase request body:', req.body); // Add this line
    const ticket = await ticketService.purchaseTicket({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error in purchaseTicket controller:', error); // Add this line
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserTickets = async (req, res) => {
  try {
    const tickets = await ticketService.getUserTickets(req.user.id);
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error in getUserTickets controller:', error); // Add this line
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  purchaseTicket,
  getUserTickets,
};
