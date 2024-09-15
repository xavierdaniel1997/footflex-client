import {MdEmail, MdPhone} from "react-icons/md";
import {Link} from "react-router-dom";
import {IoArrowBackSharp} from "react-icons/io5";
import { MdFileDownload } from "react-icons/md";

const ViewOrderDetailCard = () => {
  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Link to="/userProfile/orders">
            <IoArrowBackSharp size={22} />
          </Link>
          <h1 className="text-lg font-semibold">Order Details</h1>
          <span className="text-gray-500">April 24, 2021 • 3 Products</span>
        </div>
        <div className="text-blue-500 font-medium">
          <button className="flex items-center gap-2">Download Invoice <MdFileDownload size={22} color="gray"/></button>
        </div>
      </div>

      <div className="grid grid-cols-3 border border-gray-200 p-4 rounded-md">
        <div>
          <h2 className="font-semibold mb-2">CUSTOMER DETAILS</h2>
          <p className="text-sm">
            <strong>Sourabh</strong>
            <br />
            Flat B1301, New Road, Kadubasnahalli,
            <br />
            Updated Address, Bangalore Division,
            <br />
            Karnataka
            <br />
            <br />
            <div className="flex items-center gap-2">
              <MdEmail className="text-gray-500" />
              <span>abhi@ecomm.in</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <MdPhone className="text-gray-500" />
              <span>+91-63284 73843</span>
            </div>
          </p>
        </div>

        {/* Shipping Address */}
        <div>
          <h2 className="font-semibold mb-2">SHIPPING ADDRESS</h2>
          <p className="text-sm">
            <strong>Dianne Russell</strong>
            <br />
            4140 Parker Rd. Allentown,
            <br />
            New Mexico, 31134
            <br />
            <br />
            <div className="flex items-center gap-2">
              <MdEmail className="text-gray-500" />
              <span>dianne.russell@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <MdPhone className="text-gray-500" />
              <span>(671) 555-0110</span>
            </div>
          </p>
        </div>

        {/* Total Summary */}
        <div>
          <h2 className="font-semibold mb-2">TOTAL SUMMARY</h2>
          <div className="text-sm">
            <div className="flex justify-between">
              <span>Rent</span>
              <span className="font-medium">₹877</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Coupon Discount</span>
              <span>₹0</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Refundable Deposit</span>
              <span>₹0</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Shipping</span>
              <span>₹299</span>
            </div>
            <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-lg">₹1176</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderDetailCard;
