//file for restaurant (MongoDB) model => define the data structure that will be stored in MongoDB

import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  alamat: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  image: { type: String },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;

export interface IRestaurant {
  name: string;
  alamat: string;
  description: string;
  rating: number;
  image?: string;
}