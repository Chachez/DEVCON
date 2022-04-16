const express = require('express');
const router = express.Router();

/**
 * @route GET api/profile
 * @description Test route
 * @access Public route doesn't require a token
 */
router.get('/', (req, res) => res.send('Profile route active'));

module.exports = router;
