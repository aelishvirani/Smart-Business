// Order.jsx

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdDoneAll } from 'react-icons/io';
import HashLoader from "react-spinners/HashLoader";
import { getOrderDetails, updateOrderToPaid, updateOrderToDelivered } from "../../actions/orderActions";
import './Order.css';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../../constants/orderConstants';
import { Button } from '@chakra-ui/button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Order = ({ match, history }) => {
    const [sdkReady, setsdkReady] = useState(false);
    const orderId = match.params.id;
    const dispatch = useDispatch();
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingpay, success: successPay } = orderPay;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    if (!loading) {
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }
        const addPaypalscript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal ');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.onload = () => {
                setsdkReady(true);
            };
            document.body.appendChild(script);

        };
        if (!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({
                type: ORDER_PAY_RESET
            });
            dispatch({
                type: ORDER_DELIVER_RESET
            });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalscript();
            } else {
                setsdkReady(true);
            }
        }

    }, [dispatch, orderId, successPay, orderPay, successDeliver, userInfo]);

    const successpaymenthandler = (paymentResult) => {
        dispatch(updateOrderToPaid(orderId, paymentResult));
    };

    const deliverhandler = () => {
        dispatch(updateOrderToDelivered(order));
    };



    const generateInvoice = () => {
        // Get the invoice container element
        const invoiceContainer = document.querySelector('.invoice-container');

        // Use html2canvas to capture the content of the invoice container
        html2canvas(invoiceContainer).then(canvas => {
            // Convert the canvas to a data URL
            const imgData = canvas.toDataURL('image/png');

            // Set the width and height of the PDF document
            const pdfWidth = 210;
            const pdfHeight = 297;

            // Create a new instance of jsPDF
            const pdf = new jsPDF('p', 'mm', 'a4');

            // Add the image data to the PDF document
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            // Save the PDF with a filename
            pdf.save('invoice.pdf');
        });
    };

    return loading || loadingDeliver ? (
        <div className='loading-product'>
            <HashLoader color={"#1e1e2c"} loading={loading || loadingDeliver} size={50} />
        </div>
    ) : error ? (
        <h1>{error}</h1>
    ) : (
        <div className="placeorder">
            <Helmet>
                <title>ORDER</title>
            </Helmet>
            <div className="invoice-container">
                <div className="logo-invoice">SMART BUSINESS Invoice</div>
                <h1>Invoice</h1>
                <div className="customer-info">
                    <p><strong>Customer Name:</strong> {order.user.name}</p>
                    <p><strong>Email:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                    <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.cp}, {order.shippingAddress.country}</p>
                    {order.isDelivered ? <p className='paid'>Delivered at : {order.deliveredAt}</p> : <p className='notpaid'>NOT Delivered YET</p>}
                </div>
                <hr />
                <div className="payment-info">
                    <h2>Payment Method</h2>
                    <p><strong>Method:</strong> {order.paymentMethod}</p>
                    {order.isPaid ? <p className='paid'>PAID AT {order.paidAt}</p> : <p className='notpaid'>NOT PAID YET</p>}
                </div>
                <hr />
                <div className="order-items">
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? <p>Your order is empty</p> :
                        <ul>
                            {order.orderItems.map((item, index) => (
                                <li key={index}><span className="item-name"><Link to={`/product/${item.product}`}>{item.name}</Link></span> <b>{item.qty} x &#8377;{item.price} = &#8377;{item.qty * item.price}</b></li>
                            ))}
                        </ul>
                    }
                </div>
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className="calculations">
                        <p><strong>Items:</strong> &#8377;{order.itemsPrice}</p>
                        <p><strong>Shipping:</strong> &#8377;{order.shippingPrice}</p>
                        <p><strong>Tax:</strong> &#8377;{order.taxPrice}</p>
                        <p><strong>Total:</strong> &#8377;{order.totalPrice}</p>
                    </div>
                </div>
                <Button className="generate-invoice" onClick={generateInvoice}>Generate Invoice</Button>
                <div className="order-actions">
                    {!order.isPaid && (
                        <>
                            {loadingpay && <div className='loading-product'><HashLoader color={"#1e1e2c"} loading={loading} size={50} /></div>}
                            {!sdkReady ? <div className='loading-product'><HashLoader color={"#1e1e2c"} loading={loading} size={50} /></div> :
                                <div className='paypal-buttons'>
                                    <PayPalButton className='buttonsp' amount={order.totalPrice} onSuccess={successpaymenthandler} />
                                </div>}
                        </>
                    )}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <Button height="40px" width="200px" size="lg" onClick={deliverhandler} leftIcon={<IoMdDoneAll size='16' />} colorScheme='blue' size="xs" >DELIVERED</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Order;


// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import { PayPalButton } from 'react-paypal-button-v2';
// import { Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
// import { useDispatch, useSelector } from 'react-redux';
// import { IoMdDoneAll } from 'react-icons/io';
// import HashLoader from "react-spinners/HashLoader";
// import { getOrderDetails, updateOrderToPaid, updateOrderToDelivered } from "../../actions/orderActions";
// import './Order.css';
// import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../../constants/orderConstants';
// import { Button } from '@chakra-ui/button';
// import jsPDF from 'jspdf';

// const Order = ({ match, history }) => {
//     const [sdkReady, setsdkReady] = useState(false);
//     const orderId = match.params.id;
//     const dispatch = useDispatch();
//     const orderDetails = useSelector(state => state.orderDetails);
//     const { order, loading, error } = orderDetails;
//     const orderPay = useSelector(state => state.orderPay);
//     const { loading: loadingpay, success: successPay } = orderPay;

//     const orderDeliver = useSelector(state => state.orderDeliver);
//     const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
//     const userLogin = useSelector(state => state.userLogin);
//     const { userInfo } = userLogin;

//     const addDecimals = (num) => {
//         return (Math.round(num * 100) / 100).toFixed(2);
//     };

//     if (!loading) {
//         order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
//     }

//     useEffect(() => {
//         if (!userInfo) {
//             history.push('/login');
//         }
//         const addPaypalscript = async () => {
//             const { data: clientId } = await axios.get('/api/config/paypal ');
//             const script = document.createElement('script');
//             script.type = 'text/javascript';
//             script.async = true;
//             script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
//             script.onload = () => {
//                 setsdkReady(true);
//             };
//             document.body.appendChild(script);

//         };
//         if (!order || successPay || successDeliver || order._id !== orderId) {
//             dispatch({
//                 type: ORDER_PAY_RESET
//             });
//             dispatch({
//                 type: ORDER_DELIVER_RESET
//             });
//             dispatch(getOrderDetails(orderId));
//         } else if (!order.isPaid) {
//             if (!window.paypal) {
//                 addPaypalscript();
//             } else {
//                 setsdkReady(true);
//             }
//         }

//     }, [dispatch, orderId, successPay, orderPay, successDeliver, userInfo]);

//     const successpaymenthandler = (paymentResult) => {
//         dispatch(updateOrderToPaid(orderId, paymentResult));
//     };

//     const deliverhandler = () => {
//         dispatch(updateOrderToDelivered(order));
//     };

//     const generateInvoice = () => {
//         const doc = new jsPDF();
//         // Modify this to generate your invoice content
//         doc.text('Invoice', 10, 10);
//         doc.save('invoice.pdf');
//     };

//     return loading || loadingDeliver ? (
//         <div className='loading-product'>
//             <HashLoader color={"#1e1e2c"} loading={loading || loadingDeliver} size={50} />
//         </div>
//     ) : error ? (
//         <h1>{error}</h1>
//     ) : (
//         <div className="placeorder">
//             <Helmet>
//                 <title>ORDER</title>
//             </Helmet>
//             <div className="informations-placeorder">
//                 {/* Your code for shipping, payment, and order items */}
//             </div>
//             <div className="your-products">
//                 <div className="cart-summ">
//                     {/* Your code for order summary */}
//                 </div>
//                 <div className='bottominfos'>
//                     <h1 className='orderid'>Order : {order._id}</h1>
//                     <Button height="40px" width="200px" size="lg" onClick={generateInvoice} colorScheme='blue' size="xs" >Generate Invoice</Button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Order;
