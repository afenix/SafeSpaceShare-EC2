const express = require('express');
const router = express.Router();
const { getIdentityData } = require('../controllers/dbController');

// Route to fetch identity categories and subcategories
router.get('/identity-categories', async (req, res) => {
  try {
    const data = await getIdentityData();
    res.json(data);
  } catch (error) {
    console.error('Error in /identity-categories route:', error);
    res.status(500).json({ error: 'Failed to fetch identity categories' });
  }
});

module.exports = router;