// backend/scripts/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  twoFactorEnabled: { type: Boolean, default: false },
  notifications: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: true },
  },
  currency: { type: String, default: 'USD' },
  theme: { type: String, default: 'light' },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    // Verify MONGO_URI
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env file');
    }

    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Check and drop username_1 index if it exists
    const indexes = await mongoose.connection.db.collection('users').indexes();
    const usernameIndex = indexes.find(index => index.name === 'username_1');
    if (usernameIndex) {
      console.log('Found username_1 index, dropping it...');
      await mongoose.connection.db.collection('users').dropIndex('username_1');
      console.log('Dropped username_1 index');
    }

    // Check for existing admin
    const email = 'sterlingtrustcontact@gmail.com';
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Admin user already exists:', email);
      await mongoose.connection.close();
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('sterling123', 10);
    const admin = new User({
      name: 'Admin User',
      email: email,
      password: hashedPassword,
      isAdmin: true,
      phone: '',
      address: '',
      twoFactorEnabled: false,
      notifications: { email: true, sms: false, push: true },
      currency: 'USD',
      theme: 'light',
      createdAt: new Date(),
    });
    await admin.save();
    console.log('Admin user created:', email);
    await mongoose.connection.close();
  } catch (err) {
    console.error('Error creating admin:', err.message);
    process.exit(1);
  }
}

createAdmin();