

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';


const DailyOrdersChart = () => {
    const selectDailyOrders = (state) => state.orderList.orders;
    const orders = useSelector(selectDailyOrders);
    const [dailyOrdersData, setDailyOrdersData] = useState({});

    useEffect(() => {
        if (orders && orders.length > 0) {
            const dates = orders.map(order => order.createdAt.substring(0, 10));
            const ordersCount = dates.reduce((acc, date) => {
                acc[date] = (acc[date] || 0) + 1;
                return acc;
            }, {});
            const data = {
                labels: Object.keys(ordersCount),
                datasets: [
                    {
                        label: 'Daily Orders',
                        data: Object.values(ordersCount),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }
                ]
            };
            setDailyOrdersData(data);
        }
    }, [orders]);

    return (
        <div>
            <h2>Daily Orders Chart</h2>
            <Line data={dailyOrdersData} />
        </div>
    );
};

export default DailyOrdersChart;
