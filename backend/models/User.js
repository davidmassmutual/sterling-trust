// sterling-trust-backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accounts: {
    checking: { balance: { type: Number, default: 0 } },
    savings: { balance: { type: Number, default: 0 } },
  },
  transactions: [{
    date: { type: Date, default: Date.now },
    description: String,
    amount: Number,
    type: { type: String, enum: ['credit', 'debit'] },
    status: { type: String, default: 'Posted' },
  }],
  lastLogin: { type: Date },
  twoFactorEnabled: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);