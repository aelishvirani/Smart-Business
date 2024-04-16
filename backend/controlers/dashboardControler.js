// controllers/dashboardController.js
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

export const getOverviewData = asyncHandler(async (req, res) => {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    // You need to calculate revenue based on your orders
    const revenue = calculateRevenueSomehow();

    res.json({ totalOrders, totalProducts, totalUsers, revenue });
});


export const getRecentOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(5); // Adjust limit as needed
    res.json(orders);
});


export const getTopSellingProducts = asyncHandler(async (req, res) => {
    const topProducts = await Product.find().sort({ sales: -1 }).limit(5); // Assuming you have a 'sales' field in your product model
    res.json(topProducts);
});


export const getUserActivity = asyncHandler(async (req, res) => {
    // Fetch user activity data from wherever it's stored in your application
    const userActivity = await UserActivity.find().limit(5); // Adjust limit as needed
    res.json(userActivity);
});


// Fetch revenue data
// GET /api/dashboard/revenue
// Private/Admin
export const getRevenue = asyncHandler(async (req, res) => {
    // Fetch relevant data from your database
    try {
        // Example: Fetch orders from your Order model
        const orders = await Order.find({});

        // Calculate total revenue based on fetched orders
        let totalRevenue = 0;
        orders.forEach((order) => {
            totalRevenue += order.totalPrice; // Assuming you have a 'totalPrice' field in your order data
        });

        // Send response with total revenue
        res.json({ totalRevenue });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching revenue data', error: error.message });
    }
});