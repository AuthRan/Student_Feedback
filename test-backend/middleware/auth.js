const jwt = require('jsonwebtoken');
const JWT_SECRET = 'SuperSecretStringDontShare'; // Use the same secret as in your login route

const auth = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // The header format is "Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'Token format is invalid, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add the user (institute ID) from the payload to the request object
    req.user = decoded; 
    next(); // Proceed to the next middleware or the route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
