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
      const response = await api.get(`/order/orderDetials/${orderId}`);
      setOrderDetails(response?.data?.order);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentStep = (status) => {
    switch (status) {
      case 'Pending':
        return 1;
      case 'Processing':
        return 2;
      case 'Shipped':
        return 3;
      case 'On the way':
        return 4;
      case 'Delivered':
        return 5;
      case 'Cancelled':
        return 6;
      default:
        return 1;
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  const currentStep = getCurrentStep(orderDetails?.status);

  return (
    <div className='px-32 flex flex-col items-center'>
      <div className='w-full max-w-4xl'>
        <ViewOrderDetailCard orderId={orderId} orderDetails={orderDetails}/>
      </div>
      <div className='w-full max-w-4xl mt-8'>
        <OrderStatusBar currentStep={currentStep}/>
      </div>
      <div className='w-full max-w-4xl mt-8 px-7'>
        <ViewOrderProductTable orderDetails={orderDetails}/>
      </div>
    </div>
  );
};

export default ViewOrderDetials;
