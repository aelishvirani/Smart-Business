import express from 'express'
import { addToCart, removeFromCart, fetchCartItems } from '../controlers/cartControler.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/add').post(protect, addToCart)
router.route('/remove/:id').delete(protect, removeFromCart)
router.route('/').get(protect, fetchCartItems)

export default router
