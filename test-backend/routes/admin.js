const express = require('express');
const jwt = require('jsonwebtoken');
const Institute = require('../models/Institute');

const router = express.Router();
const JWT_SECRET = 'SuperSecretStringDontShare'; // use ENV in production!

router.post('/login', async (req, res) => {
  const { adminEmail, password } = req.body;
  const inst = await Institute.findOne({ adminEmail });
  if (!inst) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const isMatch = await inst.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  // create token
  const token = jwt.sign(
    { instituteId: inst._id, adminEmail: inst.adminEmail },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({ token, adminEmail: inst.adminEmail, instituteId: inst._id });
});

module.exports = router;
