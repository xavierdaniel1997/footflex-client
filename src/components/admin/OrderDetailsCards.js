import React, {useState} from "react";
import {FaCalendarAlt, FaUser, FaTruck, FaCreditCard} from "react-icons/fa";

const statusColors = {
  Pending: {bg: "bg-yellow-200", text: "text-yellow-700"},
  Processing: {bg: "bg-blue-200", text: "text-blue-700"},
  Shipped: {bg: "bg-purple-200", text: "text-purple-700"},
  Delivered: {bg: "bg-green-200", text: "text-green-700"},
  Cancelled: {bg: "bg-red-200", text: "text-red-700"},
  Returned: {bg: "bg-gray-200", text: "text-gray-700"},
  "Partially Cancelled": {bg: "bg-red-100", text: "text-red-600"},
  "Partially Returned": {bg: "bg-gray-100", text: "text-gray-600"},
};

const orderStatus = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned",
  "Partially Cancelled",
  "Partially Returned",
];

const paymentStatus = [
  "Pending",
  "Completed",
  "Failed",
  "Refunded",
  "Partially Refunded",
];

const OrderDetailsCards = ({orderData, onUpdateStatus}) => {
  const [paymentSts, setPaymentSts] = useState(orderData?.payment?.status);
  const [orderSts, setOrderSts] = useState(orderData?.status);

  const handleSave = () => {
    onUpdateStatus(orderSts, paymentSts);
  };

  const currentStatusColors = statusColors[orderSts] || statusColors["Pending"];
  const isCancelled = orderData?.status === "Cancelled";

  const formattedDate = new Date(orderData?.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  console.log(formattedDate);

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">Orders ID: {orderData?._id}</h2>
          <span
            className={`${currentStatusColors.bg} ${currentStatusColors.text} px-2 py-1 rounded text-sm w-fit`}
          >
            {orderData?.status}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-500" />
            <span className="text-sm text-gray-600">{formattedDate}</span>
          </div>
          <select
            className="border rounded px-3 py-2 outline-none"
            value={orderSts}
            // defaultValue={orderStatus}
            disabled={isCancelled}
            onChange={(e) => setOrderSts(e.target.value)}
          >
            {orderStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="border rounded-lg p-4 bg-white">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 p-2 rounded-lg mr-3">
              <FaUser className="text-white" />
            </div>
            <div>
              <h3 className="font-bold">Customer</h3>
              <p className="text-sm text-gray-600">
                Full Name: {orderData?.user?.firstName}{" "}
                {orderData?.user?.lastName}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">
            Email: {orderData?.user?.email}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Phone: {orderData?.user?.phoneNumber}
          </p>
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 p-2 rounded-lg mr-3">
              <FaTruck className="text-white" />
            </div>
            <div>
              <h3 className="font-bold">Deliver to</h3>
              <p className="text-sm text-gray-600">
                Address: {orderData?.address?.customerName},{" "}
                {orderData?.address?.address}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">
            Place: {orderData?.address?.locality}, {orderData?.address?.city},{" "}
            {orderData?.address?.state} {orderData?.address?.pinCode}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Phone: {orderData?.address?.phone},{" "}
            <span className="text-green-600">
              {orderData?.address?.typeofPlace}
            </span>
          </p>
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 p-2 rounded-lg mr-3">
              <FaCreditCard className="text-white" />
            </div>
            <div>
              <h3 className="font-bold">Payment Info</h3>
              <p className="text-sm text-gray-600">
                Payment Method : {orderData?.payment?.method}
              </p>
            </div>
          </div>
          <p className="mb-1 font-semibold">
            <select
              value={paymentSts}
              className="w-28 outline-none"
              onChange={(e) => setPaymentSts(e.target.value)}
            >
              {/* <option>{orderData?.payment?.status}</option> */}
              {paymentStatus.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </p>
          <p className="text-sm text-gray-600">
            Phone: {orderData?.user?.phoneNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsCards;
