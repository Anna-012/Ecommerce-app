// backend/routes/cartRoutes.js
const express = require('express');
const { addToCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/add', addToCart);

module.exports = router;

