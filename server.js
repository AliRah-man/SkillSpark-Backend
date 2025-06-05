
require('dotenv').config();

// Import necessary modules
const express = require('express'); // Express.js for building the server
const mongoose = require('mongoose'); // Mongoose for MongoDB interaction
const cors = require('cors'); // CORS for cross-origin requests

// Create an Express application instance
const app = express();

// Define the port for the server to listen on
// Use process.env.PORT for deployment, or 5000 for local development
const PORT = process.env.PORT || 5000;
// Middleware:
// app.use(cors()) enables CORS for all routes. This is essential for your React frontend
// to communicate with this backend, as they run on different ports.
app.use(cors());
// app.use(express.json()) parses incoming JSON requests. This means when your React
// frontend sends data as JSON, Express can understand and use it.
app.use(express.json());

// MongoDB Connection
// Get the MongoDB URI from environment variables (from the .env file)
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

console.log('MongoDB URI:', process.env.MONGODB_URI);
// Define a Mongoose Schema for Applicant data
// This defines the structure of documents in your 'applicants' collection
const applicantSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Email should be unique
  phone: { type: String, required: true },
  courseInterest: { type: String, required: true },
  message: { type: String, default: '' }, // Optional field
  submissionDate: { type: Date, default: Date.now } // Automatically adds submission date
});

// Create a Mongoose Model from the schema
// The model is a constructor that creates documents based on the schema
// 'Applicant' will correspond to a collection named 'applicants' in MongoDB
const Applicant = mongoose.model('Applicant', applicantSchema);


// Define a Mongoose Schema for Inquiry data
const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  inquiryMessage: { type: String, required: true },
  submissionDate: { type: Date, default: Date.now }
});

// Create a Mongoose Model for Inquiry
const Inquiry = mongoose.model('Inquiry', inquirySchema);


// API Routes:

// Route for handling Applicant Form submissions (POST request)
// This endpoint will receive data from your React application's ApplyPage
app.post('/api/applicants', async (req, res) => {
  try {
    // Extract data from the request body (sent by the frontend)
    const { fullName, email, phone, courseInterest, message } = req.body;

    // Create a new Applicant document using the Mongoose Model
    const newApplicant = new Applicant({
      fullName,
      email,
      phone,
      courseInterest,
      message
    });

    // Save the new applicant to the MongoDB database
    await newApplicant.save();

    // Send a success response back to the frontend
    res.status(201).json({ message: 'Application submitted successfully!', applicant: newApplicant });
  } catch (error) {
    // Handle errors (e.g., duplicate email, validation errors)
    console.error('Error submitting application:', error);
    if (error.code === 11000) { // MongoDB duplicate key error (for unique fields like email)
      res.status(400).json({ message: 'Email already exists. Please use a different email or contact us.' });
    } else {
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }
});

// Route for handling Inquiry Form submissions (POST request)
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, subject, inquiryMessage } = req.body;

    const newInquiry = new Inquiry({
      name,
      email,
      subject,
      inquiryMessage
    });

    await newInquiry.save();

    res.status(201).json({ message: 'Inquiry submitted successfully!', inquiry: newInquiry });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Basic GET route for testing the server
app.get('/', (req, res) => {
  res.send('SkillSpark Plus Backend is running!');
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access backend at http://localhost:${PORT}`);
});
