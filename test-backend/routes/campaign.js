const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const auth = require('../middleware/auth'); // Import our auth middleware

// @route   POST api/campaigns
// @desc    Create a new feedback campaign
// @access  Private (requires admin login)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, targetDepartment, targetYear, questions, deadline } = req.body;

    // The `req.user.instituteId` comes from the decoded JWT in our auth middleware
    const createdBy = req.user.instituteId;

    const newCampaign = new Campaign({
      title,
      description,
      targetDepartment,
      targetYear,
      questions,
      deadline,
      createdBy,
      status: 'draft' // Default status
    });

    const campaign = await newCampaign.save();
    res.status(201).json(campaign);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    // req.user.instituteId is available because of our auth middleware
    // We find all campaigns where 'createdBy' matches the logged-in user's institute ID
    const campaigns = await Campaign.find({ createdBy: req.user.instituteId })
                                    .sort({ createdAt: -1 }); // Sort by newest first

    res.json(campaigns);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
