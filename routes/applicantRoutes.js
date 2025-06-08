const express = require('express');
const router = express.Router();
const { submitApplication, getAllApplicants } = require('../controllers/applicantController');

router.post('/', submitApplication);
router.get('/', getAllApplicants); // 👈 NEW: Get all applicants

module.exports = router;
