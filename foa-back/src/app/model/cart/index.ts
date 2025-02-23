//file for cart (MongoDB) model => define the data structure that will be stored in MongoDB

import mongoose, { Types } from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  dish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;