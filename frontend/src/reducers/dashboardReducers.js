// reducers/dashboardReducers.js

import {
    FETCH_OVERVIEW_DATA_REQUEST,
    FETCH_OVERVIEW_DATA_SUCCESS,
    FETCH_OVERVIEW_DATA_FAIL,
    FETCH_RECENT_ORDERS_REQUEST,
    FETCH_RECENT_ORDERS_SUCCESS,
    FETCH_RECENT_ORDERS_FAIL,
    FETCH_TOP_SELLING_PRODUCTS_REQUEST,
    FETCH_TOP_SELLING_PRODUCTS_SUCCESS,
    FETCH_TOP_SELLING_PRODUCTS_FAIL,
    FETCH_USER_ACTIVITY_REQUEST,
    FETCH_USER_ACTIVITY_SUCCESS,
    FETCH_USER_ACTIVITY_FAIL,
    GET_REVENUE_REQUEST,
    GET_REVENUE_SUCCESS,
    GET_REVENUE_FAIL,
} from '../constants/dashBoardConstants';

const initialState = {
    loading: false,
    error: null,
    overview: null,
    recentOrders: null,
    topSellingProducts: null,
    userActivity: null,
    revenue: null,
};

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OVERVIEW_DATA_REQUEST:
        case FETCH_RECENT_ORDERS_REQUEST:
        case FETCH_TOP_SELLING_PRODUCTS_REQUEST:
        case FETCH_USER_ACTIVITY_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_OVERVIEW_DATA_SUCCESS:
            return { ...state, loading: false, overview: action.payload };
        case FETCH_RECENT_ORDERS_SUCCESS:
            return { ...state, loading: false, recentOrders: action.payload };
        case FETCH_TOP_SELLING_PRODUCTS_SUCCESS:
            return { ...state, loading: false, topSellingProducts: action.payload };
        case FETCH_USER_ACTIVITY_SUCCESS:
            return { ...state, loading: false, userActivity: action.payload };
        case FETCH_OVERVIEW_DATA_FAIL:
        case FETCH_RECENT_ORDERS_FAIL:
        case FETCH_TOP_SELLING_PRODUCTS_FAIL:
        case FETCH_USER_ACTIVITY_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
export const revenueReducer = (state = { revenue: null, loading: false, error: null }, action) => {
    switch (action.type) {
        case GET_REVENUE_REQUEST:
            return { ...state, loading: true };
        case GET_REVENUE_SUCCESS:
            return { ...state, loading: false, revenue: action.payload };
        case GET_REVENUE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};