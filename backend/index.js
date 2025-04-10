require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.routes'); 
const userRoutes = require('./routes/user.routes');


const app = express();
const PORT = 3000;

// Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// Middlewares
app.use(express.json());
app.use(express.static(__dirname));
app.use('/user', userRoutes);
app.use('/products', productRoutes);// 💡 This is the fix

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
