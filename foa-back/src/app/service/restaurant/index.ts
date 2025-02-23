//file to manage cart and order: 
//    find, create, and add items to cart
//    calculate price and discount price
//    create an order

import { random } from 'lodash';
import { IDish } from '../../model/dish';
import {
  createNewCart,
  createNewOrder,
  getDishes,
  getRestaurants,
  getUserDraftCart,
  getOrderByUserId,
  setCart,
  getUserOrderedCart,
} from '../../repository/restaurant';

export function getRestaurantsPaged(page?: number) {
  return getRestaurants(page);
}

export function getDishesPaged(restaurantId: string, page?: number) {
  return getDishes(restaurantId, page);
}

function calculatePrice(carts: any) {
  let totalPrice = 0;
  let totalDiscountedPrice = 0;

  carts.forEach((c: any) => {
    const dish = c.dish as unknown as IDish;
    totalPrice += dish.price * c.quantity;
    if (dish.discountedPrice)
      totalDiscountedPrice += dish.discountedPrice * c.quantity;
    else totalDiscountedPrice += dish.price * c.quantity;
  });

  return { carts, totalPrice, totalDiscountedPrice };
}

export async function findCart(userId: string, restaurantId: string) {
  if (!userId || !restaurantId) {
    throw { status: 400, msg: 'params not completed' };
  }

  const carts = await getUserDraftCart(userId, restaurantId);
  if (!carts?.length) throw { status: 404, msg: 'carts not found' };

  return calculatePrice(carts);
}

export async function addItemToCart(
  userId: string,
  restaurantId: string,
  itemId: string,
  quantity: number,
) {
  if (!userId || !restaurantId || !itemId) {
    throw { status: 400, msg: 'params not completed' };
  }

  const oldCart = await getUserDraftCart(userId, restaurantId, itemId, true);
  if (oldCart.length) {
    await setCart(oldCart[0].id, quantity);
    const updatedCart = await getUserDraftCart(userId, restaurantId);
    return calculatePrice(updatedCart);
  }

  try {
    const cart = await createNewCart({
      user: userId,
      restaurant: restaurantId,
      dish: itemId,
      quantity,
    });
    const updatedCart = await getUserDraftCart(userId, restaurantId);
    return calculatePrice(updatedCart);
  } catch {
    throw { status: 400, msg: 'something is wrong' };
  }
}

export async function createOrder(user: string, restaurant: string) {
  const status = ['Waiting', 'Delivering', 'Done'][random(0, 2) % 3];
  return createNewOrder(user, restaurant, status);
}

export async function getUserOrders(userId: string) {
  const orders = await getOrderByUserId(userId);

  const mapped = [];

  for (const order of orders) {
    const carts = await getUserOrderedCart(userId, order.id);
    let totalPrice = 0;
    let totalDiscountedPrice = 0;

    carts.forEach((c) => {
      const dish = c.dish as unknown as IDish;
      totalPrice += dish.price * c.quantity;
      if (dish.discountedPrice)
        totalDiscountedPrice += dish.discountedPrice * c.quantity;
      else totalDiscountedPrice += dish.price * c.quantity;
    });
    mapped.push({
      ...(order as any)._doc,
      carts,
      totalPrice,
      totalDiscountedPrice,
    });
  }

  return mapped;
}