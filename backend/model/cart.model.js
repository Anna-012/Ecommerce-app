const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  title: String,
  img: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  userId: String // if you have user auth
});

module.exports = mongoose.model("Cart", cartSchema);
