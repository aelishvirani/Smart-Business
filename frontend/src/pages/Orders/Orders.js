import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { listOrders, updateOrderToPaid, updateOrderToDelivered } from '../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import HashLoader from "react-spinners/HashLoader";
import { Helmet } from 'react-helmet';
import { Button, Table, Thead, Tbody, Tr, Th, Td, Stack, Box, Checkbox } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';

const Orders = ({ history }) => {
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList || {}; // Ensure orderList is not undefined
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const location = useLocation(); // Initialize useLocation hook
    const queryParams = new URLSearchParams(location.search); // Retrieve query parameters
    const deliveredParam = queryParams.get('delivered'); // Check if 'delivered' query parameter exists
    const [stylen, setStylen] = useState(`marginTop : "-88px"`)

    const [filters, setFilters] = useState({
        paid: false,
        delivered: deliveredParam === 'true'
    });

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);

    const markAsPaid = (orderId) => {
        dispatch(updateOrderToPaid(orderId));
    };

    const markAsDelivered = (orderId) => {
        dispatch(updateOrderToDelivered(orderId));
    };

    const handleFilterChange = (event) => {
        const { name, checked } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: checked
        }));
    };

    const filteredOrders = orders ? orders.filter(order => { // Check if orders is not undefined
        if (filters.paid && !order.isPaid) return false;
        if (filters.delivered && !order.isDelivered) return false;
        return true;
    }) : [];

    return (
        <div className='Users'>
            <Helmet>
                <title>Orders</title>px
            </Helmet>
            <h1 className='titlepanel' style={{ marginTop: "-88px" }}> Orders :</h1>

            {/* filters */}
            <div style={{ marginBottom: '20px' }}>
                <Checkbox isChecked={filters.paid} name="paid" onChange={handleFilterChange}>Paid</Checkbox>
                <Checkbox isChecked={filters.delivered} name="delivered" onChange={handleFilterChange}>Delivered</Checkbox>
            </div>

            {
                loading ? (
                    <div className='loading'>
                        <HashLoader color={"#1e1e2c"} loading={loading} size={40} />
                    </div>
                ) : error ? (
                    <h1>Error: {error}</h1>
                ) : (
                    <Box overflowX='auto'>
                        <Table className='tableusers' variant="striped">
                            <Thead>
                                <Tr>
                                    <Th textAlign='center' w='20%'>ID</Th>
                                    <Th textAlign='center' w='10%'>User</Th>
                                    <Th textAlign='center' w='15%'>Date</Th>
                                    <Th textAlign='center' w='10%'>TOTAL</Th>
                                    <Th textAlign='center' w='10%'>PAID</Th>
                                    <Th textAlign='center' w='10%'>Delivered</Th>
                                    <Th textAlign='center' w='10%'>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredOrders.map(order => (
                                    <Tr key={order._id}>
                                        <Td>{order._id}</Td>
                                        <Td>{order.user && order.user.name}</Td>
                                        <Td>{order.createdAt ? order.createdAt.substring(0, 10) : ''}</Td>
                                        <Td>{order.totalPrice} &#8377;</Td>
                                        <Td>{order.isPaid ? <div className='paid'>{order.paidAt ? order.paidAt.substring(0, 10) : 'Yes'}</div> : <div className='notpaid'>NO</div>}</Td>
                                        <Td>{order.isDelivered ? <div className='paid'>{order.deliveredAt ? order.deliveredAt.substring(0, 10) : ''}</div> : <div className='notpaid'>NO</div>}</Td>
                                        <Td>
                                            {!order.isDelivered && (
                                                <Button style={{ background: "rgb(39, 145, 15)", color: "white", marginBottom: "10px" }} size="xs" onClick={() => markAsDelivered(order._id)}>Mark as Delivered</Button>
                                            )}
                                            <Stack>
                                                <Link to={`/order/${order._id}`}>
                                                    <Button leftIcon={<AiOutlineEdit size='16' />} colorScheme='blue' size="xs">Details</Button>
                                                </Link>
                                            </Stack>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                )
            }
        </div >
    );
}

export default Orders;




// import React, { useEffect } from 'react'
// import { listOrders, updateOrderToPaid, updateOrderToDelivered } from '../../actions/orderActions';
// import { useDispatch, useSelector } from 'react-redux';
// import HashLoader from "react-spinners/HashLoader";
// import { Helmet } from 'react-helmet';


// import {
//     Button, Input, Table, Thead,
//     Tbody,
//     Tr,
//     Th,
//     Td,
//     Stack,
//     Box,
// } from "@chakra-ui/react"
// import { Link } from 'react-router-dom';
// import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';

// const Orders = ({ history }) => {
//     const dispatch = useDispatch()
//     const orderList = useSelector(state => state.orderList)
//     const { loading, error, orders } = orderList
//     const userLogin = useSelector(state => state.userLogin)
//     const { userInfo } = userLogin

//     useEffect(() => {
//         if (userInfo && userInfo.isAdmin) {
//             dispatch(listOrders())
//         } else {
//             history.push('/login')
//         }
//     }, [dispatch, history, userInfo])
//     const markAsPaid = (orderId) => {
//         dispatch(updateOrderToPaid(orderId));
//     };

//     const markAsDelivered = (orderId) => {
//         dispatch(updateOrderToDelivered(orderId));
//     };
//     return (
//         <div className='Users'>
//             <Helmet>
//                 <title>Orders</title>
//             </Helmet>
//             <h1 className='titlepanel'> Orders :</h1>

//             {/* filters */}
//             {loading ? <div className='loading'>
//                 <HashLoader color={"#1e1e2c"} loading={loading} size={40} />
//             </div> :
//                 error ? <h1>error</h1> :
//                     <Box overflowX='auto'>
//                         <Table className='tableusers' variant="striped">
//                             <Thead>
//                                 <Tr>
//                                     <Th textAlign='center' w='10%'>ID</Th>
//                                     <Th textAlign='center' w='20%'>User</Th>
//                                     <Th textAlign='center' w='20%'>Date</Th>
//                                     <Th textAlign='center' w='5%'>TOTAL</Th>
//                                     <Th textAlign='center' w='10%'>PAID</Th>
//                                     <Th textAlign='center' w='10%'>Deliverd</Th>

//                                 </Tr>
//                             </Thead>
//                             <Tbody>
//                                 {orders.map(order => (
//                                     <Tr key={order._id}>
//                                         <Td>{order._id}</Td>
//                                         <Td>{order.user && order.user.name}</Td>
//                                         <Td>{order.createdAt ? order.createdAt.substring(0, 10) : ''}</Td>
//                                         <Td>{order.totalPrice}</Td>

//                                         <Td>{order.isPaid ? <div className='paid'>{order.paidAt ? order.paidAt.substring(0, 10) : 'Yes'}</div> : <div className='notpaid'>NO</div>}</Td>
//                                         <Td>{order.isDelivered ? <div className='paid'>{order.deliveredAt ? order.deliveredAt.substring(0, 10) : ''}</div> : <div className='notpaid'>NO</div>}</Td>

//                                         <Td>
//                                             {!order.isPaid && (
//                                                 <Button onClick={() => markAsPaid(order._id)}>Mark as Paid</Button>
//                                             )}
//                                             {!order.isDelivered && (
//                                                 <Button onClick={() => markAsDelivered(order._id)}>Mark as Delivered</Button>
//                                             )}
//                                             <Stack>
//                                                 <Link to={`/order/${order._id}`}>
//                                                     <Button leftIcon={<AiOutlineEdit size='16' />} colorScheme='blue' size="xs"  >Details</Button>
//                                                 </Link>
//                                             </Stack>
//                                         </Td>

//                                     </Tr>
//                                 ))}
//                             </Tbody>
//                         </Table>
//                     </Box>
//             }

//         </div>
//     )
// }

// export default Orders
