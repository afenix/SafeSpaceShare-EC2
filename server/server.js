const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// Load environment variables from .env file
require("dotenv").config()

// Enable CORS for all routes
app.use(cors());
//TODO: make this more secure by restricting only to my domain in future
// app.use(cors({
//   origin: 'http://your-react-app-domain.com' // Replace with your frontend's domain
// }));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// API routes
const apiRoutes = require('./routes/api'); // Correct path to api.js
app.use('/api', apiRoutes);

// Catch all route to serve index.html for any unmatched routes (supports React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});