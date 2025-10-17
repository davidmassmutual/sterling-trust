// backend/routes/transactions.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Transaction = require('../models/Transaction');
const verifyToken = require('../middleware/auth');

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get('/', verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', verifyToken, upload.single('receipt'), async (req, res) => {
  try {
    const { type, amount, method, status } = req.body;
    const transaction = new Transaction({
      userId: req.userId,
      type,
      amount,
      method,
      status: status || 'pending',
      date: new Date(),
      receipt: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save transaction' });
  }
});

module.exports = router;