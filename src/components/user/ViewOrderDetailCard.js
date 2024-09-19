import {MdEmail, MdPhone} from "react-icons/md";
import {Link} from "react-router-dom";
import {IoArrowBackSharp} from "react-icons/io5";
import { MdFileDownload } from "react-icons/md";
import api from "../../config/axiosConfig";

const ViewOrderDetailCard = ({orderId, orderDetails}) => {

  const downloadInvoice = async () => {
    try{
      const response = await api.get(`/order/download-invoice/${orderId}`, {
        responseType: 'blob',
      })
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', `invoice_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }catch(error){
      console.log(error)
    }
  }

  const formattedDate = new Date(orderDetails?.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const defaultAddress = orderDetails?.user?.addresses.find(address => address.isDefaultAddress === true);


  console.log("findDefaultAddress", defaultAddress?.address) 

  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Link to="/userProfile/orders">
            <IoArrowBackSharp size={22} />
          </Link>
          <h1 className="text-lg font-semibold">Order Details</h1>
          <span className="text-gray-500">{formattedDate} • {orderDetails?.items?.length} Products</span>
        </div>
        <div className="text-blue-500 font-medium">
          <button className="flex items-center gap-2" onClick={downloadInvoice}>Download Invoice <MdFileDownload size={22} color="gray"/></button>
        </div>
      </div>

      <div className="grid grid-cols-3 border border-gray-200 p-4 rounded-md">
        <div>
          <h2 className="font-semibold mb-2">CUSTOMER DETAILS</h2>
          <p className="text-sm">
            <strong>{orderDetails?.user?.firstName} {orderDetails?.user?.lastName}</strong>
            <br />
            {defaultAddress?.address}
            <br />
            {defaultAddress?.locality}
            <br />
            {defaultAddress?.city} {defaultAddress?.state}
            <br />
            <br />
            <div className="flex items-center gap-2">
              <MdEmail className="text-gray-500" />
              <span>{orderDetails?.user?.email}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <MdPhone className="text-gray-500" />
              <span>{orderDetails?.user?.phoneNumber}</span>
            </div>
          </p>
        </div>

        {/* Shipping Address */}
        <div>
          <h2 className="font-semibold mb-2">SHIPPING ADDRESS</h2>
          <p className="text-sm">
            <strong>{orderDetails?.address?.customerName}</strong>
            <br />
            {orderDetails?.address?.address}
            <br />
            {orderDetails?.address?.locality},{orderDetails?.address?.pinCode}, {orderDetails?.address?.city}, {orderDetails?.address?.state}
            <br />
            <br />
            <div className="flex items-center gap-2">
              <MdEmail className="text-gray-500" />
              <span>{orderDetails?.user?.email}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <MdPhone className="text-gray-500" />
              <span>{orderDetails?.address?.phone}</span>
            </div>
          </p>
        </div>

        {/* Total Summary */}
        <div>
          <h2 className="font-semibold mb-2">TOTAL SUMMARY</h2>
          <div className="text-sm">
            <div className="flex justify-between">
              <span>Price</span>
              <span className="font-medium">₹{orderDetails?.totalPriceAfterDiscount}</span>
            </div>
            {/* <div className="flex justify-between mt-2">
              <span>Coupon Discount</span>
              <span>₹0</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>{}</span>
              <span>₹0</span>
            </div> */}
            <div className="flex justify-between mt-1">
              <span>Shipping</span>
              <span>₹{orderDetails?.deliveryCharge}</span>
            </div>
            <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-lg">₹{orderDetails?.finalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderDetailCard;
