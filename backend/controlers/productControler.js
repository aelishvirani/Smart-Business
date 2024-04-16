import asyncHandler from 'express-async-handler'

import Product from '../models/productModel.js'
import Order from '../models/orderModel.js';


// Fetch all products
// GET /api/products
// Public
const getProducts = asyncHandler(async (req, res) => {
    const Cg = req.query.Cg
    const filter = req.query.filter
    const from = req.query.from
    const to = req.query.to
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    console.log(req.query.keyword)

    if (Cg) {
        const products = await Product.find({ category: Cg });
        res.json(products)

    }
    else if (filter) {
        switch (filter) {
            case 'Rating':
                const productsbyrating = await Product.find({}).sort('-rating').exec();
                res.json(productsbyrating)

                break;
            case 'date':
                const productsbydate = await Product.find({}).sort('createdAt').exec();
                res.json(productsbydate)
                break;
            case 'highprice':
                const productsbyhighprice = await Product.find({}).sort('price');
                res.json(productsbyhighprice)

                break;
            case 'lowprice':
                const productsbylowprice = await Product.find({}).sort('-price').exec();
                res.json(productsbylowprice)
                break;

            default:
                break;
        }
    } else if (from && to) {
        const productbyprice = await Product.find({ price: { $lte: to }, price: { $gte: from } });
        res.json(productbyprice)

    } else {
        const products = await Product.find({ ...keyword });
        res.json(products)

    }
})




// Fetch single  product
// GET /api/products/:id
// Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        // status it's 500 by default cuz of errHandler
        res.status(404)
        throw new Error('Product not found')
    }
})

// Delete a product
// GET /api/products/:id
// Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product Removed' })
    } else {
        // status it's 500 by default cuz of errHandler
        res.status(404)
        throw new Error('Product not found')
    }
})

// Create a product
// Post /api/products
//  Private/Admin
const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        name: 'Sample name',
        price: 0,
        description: 'sample description',
        user: req.user._id,
        sizes: [],
        images: ['https://i.imgur.com/QN2BSdJ.jpg', 'https://i.imgur.com/QN2BSdJ.jpg', 'https://i.imgur.com/QN2BSdJ.jpg'],
        category: [],
        countInStock: 0,
        numReviews: 0

    })
    const createProduct = await product.save();
    res.status(201).json(createProduct)
})

// Update a product
//  PUT /api/products/:id
//  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category, sizes, Images, countInStock } = req.body
    console.log(name, price, Images)
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.category = category
        product.sizes = sizes
        product.images = Images
        product.countInStock = countInStock
        const updatedProduct = await product.save();
        console.log(updatedProduct)
        res.json(updateProduct)

    } else {
        res.status(404)
        throw new Error('Product Not found')
    }
})

// Create new Review
// PUT /api/products/:id/reviews
// Private
const createproductreview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(404)
            throw new Error('Product Already Review')

        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product Not found')
    }
})
const toggleProductVisibility = async (req, res) => {
    const { productId } = req.params;
    const { visibility } = req.body;

    try {
        // Find the product by ID and update its visibility
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.visibility = visibility;
        await product.save();

        res.json({ message: 'Product visibility updated successfully' });
    } catch (error) {
        console.error('Error updating product visibility:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Fetch top selling products
// GET /api/products/top
// Public
const getTopSellingProducts = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({ isPaid: true }); // Assuming you have an Order model with an 'isPaid' field
        const productSales = {};

        // Iterate through each order and calculate product sales
        orders.forEach(order => {
            order.orderItems.forEach(item => {
                const productId = item.product.toString();
                productSales[productId] = (productSales[productId] || 0) + item.quantity;
            });
        });

        // Sort the product sales in descending order and pick the top 10
        const topProductIds = Object.keys(productSales)
            .sort((a, b) => productSales[b] - productSales[a])
            .slice(0, 10);

        // Fetch the product details for the top-selling products
        const topSellingProducts = await Product.find({ _id: { $in: topProductIds } });

        res.json(topSellingProducts);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


export {
    getProducts, getProductById, deleteProduct, createProduct, updateProduct, createproductreview, toggleProductVisibility, getTopSellingProducts
}