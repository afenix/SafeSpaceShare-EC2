const express = require('express');
const router = express.Router();
const { insertExperience } = require('../controllers/dbController'); // Correct path to dbController.js

// Route to handle form submission
router.post('/submit-experience', insertExperience);

module.exports = router;