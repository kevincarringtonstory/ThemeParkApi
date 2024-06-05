
const ticketRepository = require('../repositories/ticketRepository');
const { v4: uuidv4 } = require('uuid');

const purchaseTicket = async (ticketData) => {
  const ticketId = uuidv4();
  const newTicket = {
    ...ticketData,
    ticketId,
  };
  return await ticketRepository.createTicket(newTicket);
};

const getUserTickets = async (userId) => {
  return await ticketRepository.getTicketsByUser(userId);
};

module.exports = {
  purchaseTicket,
  getUserTickets,
};
