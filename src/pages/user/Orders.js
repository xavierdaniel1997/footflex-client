import React, {useEffect, useState} from "react";
import OrderCard from "../../components/user/OrderCard";
import api from "../../config/axiosConfig";

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

  console.log("this is from the order page", myOrders);

  return (
    <div>
      <div className="py-3">
        {myOrders?.map((order) =>
          order?.items?.map((item) => (
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
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
