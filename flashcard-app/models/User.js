// models/User.js

const mongoose = require('mongoose');

// Define the User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Removes whitespace from both ends of a string
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no two users can share the same email
    lowercase: true, // Stores the email in all lowercase
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Enforce a minimum password length for basic security
  },
  date: {
    type: Date,
    default: Date.now // Records when the user was created
  }
});

// Create and export the User model
module.exports = mongoose.model('User', UserSchema);