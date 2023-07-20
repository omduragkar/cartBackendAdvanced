const { Schema, default: mongoose } = require("mongoose");

/**
 * @description: This is the order schema for the API
 * 
 */
const OrderSchema = new mongoose.Schema({
  cart:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CartItem',
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  billAmount: {
    type: Number,
    default: 0,
  },
  taxAmount: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});


const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;