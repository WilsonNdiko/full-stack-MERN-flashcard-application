// middleware/auth.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables (needed to access JWT_SECRET)
dotenv.config();

module.exports = function(req, res, next) {
  // 1. Get token from header
  const token = req.header('x-auth-token');

  // 2. Check if no token is present
  if (!token) {
    // 401 Unauthorized status
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // 3. Verify token
  try {
    // jwt.verify takes the token and the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If verification succeeds, the decoded payload (user id) is attached to the request
    req.user = decoded.user;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // This runs if the token is invalid (e.g., expired or tampered with)
    res.status(401).json({ msg: 'Token is not valid' });
  }
};