const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

/**
 * @route POST api/users
 * @description Register user
 * @access Public route doesn't require a token
 */
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check(
      'password',
      'Enter a password that has 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      //Gets gravatar for a user
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      //Salt the password then hash the salt and the plain text password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send('User registered Successfully');
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error!!');
    }
  }
);

module.exports = router;
