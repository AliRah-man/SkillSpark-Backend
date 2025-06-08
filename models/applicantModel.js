const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  courseInterest: { type: String, required: true },
  message: { type: String, default: '' },
  submissionDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Applicant', applicantSchema);
