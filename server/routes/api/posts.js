const express = require('express');
const router = express.Router();

/**
 * @route GET api/posts
 * @description Test route
 * @access Public route doesn't require a token
 */
router.get('/', (req, res) => res.send('Posts route active'));

module.exports = router;
