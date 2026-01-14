import React, { useEffect, useState } from "react";
import BreadCrumbWithButton from "../../../components/admin/BreadCrumbWithButton";
import OrderDetailsCards from "../../../components/admin/OrderDetailsCards";
import OrderedProductTable from "../../../components/admin/OrderedProductTable";
import {useParams} from "react-router-dom";
import api from "../../../config/axiosConfig";
import toast from "react-hot-toast";

const EditOrder = () => {
  const [orderData, setOrderData] = useState(null)
  const {orderId} = useParams();

  const getOrderDetials = async () => {
    try{
        const response = await api.get(`/order/orderById/${orderId}`)
        setOrderData(response?.data?.order)
    }catch(error){
        console.log(error)
    }
  }
  useEffect(() => {
    getOrderDetials()
  }, [])

  const handleUpdateStatus = async (newOrderStatus, newPaymentStatus) => {
    try {
      const response = await api.put(`order/orderUpdate/${orderId}`, {
        orderStatus: newOrderStatus,
        paymentStatus: newPaymentStatus,
      });
      if (response.data.message === "Order updated successfully") {
        toast.success("Status updated")
        getOrderDetials()
      }
    } catch (error) {
      console.log(error);
    } 
  };

  const updateOrderItemStatus = async (orderId, productId, newStatus) => {
    try {
      const response = await api.put(`order/update-order-item-status/${orderId}/${productId}`, { status: newStatus });
      toast.success(response?.data?.message)
      getOrderDetials()
    } catch (error) {
      console.error("Error updating item status:", error);
      toast.error("Failed to update item status");
    }
  };

  console.log("this is frm the edit order page", orderData)
  return (
    <div className="flex flex-col">
      <BreadCrumbWithButton
        componentLocation={"Order Detials"}
        location={"Home > Order List > Order Details"}
        noButton={false}
        goback={"/dashboard/orders"}
      />
      <div className="px-10">
        <OrderDetailsCards orderData={orderData} onUpdateStatus={handleUpdateStatus}/>
        <p className="text-xl font-bold mb-3">Product Details</p>
        <OrderedProductTable orderData={orderData} updateOrderItemStatus={updateOrderItemStatus}/>
      </div>
    </div>
  );
};

export default EditOrder;
