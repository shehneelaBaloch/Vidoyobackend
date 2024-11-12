const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: Number,
      productName: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  userDetails: {
    name: String,
    email: String,
    phoneNumber: String,
    address: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);