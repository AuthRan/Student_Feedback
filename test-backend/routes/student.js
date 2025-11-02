const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Institute = require('../models/Institute');
const auth = require('../middleware/auth');

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

module.exports = router;
