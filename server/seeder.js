const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Your User model
require('dotenv').config();
// Connect to your MongoDB database
mongoose.connect(process.env.MONGODB_URL, {});

// Create a new admin user
const adminUser = new User({
  name: 'Admin',
  email: 'admin@gmail.com',
  password: 'admin@123',
  role: 'Admin',
  isActive: true,
  isAdmin: true,
  isEmailVerified: true,
});

async function seed() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(adminUser.password, salt);
  await User.deleteMany();
  adminUser.password = hash;
  // Save the admin user to the database
  await adminUser.save();
  console.log('Admin user created successfully');
  mongoose.disconnect();
}

seed();
