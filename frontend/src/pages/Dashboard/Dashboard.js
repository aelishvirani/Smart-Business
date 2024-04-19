import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Thead, Tbody, Tr, Th, Td, Stack, Box, Checkbox } from "@chakra-ui/react";
import { listOrders } from '../../actions/orderActions';
import { listProducts } from '../../actions/productActions';
import { ListUsers } from '../../actions/userActions';
import './Dashboard.css';

const Dashboard = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [totalOrdersCount, setTotalOrdersCount] = useState(0);
    const [deliveredOrdersCount, setDeliveredOrdersCount] = useState(0);
    const [undeliveredOrdersCount, setUndeliveredOrdersCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalUsersCount, setTotalUsersCount] = useState(0);

    useEffect(() => {
        dispatch(listOrders());
        dispatch(listProducts());
        dispatch(ListUsers());
    }, [dispatch]);

    const orderListState = useSelector((state) => state.orderList);
    const productListState = useSelector((state) => state.productList);
    const userListState = useSelector((state) => state.userList);

    const { loading: orderLoading, orders } = orderListState;
    const { loading: productLoading, products } = productListState;
    const { loading: userLoading, users } = userListState;

    useEffect(() => {
        if (!productLoading && !orderLoading && products && orders) {
            fetchTopSellingProducts();
            calculateOrdersData();
        }
    }, [productLoading, orderLoading, userLoading, products, orders, users]);

    const fetchTopSellingProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products/top');
            if (!response.ok) {
                throw new Error('Failed to fetch top selling products');
            }
            const data = await response.json();
            setTopSellingProducts(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching top selling products:', error);
        }
    };

    const calculateOrdersData = () => {
        const totalOrders = orders ? orders.length : 0;
        const deliveredOrders = orders ? orders.filter((order) => order.isDelivered).length : 0;
        const undeliveredOrders = orders ? orders.filter((order) => !order.isDelivered).length : 0;
        const revenue = orders ? orders.filter(order => order.isPaid).reduce((acc, order) => acc + order.totalPrice, 0) : 0;
        const totalUsers = users ? users.length : 0;
        setTotalOrdersCount(totalOrders);
        setDeliveredOrdersCount(deliveredOrders);
        setUndeliveredOrdersCount(undeliveredOrders);
        setTotalRevenue(revenue);
        setTotalUsersCount(totalUsers); // Assuming you will have a way to fetch and set total users count
    };

    // Function to navigate to a specific route
    const handleCardClick = (route) => {
        history.push(route);
    };

    return (
        <div className='dashboard'>
            <p className='dashboardheading'>Dashboard :</p>

            {/* top heading card */}
            <div className='allcard'>
                <div className='cardstyle' style={{ backgroundColor: "rgb(182, 204, 240)" }} onClick={() => handleCardClick('/admin/orderlist')}>
                    <h1 className='cardvalue'>{totalOrdersCount}</h1>
                    <p className='cardname'>Total orders</p>
                </div>
                <div className='cardstyle' style={{ backgroundColor: "rgb(211, 242, 194)" }} onClick={() => handleCardClick('/admin/orderlist?delivered=true')}>
                    <h1 className='cardvalue'>{deliveredOrdersCount}</h1>
                    <p className='cardname'>Delivered Orders</p>
                </div>
                {/* <div className='cardstyle' onClick={() => handleCardClick('/admin/orderlist?delivered=false')}>
                    <h1 className='cardvalue'>{undeliveredOrdersCount}</h1>
                    <p className='cardname'>Undelivered Orders</p>
                </div> */}
                <div className='cardstyle' style={{ backgroundColor: "rgb(234, 235, 169)" }}>
                    <h1 className='cardvalue'>{totalRevenue} &#8377;</h1>
                    <p className='cardname'>Revenue</p>
                </div>
                <div className='cardstyle' style={{ backgroundColor: "rgb(169, 233, 235)" }} onClick={() => handleCardClick('/admin/userlist')}>
                    <h1 className='cardvalue'>{totalUsersCount}</h1>
                    <p className='cardname'>Total Users</p>
                </div>
            </div>
            <br /><br />
            <div>
                <h1 className='topselling'>Top Selling Products</h1>
                <br />
                <Table variant="striped">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Category</Th>
                            <Th>Price</Th>
                            <Th>Sales</Th>
                            <Th>Launch Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {topSellingProducts.map(product => (
                            <Tr key={product._id}>
                                <Td>{product.name}</Td>
                                <Td>{product.category.join(' | ')}</Td>
                                <Td>{product.price}</Td>
                                <Td>{product.sales}</Td>
                                <Td>{product.createdAt ? product.createdAt.substring(0, 10) : ''}</Td>
                            </Tr>


                        ))}
                    </Tbody>
                </Table>
            </div>
        </div>
    );
};

export default Dashboard;

// import React from 'react';
// import './Dashboard.css'
// function Dashboard() {
//     return (
//         <div className='dashboard'>
//             <h1>Hello world</h1>

//             {/* top  heading card */}
//             <div className='allcard'>
//                 <div className='cardstyle'>
//                     <h1 className='cardvalue'>25</h1>
//                     <p className='cardname'>Total orders</p>
//                 </div>
//                 <div className='cardstyle'>
//                     <h1 className='cardvalue'>15</h1>
//                     <p className='cardname'>Total Delivered</p>
//                 </div>
//                 <div className='cardstyle'>
//                     <h1 className='cardvalue'>500 &#8377;</h1>
//                     <p className='cardname'>Total Revenue</p>
//                 </div>
//                 <div className='cardstyle'>
//                     <h1 className='cardvalue'>10</h1>
//                     <p className='cardname'>Total Users</p>
//                 </div>
//             </div>
//             {/* charts */}
//             <div>


//             </div>

//         </div>

//     )
// }
// export default Dashboard

