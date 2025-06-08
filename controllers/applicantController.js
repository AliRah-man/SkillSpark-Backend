const Applicant = require('../models/applicantModel');

// POST /api/applicants
const submitApplication = async (req, res) => {
  try {
    const { fullName, email, phone, courseInterest, message } = req.body;

    const newApplicant = new Applicant({
      fullName,
      email,
      phone,
      courseInterest,
      message
    });

    await newApplicant.save();

    res.status(201).json({ message: 'Application submitted successfully!', applicant: newApplicant });
  } catch (error) {
    console.error('Error submitting application:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists. Please use a different email.' });
    } else {
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }
};

// GET /api/applicants
const getAllApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find().sort({ submissionDate: -1 });
    res.status(200).json(applicants);
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).json({ message: 'Server error while fetching applicants.' });
  }
};

module.exports = { submitApplication, getAllApplicants };
