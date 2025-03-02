//file to API methods

import {
  Dish,
  GetCheckoutDetailsResponse,
  GetPaginationResponse,
  Order,
  Restaurant,
} from '@/types/restaurant';
import api from './api';

export function getRestaurants(page = 1) {
  return api.get<GetPaginationResponse<Restaurant>>(
    `rest/restaurants/getAll?page=${page}`,
  );
}

export function getDishes(restaurantId: string, page = 1) {
  return api.get<GetPaginationResponse<Dish>>(
    `rest/restaurants/${restaurantId}/getAllDishes?page=${page}`,
  );
}

export function getCartItems(restaurantId: string) {
  return api.get<GetCheckoutDetailsResponse>(
    `rest/restaurants/${restaurantId}/getCheckoutDetails`,
  );
}

export function setCartItem(
  restaurantId: string,
  dishId: string,
  quantity: number,
) {
  return api.post<GetCheckoutDetailsResponse>(
    `rest/restaurants/${restaurantId}/addItem`,
    {
      dishId,
      quantity,
    },
  );
}

export function checkout(restaurantId: string) {
  return api.post(`rest/restaurants/${restaurantId}/checkout`, {});
}

export function getUserOrders() {
  return api.get<Order[]>('rest/orders/getAll');
}