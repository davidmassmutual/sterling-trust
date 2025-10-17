// backend/models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, // e.g., 'deposit', 'withdrawal'
  amount: { type: Number, required: true },
  method: { type: String, required: true }, // e.g., 'bank', 'crypto'
  status: { type: String, default: 'pending' },
  date: { type: Date, default: Date.now },
  receipt: { type: String }, // File path for proof
});

module.exports = mongoose.model('Transaction', transactionSchema);