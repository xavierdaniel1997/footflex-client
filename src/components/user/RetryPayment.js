import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../config/axiosConfig';
import toast from 'react-hot-toast';
import { FaCreditCard } from 'react-icons/fa';


const RetryPayment = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/order/orderDetials/${orderId}`);
        console.log("respone in retry payment", response)
        setOrder(response.data.order);
      } catch (error) {
        console.log('Error fetching order:', error);
        toast.error('Failed to fetch order details');
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleRetryPayment = async () => {
    try {
      const { data } = await api.post("order/create-razorpay-order", {
        totalPrice: order.finalPrice,
        orderId: order._id,
      });

      const options = {
        key: process.env.RZP_KEY_ID,
        amount: order.finalPrice * 100,
        currency: "INR",
        name: "Your Store Name",
        description: "Retry Payment",
        order_id: data.orderId,
        handler: async (response) => {
          const verifyResponse = await api.post("order/retry-payment", {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            orderId: order._id,
          });

          if (verifyResponse.status === 200) {
            toast.success('Payment successful');
            navigate('/userProfile/orders');
          } else {
            toast.error("Failed to confirm payment. Please try again.");
          }
        },
        prefill: {
          name: order.address.customerName,
          email: order.user.email,
          contact: order.address.phone,
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();

      razorpayInstance.on("payment.failed", function (response) {
        toast.error(`Payment failed: ${response.error.description}`);
        razorpayInstance.close();
      });
    } catch (error) {
      console.error("Error retrying payment:", error);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center p-4">
      <div className=" p-6 max-w-md w-full flex flex-col items-center ">
        {/* <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Retry Payment for Order #{orderId}
        </h1> */}
        <p className="text-3xl font-bold text-gray-900 mb-6">
          Total Amount: <span className="text-green-600">₹{order.finalPrice}</span>
        </p>
        <button
          onClick={handleRetryPayment}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-sm shadow-sm hover:bg-blue-700 transition duration-200"
        >
          PAY NOW
        </button>
      </div>
    </div>
  );
};

export default RetryPayment;