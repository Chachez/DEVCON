const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

/**
 * @route GET api/profile/me
 * @description Get current users profile
 * @access Private
 */
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );
    if (!profile) {
      return res.status(400).json({ msg: 'User profile not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route POST api/profile/
 * @description Create/update user profile
 * @access Private
 */

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubUsername,
      skills,
      youTube,
      facebook,
      twitter,
      instagram,
      linkedIn,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubUsername) profileFields.githubUsername = githubUsername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    //Build social apps
    profileFields.social = {};
    if (youTube) profileFields.social.youTube = youTube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedIn) profileFields.social.linkedIn = linkedIn;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update if a profile exists
        profile = await Profile.findOneAndUpdate(
          {
            user: req.user.id,
          },
          { $set: profileFields },
          {
            new: true,
          }
        );
        // return res.json(profile);
        return res.json(profile);
      } else {
        //Create if it does not exist
        profile = new Profile(profileFields);
        await profile.save();
        return res.json(profile);
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route GET api/profile
 * @description Get all profiles
 * @access Public
 */

router.get('/', auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route GET api/profile/user/user_id
 * @description Get all a specific profile by user ID
 * @access Public
 */

router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route DELETE api/profile
 * @description Delete a profile,user & post
 * @access Private
 */

router.delete('/', auth, async (req, res) => {
  try {
    /**
     * Removes profile and user
     * @todo - Remove users and posts
     */
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    return res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route PUT api/profile/experience
 * @description Add profile experience
 * @access Private
 */

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'Starting date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExperience);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
