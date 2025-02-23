//file to config the routing => emtry point for all API routes

import express from 'express';
import authRoutes from './auth';
import restaurantRoutes from './restaurant';
import populateRoutes from './populate';
import orderRoutes from './orders';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/populate', populateRoutes);
router.use('/orders', orderRoutes);
router.get('/', async function (_, res) {
  res.status(200).json({ message: 'deployed successfully' });
});

export default router;