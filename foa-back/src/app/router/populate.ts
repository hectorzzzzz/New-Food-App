//file to config restaurant route

import express from 'express';
import { populateRestaurant } from '../handler/populate/restaurants';

const populateRoutes = express.Router();

populateRoutes.get('/restaurants', populateRestaurant);

export default populateRoutes;