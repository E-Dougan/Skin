import express from 'express';
import authRoutes from './auth';
import userRoutes from './users';
import productRoutes from './products';
import analysisRoutes from './analysis';
import routineRoutes from './routines';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/analysis', analysisRoutes);
router.use('/routines', routineRoutes);

export default router;