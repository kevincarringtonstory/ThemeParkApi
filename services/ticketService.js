const ticketRepository = require('../repositories/ticketRepository');
const { v4: uuidv4 } = require('uuid');

const purchaseTicket = async (ticketData) => {
  try {
    const ticketId = uuidv4();
    const newTicket = {
      ...ticketData,
      ticketId,
    };
    console.log('Creating ticket:', newTicket); // Add this line
    return await ticketRepository.createTicket(newTicket);
  } catch (error) {
    console.error('Error in purchaseTicket:', error); // Add this line
    throw error;
  }
};

const getUserTickets = async (userId) => {
  try {
    return await ticketRepository.getTicketsByUser(userId);
  } catch (error) {
    console.error('Error in getUserTickets:', error); // Add this line
    throw error;
  }
};

module.exports = {
  purchaseTicket,
  getUserTickets,
};
