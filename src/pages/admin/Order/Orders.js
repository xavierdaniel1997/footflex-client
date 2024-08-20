import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import {FaCalendarAlt} from "react-icons/fa";
import ReusableTable from "../../../components/admin/ReusableTable";
import api from "../../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [allOrder, setAllOrder] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const columns = [
    {label: "Product Name", field: "productName"},
    {label: "Order Id", field: "orderId"},
    {label: "Date", field: "date"},
    {label: "Payment Method", field: "paymentMethod"},
    {label: "Customer Name", field: "customerName"},
    {label: "Status", field: "status"},
    {label: "Amount", field: "amount"},
    { label: "Total Items", field: "totalItems" }, 
    {label: "Action", field: "action"},
  ];

  const getOrderData = async (currentPage) => {
    try {
      const response = await api.get(`/order/order-lists?page=${currentPage}&limit=${limit}`);
      setAllOrder(response?.data?.orders);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrderData(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const navigate = useNavigate()
  const handleEditOrder = (orderId) => {
    navigate(`/dashboard/editOrder/${orderId}`);
  };

  const orderData = allOrder.map((order) => ({
    productName: (
      <div className="flex items-center gap-2">
        <img
          className="h-12 w-12 object-contain"
          src={order.items[0]?.thumbnail}
          alt={order.items[0]?.productName}
        />
        {order.items[0]?.productName.split(" ").splice(0, 2).join(" ")}{" "}
      </div>
    ),
    orderId: order._id,
    date: new Date(order.createdAt).toLocaleDateString(),
    paymentMethod: (
      <div>
        {order.payment.method==="Cash on Delivery" ? "COD" : ""}
      </div>
    ),
    customerName: `${order?.user?.firstName} ${order?.user?.lastName}`,
    status: order.status,
    amount: `₹${order.totalPrice}`,
    totalItems: (
      <div>
        <span className={`font-semibold ${order?.items?.length===1 ? "text-green-500" : "text-red-500"}`}>{order.items.length} Item</span>
      </div>
    ),
    action: (
      <button className="bg-blue-500 text-white px-2 py-1 rounded"
      onClick={() => handleEditOrder(order?._id)}
      >View</button>
    ),
  }));

  console.log("this is frm the admin order page", allOrder);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-10 py-5 mb-4">
        <div>
          <h1 className="text-2xl font-bold">Order Lists</h1>
          <nav className="text-gray-600 text-sm">Home &gt; Order Lists</nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" />
            <TextField
              label="From"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              size="small"
            />
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" />
            <TextField
              label="To"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
            />
          </div>
          <button className="bg-black text-white p-2 rounded-md">Submit</button>
        </div>
      </div>
      <div className="px-10">
        <ReusableTable columns={columns} data={orderData} 
        page={page}
        rowsPerPage={limit}
        totalCount={totalCount}
        onPageChange={handlePageChange}
        isPagination={true}
        />
      </div>
    </div>
  );
};

export default Orders;
