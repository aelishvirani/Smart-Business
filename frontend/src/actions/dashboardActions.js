// actions/dashboardActions.js

import axios from 'axios';
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
    GET_REVENUE_FAIL
} from '../constants/dashBoardConstants';

export const fetchOverviewData = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_OVERVIEW_DATA_REQUEST });

        const { data } = await axios.get('/api/dashboard/overview');

        dispatch({
            type: FETCH_OVERVIEW_DATA_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_OVERVIEW_DATA_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const fetchRecentOrders = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_RECENT_ORDERS_REQUEST });

        const { data } = await axios.get('/api/dashboard/recent-orders');

        dispatch({
            type: FETCH_RECENT_ORDERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_RECENT_ORDERS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const fetchTopSellingProducts = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_TOP_SELLING_PRODUCTS_REQUEST });

        const { data } = await axios.get('/api/dashboard/top-selling-products');

        dispatch({
            type: FETCH_TOP_SELLING_PRODUCTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_TOP_SELLING_PRODUCTS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const fetchUserActivity = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_USER_ACTIVITY_REQUEST });

        const { data } = await axios.get('/api/dashboard/user-activity');

        dispatch({
            type: FETCH_USER_ACTIVITY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_USER_ACTIVITY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const getRevenue = () => async (dispatch) => {
    try {
        dispatch({ type: GET_REVENUE_REQUEST });

        const { data } = await axios.get('/api/dashboard/revenue');

        dispatch({
            type: GET_REVENUE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_REVENUE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};