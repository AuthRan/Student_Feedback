const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Institute = require('../models/Institute');
const auth = require('../middleware/auth');
const Campaign = require('../models/Campaign');

const JWT_SECRET = 'SuperSecretStringDontShare'; // Use the same secret as your admin login


// @route   GET api/students/institutes
// @desc    Get all institutes (for dropdown during registration)
// @access  Public
router.get('/institutes', async (req, res) => {
  try {
    // Fetch only _id and instituteName from the database
    const institutes = await Institute.find({}, '_id instituteName');
    res.json(institutes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   POST api/students/register
// @desc    Register a new student
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, rollNumber, password, institute, department, year, section } = req.body;

    // Check if student already exists
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ msg: 'Student with this email already exists' });
    }

    // Check if institute exists
    const instituteExists = await Institute.findById(institute);
    if (!instituteExists) {
      return res.status(400).json({ msg: 'Invalid institute selected' });
    }

    // Create new student
    student = new Student({
      name,
      email,
      rollNumber,
      password,
      institute,
      department,
      year,
      section,
    });

    await student.save();

    // Create JWT token
    const payload = {
      studentId: student._id,
      institute: student.institute,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        institute: student.institute,
        department: student.department,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/students/login
// @desc    Login a student
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please provide email and password' });
    }

    // Check if student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await student.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Create JWT token
    const payload = {
      studentId: student._id,
      institute: student.institute,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        institute: student.institute,
        department: student.department,
        year: student.year,
        section: student.section,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/students/profile
// @desc    Get current student's profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.user.studentId).populate('institute', 'name');
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   GET api/students/campaigns
// @desc    Get all feedback campaigns for the student's institute
// @access  Private (requires student login)
router.get('/campaigns', auth, async (req, res) => {
  try {
    console.log("Fetching campaigns for student:", req.user);
    
    // Get the student's info from the JWT token
    const student = await Student.findById(req.user.studentId);

    if (!student) {
      console.log("Student not found for ID:", req.user.studentId);
      return res.status(404).json({ msg: 'Student not found' });
    }

    console.log("Found student:", student.name, "Institute:", student.institute);

    // Find ALL campaigns created by this student's institute (not filtered by department/year)
    const campaigns = await Campaign.find({
      createdBy: student.institute, // Match the student's institute
    })
    .select('_id title description targetDepartment targetYear deadline status questions')
    .sort({ createdAt: -1 }); // Newest first

    console.log("Found campaigns:", campaigns.length);
    res.json(campaigns);
  } catch (err) {
    console.error("Error in /campaigns route:", err.message);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});


module.exports = router;
