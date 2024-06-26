// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productreviewCreateReducer } from './reducers/productReducers'
// import { cartReducer } from './reducers/cartReducers'
// import { CreateOrderReducers, OrderDeliverreducer, OrderDetailsreducer, OrderListMyreducer, OrderListreducer, OrderPayreducer } from './reducers/orderReducers'
// import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers'
// import { fetchCartItems } from './actions/cartActions'

// const reducer = combineReducers({
//     productList: productListReducer,
//     productDetails: productDetailsReducer,
//     productDelete: productDeleteReducer,
//     productCreate: productCreateReducer,
//     productUpdate: productUpdateReducer,
//     productReviewCreate: productreviewCreateReducer,
//     cart: cartReducer,
//     userLogin: userLoginReducer,
//     userRegister: userRegisterReducer,
//     userDetails: userDetailsReducer,
//     userUpdateProfile: userUpdateProfileReducer,
//     userList: userListReducer,
//     userDelete: userDeleteReducer,
//     userUpdate: userUpdateReducer,
//     orderCreate: CreateOrderReducers,
//     orderDetails: OrderDetailsreducer,
//     orderPay: OrderPayreducer,
//     orderMylist: OrderListMyreducer,
//     orderList: OrderListreducer,
//     orderDeliver: OrderDeliverreducer
// })

// const middleware = [thunk]

// const store = createStore(
//     reducer,
//     composeWithDevTools(applyMiddleware(...middleware))
// )

// store.dispatch(fetchCartItems())

// export default store


import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { CreateOrderReducers, OrderDeliverreducer, OrderDetailsreducer, OrderListMyreducer, OrderListreducer, OrderPayreducer } from './reducers/orderReducers'

import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers'

// import { dashboardReducer, revenueReducer } from './reducers/dashboardReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: CreateOrderReducers,
    orderDetails: OrderDetailsreducer,
    orderPay: OrderPayreducer,
    orderMylist: OrderListMyreducer,
    orderList: OrderListreducer,
    orderDeliver: OrderDeliverreducer,
    // dashboard: dashboardReducer,
    // revenue: revenueReducer


})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse
    (localStorage.getItem('cartItems')) : []
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse
    (localStorage.getItem('shippingAddress')) : {}
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse
    (localStorage.getItem('userInfo')) : null

const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
}

const middelware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middelware))
)

export default store