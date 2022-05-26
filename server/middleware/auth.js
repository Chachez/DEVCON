const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Access the token sent
  const token = req.header('x-auth-token');

  // Check if token is present
  if (!token) {
    return res.status(401).json({ msg: 'Authorization denied!' });
  }
  //   Verify if token is valid
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is invalid!' });
  }
};
