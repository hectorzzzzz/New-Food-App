//file to config order route

import express from 'express';
import authenticate from '../middleware/authenticate';
import { fetchUserOrders } from '../handler/restaurant/handle';

const orderRoutes = express.Router();

orderRoutes.get('/getAll', authenticate, fetchUserOrders);

export default orderRoutes;