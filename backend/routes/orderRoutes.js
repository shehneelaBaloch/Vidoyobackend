// routes/orderRoutes.js

const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log("Received order data:", req.body); // Log request data
    const { items, totalAmount, userDetails } = req.body;
    const order = new Order({ items, totalAmount, userDetails });
    await order.save();
    res.status(201).json({ message: 'Order saved successfully', order });
  } catch (error) {
    console.error("Error in saving order:", error); // Log full error
    res.status(500).json({ message: 'Error saving order', error: error.message });
  }
});

module.exports = router;
