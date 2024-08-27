const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController'); // Adjust the path as needed

// API route to fetch and return geojson data for exploratory mapping
router.get('/geojson', dbController.getGeojsonData);

module.exports = router;