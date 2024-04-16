import mongoose from 'mongoose'

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Relation between the cart and the user
    },
    cartItems: [{
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String },
        price: { type: Number, required: true },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    }]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart
