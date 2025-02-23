//file to handle: 
//   restaurant page
//   dish page
//   add items to cart
//   find a cart to make checkout details
//   get orders from users
//   make an order

import { RequestHandler } from 'express';
import {
  addItemToCart,
  createOrder,
  findCart,
  getDishesPaged,
  getRestaurantsPaged,
  getUserOrders,
} from '../../service/restaurant';

export const getRestaurants: RequestHandler = async (req, res) => {
    try {
      const { page } = req.query;
      const data = await getRestaurantsPaged(+(page || 0));
  
      res.status(200).json({
        message: 'success',
        data,
      });
    } catch (err) {
      res.status((err as any)?.status || 500).json({ message: (err as any).msg });
    }
};

export const getDishes: RequestHandler = async (req, res) => {
    try {
      const { page } = req.query;
      const { restaurantId } = req.params;
      const data = await getDishesPaged(restaurantId as string, +(page || 0));
  
      res.status(200).json({
        message: 'success',
        data,
      });
    } catch (err) {
      res.status((err as any)?.status || 500).json({ message: (err as any).msg });
    }
};

export const addToCart: RequestHandler = async (req, res) => {
    try {
      const { dishId, quantity } = req.body;
      const { user } = req;
      const { restaurantId } = req.params;
  
      const data = await addItemToCart(user.id, restaurantId, dishId, quantity);
      res.status(200).json({
        message: 'success',
        data,
      });
    } catch (err) {
      res.status((err as any)?.status || 500).json({ message: (err as any).msg });
    }
};

export const getCheckoutDetails: RequestHandler = async (req, res) => {
    try {
      const { user } = req;
      const { restaurantId } = req.params;
  
      const data = await findCart(user.id, restaurantId);
      res.status(200).json({
        message: 'success',
        data,
      });
    } catch (err) {
      res.status((err as any)?.status || 500).json({ message: (err as any).msg });
    }
};

export const fetchUserOrders: RequestHandler = async (req, res) => {
    try {
      const { user } = req;
  
      const data = await getUserOrders(user.id);
      res.status(200).json({
        message: 'success',
        data,
      });
    } catch (err) {
      res.status((err as any)?.status || 500).json({ message: (err as any).msg });
    }
};

export const checkout: RequestHandler = async (req, res) => {
    try {
      const { user } = req;
      const { restaurantId } = req.params;
  
      const data = await createOrder(user.id, restaurantId);
      res.status(200).json({
        message: 'success',
        data,
      });
    } catch (err) {
      res
        .status((err as any)?.status || 500)
        .json({ message: (err as any).msg || err });
    }
};