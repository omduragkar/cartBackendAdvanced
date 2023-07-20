const { Schema, default: mongoose } = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  },
  quantity: {
    type: Number,
    default: 1, // Set a default quantity if none is provided
  },
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


const CARTITEM = mongoose.model('CartItem', cartItemSchema);

module.exports = CARTITEM;