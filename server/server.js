const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// TODO: load environment variables from .env file
require("dotenv").config()

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// Catch all route to serve index.html for any unmatched routes (supports React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});