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


// Add this new route to the bottom of the file

// @route   GET api/campaigns/:id
// @desc    Get a single feedback campaign by its ID (Public Route)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ msg: 'Feedback form not found' });
    }
    
    // We only send the necessary data to the student
    res.json({
        _id: campaign._id,
        title: campaign.title,
        description: campaign.description,
        questions: campaign.questions
    });

  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Feedback form not found' });
    }
    res.status(500).send('Server Error');
  }
});

// module.exports = router; // This line should already be at the end

module.exports = router;
