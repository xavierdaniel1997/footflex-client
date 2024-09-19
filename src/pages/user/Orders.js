import React, {useEffect, useState} from "react";
import OrderCard from "../../components/user/OrderCard";
import api from "../../config/axiosConfig";
import {useNavigate} from "react-router-dom";

const Orders = () => {
  const [myOrders, setMyOrders] = useState([]);

  const getMyOrders = async () => {
    try {
      const response = await api.get("/order/my-orders");
      setMyOrders(response.data.order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  const handleCancelOrder = async (orderId, productId) => {
    try {
      const response = await api.post("order/cancel-order", {
        orderId,
        productId,
      });
      getMyOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturnOrder = async (orderId, productId, reason) => {
    console.log("Return order with ID:", orderId, productId, reason);
    try {
      await api.post("/order/return-order", {orderId, productId, reason});
      getMyOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const handleViewOrderDetials = (orderId) => {
    navigate(`/view-order-detial/${orderId}`);
  };


  const handleRetryPayment = (orderId) => {
    navigate(`/payment-failed/${orderId}`)
  }

  return (
    <div>
      <div className="py-3">
        <h1 className="text-2xl font-bold my-2">My Orders</h1>
        {myOrders?.map((order) => (
          <div key={order._id} className="mb-4">
            <div className="flex justify-start gap-3 items-center pb-1 pt-2">
              <h2 className="font-semibold">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </h2>
              {order.status === "Payment Failed" ? (
             
                <button className="text-red-600 hover:text-red-500 font-semibold"
                onClick={() => handleRetryPayment(order?._id)}>RETRY PAYMENT</button>
              ) : (
                <button
                className="text-blue-600 hover:text-blue-500"
                onClick={() => handleViewOrderDetials(order?._id)}
              >
                View Detials
              </button>
              )}
            </div>
            {order?.items?.map((item) => (
              <OrderCard
                key={item._id}
                productName={item.productName}
                productBrand={item.productBrand}
                size={item.size}
                quantity={item.quantity}
                totalPrice={item.totalPrice}
                status={item.status}
                thumbnail={item.thumbnail}
                deliveryStatus={order.status}
                paymentMethod={order.payment.method}
                orderDate={order.createdAt}
                handleCancelOrder={handleCancelOrder}
                handleReturnOrder={handleReturnOrder}
                orderId={order._id}
                productId={item.product}
                itemStatus={item.status}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
