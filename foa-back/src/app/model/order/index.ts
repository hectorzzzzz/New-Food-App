//file for order (MongoDB) model => define the data structure that will be stored in MongoDB

import mongoose, { Types } from 'mongoose';

const orderSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;