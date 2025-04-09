require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes'); // correct path if needed

const app = express();
const PORT = 3000;

// Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// Middlewares
app.use(express.json());
app.use(express.static(__dirname)); // to serve HTML, CSS, JS etc.
app.use('/user', userRoutes); // all user routes will be prefixed with /user

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
