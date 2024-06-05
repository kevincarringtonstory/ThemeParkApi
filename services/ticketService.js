const ticketRepository = require('../repositories/ticketRepository');
const { v4: uuidv4 } = require('uuid');

const purchaseTicket = async (ticketData) => {
  try {
    const ticketId = uuidv4(); // Generate a unique ticket ID
    const newTicket = {
      ...ticketData,
      ticketId, // Add the generated ticket ID to the ticket data
    };
    console.log('Creating ticket:', newTicket); // Debugging log
    return await ticketRepository.createTicket(newTicket); // Save the ticket to the database
  } catch (error) {
    console.error('Error in purchaseTicket:', error); // Debugging log
    throw error;
  }
};

const getUserTickets = async (userId) => {
  try {
    return await ticketRepository.getTicketsByUser(userId); // Retrieve tickets for the given user ID
  } catch (error) {
    console.error('Error in getUserTickets:', error); // Debugging log
    throw error;
  }
};

module.exports = {
  purchaseTicket,
  getUserTickets,
};
