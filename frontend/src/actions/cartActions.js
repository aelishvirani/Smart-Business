import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADRESSE, CART_SAVE_PAYMENT, FETCH_CART_ITEMS_SUCCESS, FETCH_CART_ITEMS_FAIL } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {

  const { userLogin: { userInfo } } = getState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  }

  const { data } = await axios.get(`/api/products/${id}`)
  console.log(data)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      images: data.images,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const saveAddressshipping = (data) => (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADRESSE,
    payload: data
  })
  localStorage.setItem('shippingAddress', JSON.stringify(data))

}
export const savepaymentmethod = (data) => (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_PAYMENT,
    payload: data
  })
  localStorage.setItem('paymentMethod', JSON.stringify(data))

}

export const fetchCartItems = () => async (dispatch, getState) => {
  try {
    const { userLogin: { userInfo } } = getState();

    if (userInfo) {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get('/api/cart', config);

      dispatch({
        type: FETCH_CART_ITEMS_SUCCESS,
        payload: data
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_CART_ITEMS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};



// import axios from 'axios'
// import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADRESSE, CART_SAVE_PAYMENT } from '../constants/cartConstants'

// export const addToCart = (id, qty) => async (dispatch, getState) => {
//   const { userLogin: { userInfo } } = getState()

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${userInfo.token}`
//     }
//   }

//   const { data } = await axios.get(`/api/products/${id}`)
//   console.log(data)
//   dispatch({
//     type: CART_ADD_ITEM,
//     payload: {
//       product: data._id,
//       name: data.name,
//       images: data.images,
//       price: data.price,
//       countInStock: data.countInStock,
//       qty,
//     },
//   })
// }

// export const removeFromCart = (id) => (dispatch, getState) => {
//   dispatch({
//     type: CART_REMOVE_ITEM,
//     payload: id
//   })
// }

// export const saveAddressshipping = (data) => (dispatch, getState) => {
//   dispatch({
//     type: CART_SAVE_SHIPPING_ADRESSE,
//     payload: data
//   })
// }

// export const savepaymentmethod = (data) => (dispatch, getState) => {
//   dispatch({
//     type: CART_SAVE_PAYMENT,
//     payload: data
//   })
// }


// // export const fetchCartItems = () => async (dispatch, getState) => {
// //   const { userLogin: { userInfo } } = getState()

// //   if (!userInfo) {
// //     // User is not logged in, handle this case accordingly (redirect to login page, etc.)
// //     return
// //   }

// //   try {
// //     const config = {
// //       headers: {
// //         Authorization: `Bearer ${userInfo.token}`
// //       }
// //     }

// //     const { data } = await axios.get('/api/cart', config)

// //     dispatch({
// //       type: 'FETCH_CART_ITEMS_SUCCESS',
// //       payload: data
// //     })
// //   } catch (error) {
// //     dispatch({
// //       type: 'FETCH_CART_ITEMS_FAIL',
// //       payload: error.response && error.response.data.message
// //         ? error.response.data.message
// //         : error.message
// //     })
// //   }
// // }


// export const fetchCartItems = () => async (dispatch, getState) => {
//   try {
//     const { userLogin: { userInfo } } = getState()

//     if (userInfo) {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`
//         }
//       }

//       const { data } = await axios.get('/api/cart', config)

//       dispatch({
//         type: 'FETCH_CART_ITEMS_SUCCESS',
//         payload: data
//       })
//     }
//   } catch (error) {
//     dispatch({
//       type: 'FETCH_CART_ITEMS_FAIL',
//       payload: error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     })
//   }
// }




// // import axios from 'axios'
// // import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADRESSE, CART_SAVE_PAYMENT } from '../constants/cartConstants'

// // export const addToCart = (id, qty) => async (dispatch, getState) => {

// //   const { userLogin: { userInfo } } = getState()

// //   const config = {
// //     headers: {
// //       'Content-Type': 'application/json',
// //       Authorization: `Bearer ${userInfo.token}`
// //     }
// //   }

// //   const { data } = await axios.get(`/api/products/${id}`)
// //   console.log(data)
// //   dispatch({
// //     type: CART_ADD_ITEM,
// //     payload: {
// //       product: data._id,
// //       name: data.name,
// //       images: data.images,
// //       price: data.price,
// //       countInStock: data.countInStock,
// //       qty,
// //     },
// //   })

// //   // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
// // }


// // export const removeFromCart = (id) => (dispatch, getState) => {
// //   dispatch({
// //     type: CART_REMOVE_ITEM,
// //     payload: id
// //   })
// //   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

// // }

// // export const saveAddressshipping = (data) => (dispatch, getState) => {
// //   dispatch({
// //     type: CART_SAVE_SHIPPING_ADRESSE,
// //     payload: data
// //   })
// //   localStorage.setItem('shippingAddress', JSON.stringify(data))

// // }
// // export const savepaymentmethod = (data) => (dispatch, getState) => {
// //   dispatch({
// //     type: CART_SAVE_PAYMENT,
// //     payload: data
// //   })
// //   localStorage.setItem('paymentMethod', JSON.stringify(data))

// // }