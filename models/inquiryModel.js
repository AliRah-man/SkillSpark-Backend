const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  inquiryMessage: { type: String, required: true },
  submissionDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
