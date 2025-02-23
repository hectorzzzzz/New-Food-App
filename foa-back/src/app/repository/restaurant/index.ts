//file to manage restaurant, dish, card, and order:

import Restaurant, { IRestaurant } from '../../model/restaurant';
import Dish, { IDish } from '../../model/dish';
import { getPaginatedItems } from '../../utils/pagination';
import Cart from '../../model/cart';
import { Document } from 'mongoose';
import Order from '../../model/order';

export async function createNewRestaurant(params: IRestaurant) {
    const newData = new Restaurant(params);
    await newData.save();
    return newData;
}

export async function createNewDish(params: IDish) {
    const newData = new Dish(params);
    await newData.save();
    return newData;
}

export function getRestaurants(page?: number) {
    return getPaginatedItems(Restaurant, { page });
}

export function getDishes(restaurant: string, page?: number) {
    return getPaginatedItems(Dish, {
      page,
      filter: { restaurant },
    });
}

export async function getUserDraftCart(
    user: string,
    restaurant: string,
    dish?: string,
    idOnly = false,
  ) {
    let query = Cart.find({ user, restaurant, order: { $exists: false } });
  
    if (dish)
      query = Cart.find({ user, restaurant, dish, order: { $exists: false } });
  
    if (idOnly) query = query.select('_id');
    else query = query.populate('dish');
  
    const carts = await query;
    return carts;
}

export async function getUserOrderedCart(user: string, order: string) {
    const query = Cart.find({ user, order }).populate('dish');
  
    const carts = await query;
    return carts;
}

export async function createNewCart(params: {
    user: string;
    restaurant: string;
    dish: string;
    quantity: number;
  }) {
    const { user, restaurant, dish, quantity } = params;
  
    const newCart = new Cart({
      user,
      restaurant,
      dish,
      quantity,
    });
    const cart = await newCart.save();
    return cart;
}

export async function setCart(cart: string, quantity: number) {
    const existingCart = await Cart.findByIdAndUpdate(cart, { quantity });
  
    return existingCart;
}

export async function createNewOrder(
    user: string,
    restaurant: string,
    status = 'Waiting',
  ) {
    const carts = await getUserDraftCart(user, restaurant, undefined, true);
  
    if (!carts?.length) {
      throw { status: 404, msg: 'carts not found' };
    }
  
    const order = new Order({ restaurant, status, user });
  
    for (const cart of carts) {
      await Cart.findByIdAndUpdate(cart._id, { order: order._id });
    }
    await order.save();
}

export function getOrderByUserId(user: string) {
    return Order.find({ user }).populate('restaurant').sort({ createdAt: -1 });
}