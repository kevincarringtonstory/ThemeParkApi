
const Ticket = require('../models/ticketModel');

const createTicket = async (ticketData) => {
  const newTicket = new Ticket(ticketData);
  return await newTicket.save();
};

const getTicketsByUser = async (userId) => {
  return await Ticket.find({ userId });
};

module.exports = {
  createTicket,
  getTicketsByUser,
};
