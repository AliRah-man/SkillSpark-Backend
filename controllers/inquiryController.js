const Inquiry = require('../models/inquiryModel');

// POST /api/inquiries
const submitInquiry = async (req, res) => {
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
};

// GET /api/inquiries
const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ submissionDate: -1 });
    res.status(200).json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ message: 'Server error while fetching inquiries.' });
  }
};

module.exports = { submitInquiry, getAllInquiries };
