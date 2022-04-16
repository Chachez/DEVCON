const express = require('express');
const router = express.Router();

/**
 * @route GET api/auth
 * @description Test route
 * @access Public route doesn't require a token
 */
router.get('/', (req, res) => res.send('Auth route active'));

module.exports = router;
