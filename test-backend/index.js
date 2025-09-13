const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const feedbackRoutes = require('./routes/feedback');
const instituteRoutes = require('./routes/institute');

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
    res.send('Backend server is running and connected to MongoDB');
});
app.use('/api/feedback', feedbackRoutes);
app.use('/api/institute', instituteRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



