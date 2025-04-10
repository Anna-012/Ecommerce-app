const router = require("express").Router();
const Product = require("../model/product.model");

// ✅ Add new product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, sellerId, stock } = req.body;

    // Validate required fields
    if (!name || !price || !sellerId) {
      return res.status(400).json({ message: 'Name, price, and sellerId are required' });
    }

    // Create new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      seller: sellerId,
      stock
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✅ Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
});

// ✅ Update product by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
});

// ✅ Delete product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
});

// ✅ Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products by category', error: err.message });
  }
});

// ✅ Get products by seller ID
router.get('/seller/:sellerId', async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.params.sellerId });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products by seller ID', error: err.message });
  }
});

module.exports = router;
