//file to config dish, cart, checkout, and checkout details

import express from 'express';
import authenticate from '../middleware/authenticate';
import {
  addToCart,
  checkout,
  getCheckoutDetails,
  getDishes,
  getRestaurants,
} from '../handler/restaurant/handle';

const restaurantRoutes = express.Router();

restaurantRoutes.get('/getAll', authenticate, getRestaurants);
restaurantRoutes.get('/:restaurantId/getAllDishes', authenticate, getDishes);
restaurantRoutes.post('/:restaurantId/addItem', authenticate, addToCart);
restaurantRoutes.post('/:restaurantId/checkout', authenticate, checkout);
restaurantRoutes.get(
  '/:restaurantId/getCheckoutDetails',
  authenticate,
  getCheckoutDetails,
);

export default restaurantRoutes;