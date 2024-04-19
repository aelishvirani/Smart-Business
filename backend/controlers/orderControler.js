import asyncHandler from 'express-async-handler'

import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

// Create new order
// POST /api/orders
// Private
const addorderitems = asyncHandler(async (req, res) => {
    console.log(req.user)

    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        // Update product sales for each ordered item
        for (const item of orderItems) {
            const product = await Product.findById(item.product);

            if (product) {
                // Increment the sales field based on the ordered quantity
                product.sales += item.qty;
                await product.save();
            }
        }

        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            // isPaid : true
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})
// get order by id
// GET /api/orders/:id
// Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order Not found')
    }

})
// update order to paid
// update /api/orders/:id/pay
// Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,

        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)

    } else {
        res.status(404)
        throw new Error('Order Not found')
    }

})


// update order to delivered
// update /api/orders/:id/deliver
// Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)

    } else {
        res.status(404)
        throw new Error('Order Not found')
    }

})
//get logged in user orders
//GET /api/orders/myorders
//Private
const GetMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)

})

//get orders
//GET /api/admin/orders
//Private/admin
const GetOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)

})

export { addorderitems, getOrderById, updateOrderToPaid, GetMyOrders, GetOrders, updateOrderToDelivered }