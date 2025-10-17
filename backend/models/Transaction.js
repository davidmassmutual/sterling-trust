// backend/models/Transaction.js
const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
  receipt: { type: String },
});
module.exports = mongoose.model('Transaction', transactionSchema);