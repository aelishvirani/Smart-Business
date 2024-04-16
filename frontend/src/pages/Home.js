import React, { useState, useEffect } from 'react'
import Slider from '../components/Slider'
import Cardscg from '../components/Cardscg'
import CgDiv from '../components/CgDiv'
import ProductsC from '../components/ProductsC'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Dashboard from "./Dashboard/Dashboard"
const Home = () => {
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)

    const { error, user } = userDetails
    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin
    console.log(userInfo)
    return (
        <>
            <Helmet>
                <title>SMART BUSINESS</title>
            </Helmet>
            {userInfo && userInfo.isAdmin ? <Dashboard /> : <div>
                <Slider />
                <div className="cards">
                    <Cardscg title='Women' />
                    <Cardscg title='Men' />
                    <Cardscg title='Accessoires' />
                </div>
                <CgDiv />
                <ProductsC />
            </div>}

        </>
    )
}

export default Home
