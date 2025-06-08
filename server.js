require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const applicantRoutes = require('./routes/applicantRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');

// Setup
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Route Middleware
app.use('/api/applicants', applicantRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('SkillSpark Plus Backend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
