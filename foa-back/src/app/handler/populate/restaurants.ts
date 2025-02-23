//file to create a database with restaurant and dish data automatically 

import { RequestHandler } from 'express';
import {
  generateDish,
  generateRestaurant,
} from '../../service/populate/index';

export const populateRestaurant: RequestHandler = async (req, res) => {
  try {
    const { start, end } = req.query;
    const restaurantIds = await generateRestaurant(
      start ? +start : undefined,
      end ? +end : undefined,
    );
    await generateDish(restaurantIds);

    res.status(200).json({ message: 'success', restaurantIds });
  } catch (err) {
    res.status(500).json({ message: 'failed', error: err });
  }
};