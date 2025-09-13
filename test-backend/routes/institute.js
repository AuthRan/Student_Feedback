const express = require('express');
const router = express.Router();
const Institute = require('../models/Institute');

router.post('/register', async (req, res) => {
  try {
    const inst = new Institute(req.body);
    await inst.save();
    res.status(201).json({ message: 'Institute registered successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
