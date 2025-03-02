// file to store data in database

import { Types } from 'mongoose';
import { IDish } from '../../model/dish';
import {
  createNewDish,
  createNewRestaurant,
} from '../../repository/restaurant/index';
import { MockRestaurants, MockDish } from './data';

export async function generateRestaurant(
  start = 0,
  end = MockRestaurants.length,
) {
  const ids = [];

  for (let i = start; i < end; i++) {
    const mock = MockRestaurants[i];
    const data = await createNewRestaurant(mock);
    console.log('CREATED RESTAURANT', data.name, data.id);
    ids.push(data.id);
  }

  return ids;
}

export async function generateDish(restaurantIds: Types.ObjectId[], start = 0) {
  const magicNumber = 15;
  let dishRange = start * magicNumber;
  const dishTotal = MockDish.length;
  for (const [index, restaurantId] of restaurantIds.entries()) {
    let discountedMod = 0;
    console.log('generating dish for', restaurantId, index);
    dishRange += magicNumber;
    dishRange = dishRange % dishTotal;
    for (let i = dishRange - magicNumber; i < dishRange; i++) {
      const dish = MockDish[i] as IDish;
      dish.restaurant = restaurantId;

      if (discountedMod % 3 === 0) {
        const randomDivider = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        dish.discountedPrice =
          dish.price - Math.ceil(dish.price / randomDivider);
      }

      const data = await createNewDish(dish);
      console.log('CREATED DISH', data.name, data.id);
      discountedMod++;
    }
    console.log('DONE DISH for', restaurantId, index);
  }
}