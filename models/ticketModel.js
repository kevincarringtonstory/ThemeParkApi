
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  validityPeriod: { type: String, required: true },
  ticketId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  purchaseDate: { type: Date, default: Date.now }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
