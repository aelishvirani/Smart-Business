// routes/dashboardRoutes.js
import express from 'express';
import { getOverviewData, getRecentOrders, getTopSellingProducts, getUserActivity, getRevenue } from '../controlers/dashboardControler.js';

const router = express.Router();

router.get('/overview', getOverviewData);
router.get('/recent-orders', getRecentOrders);
router.get('/top-selling-products', getTopSellingProducts);
router.get('/user-activity', getUserActivity);
router.get('/revenue', getRevenue);

export default router;
