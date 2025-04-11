const Cart = require('../model/cart.model'); 


const addToCart = async (req, res) => {
  const { title, img, price, userId } = req.body;

  try {
    const newItem = new Cart({ title, img, price, userId });
    await newItem.save();
    res.status(201).json({ message: "Item added to cart", item: newItem });
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart", error: err.message });
  }
};

module.exports = { addToCart };
