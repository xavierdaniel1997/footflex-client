import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../config/axiosConfig';
import ViewOrderDetailCard from '../../components/user/ViewOrderDetailCard';
import OrderStatusBar from '../../components/user/OrderStatusBar';
import ViewOrderProductTable from '../../components/user/ViewOrderProductTable';

const ViewOrderDetials = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const { orderId } = useParams();

  const getOrderDetails = async () => {
    try {
      const response = await api.get(`/order/orderById/${orderId}`);
      setOrderDetails(response?.data?.order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <div className='px-32 flex flex-col items-center'>
      {/* Apply max-w-4xl for consistent width */}
      <div className='w-full max-w-4xl'>
        <ViewOrderDetailCard />
      </div>
      <div className='w-full max-w-4xl mt-8'>
        <OrderStatusBar/>
      </div>
      <div className='w-full max-w-4xl mt-8 px-7'>
        <ViewOrderProductTable/>
      </div>
    </div>
  );
};

export default ViewOrderDetials;
