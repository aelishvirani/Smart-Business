
import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
    const { product, name, images, price, countInStock, qty } = req.body

    const cartItem = {
        product,
        name,
        images,
        price,
        countInStock,
        qty
    }

    const cart = await Cart.findOne({ user: req.user._id })

    if (cart) {
        // Check if the item is already in the cart
        const existItem = cart.cartItems.find(item => item.product.toString() === product.toString())

        if (existItem) {
            existItem.qty = qty
        } else {
            cart.cartItems.push(cartItem)
        }

        await cart.save()
        res.json(cart)
    } else {
        const newCart = await Cart.create({
            user: req.user._id,
            cartItems: [cartItem]
        })

        res.status(201).json(newCart)
    }
})

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:id
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id })

    if (cart) {
        cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== req.params.id.toString())

        await cart.save()
        res.json(cart)
    } else {
        res.status(404)
        throw new Error('Cart not found')
    }
})

// @desc    Save shipping address
// @route   POST /api/cart/shipping
// @access  Private
const saveShippingAddress = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id })

    if (cart) {
        cart.shippingAddress = req.body
        await cart.save()
        res.json(cart)
    } else {
        res.status(404)
        throw new Error('Cart not found')
    }
})

// @desc    Save payment method
// @route   POST /api/cart/payment
// @access  Private
const savePaymentMethod = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id })

    if (cart) {
        cart.paymentMethod = req.body.paymentMethod
        await cart.save()
        res.json(cart)
    } else {
        res.status(404)
        throw new Error('Cart not found')
    }
})

// @desc    Fetch cart items
// @route   GET /api/cart
// @access  Private
const fetchCartItems = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');

    res.json(cart);
});

export {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    fetchCartItems
};

// const fetchCartItems = () => async (dispatch, getState) => {
//     const { userLogin: { userInfo } } = getState()

//     if (!userInfo) {
//         // User is not logged in, handle this case accordingly (redirect to login page, etc.)
//         return
//     }

//     try {
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const { data } = await axios.get('/api/cart', config)

//         dispatch({
//             type: 'FETCH_CART_ITEMS_SUCCESS',
//             payload: data
//         })
//     } catch (error) {
//         dispatch({
//             type: 'FETCH_CART_ITEMS_FAIL',
//             payload: error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message
//         })
//     }
// }

// export {
//     addToCart,
//     removeFromCart,
//     saveShippingAddress,
//     savePaymentMethod,
//     fetchCartItems
// }





// import asyncHandler from 'express-async-handler';

// import Cart from '../models/cartModel.js'


// //create new cart
// //POST /api/carts
// //Private

// const addcartitems = asyncHandler(async (req, res) => {
//     const { cartItems } = req.body
//     if (cartItems && cartItems.length === 0) {
//         res.status(400)
//         throw new Error('No cart items')
//         return
//     } else {
//         const order = new Order({
//             user: req.user._id,
//             cartItems
//         })
//         const createdOrder = await order.save()

//         res.status(201).json(createdOrder)
//     }

// })