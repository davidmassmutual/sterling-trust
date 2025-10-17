const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors({
  origin: 'https://sterling-trust.onrender.com',
  credentials: true,
}));
app.use(express.json());

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  method: String,
  status: String,
  timestamp: Date,
  proof: String,
});
const Transaction = mongoose.model('Transaction', transactionSchema);

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Transactions Endpoint
app.post('/api/transactions', authenticate, upload.single('proof'), async (req, res) => {
  try {
    const { amount, method, status, timestamp } = req.body;
    const transaction = new Transaction({
      userId: req.userId,
      amount,
      method,
      status,
      timestamp,
      proof: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save transaction' });
  }
});

app.get('/api/transactions', authenticate, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
});

// Other endpoints (e.g., /api/auth, /api/user) remain unchanged

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));