const express = require('express');
const router = express.Router();
const { submitInquiry, getAllInquiries } = require('../controllers/inquiryController');

router.post('/', submitInquiry);
router.get('/', getAllInquiries); // 👈 NEW: Get all inquiries

module.exports = router;
