const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    imageUrl: { type: String, trim: true },
    description: { type: String, trim: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    category: { type: String, required: true, trim: true },
    stock: { type: Number, required: true, trim: true },
  }, {
    timestamps: true,
    versionKey: false
  });
  
  module.exports = mongoose.model('Product', productSchema);