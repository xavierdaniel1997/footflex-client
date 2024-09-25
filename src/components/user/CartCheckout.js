import React, {useEffect, useState} from "react";
import {MdArrowForward, MdLocalOffer} from "react-icons/md";
import CouponModal from "./CouponModal";
import {useDispatch, useSelector} from "react-redux";
import api from "../../config/axiosConfig";
import { getCheckoutDetials, removeApplayCoupon } from "../../redux/couponSlice";

const CartCheckout = ({
  cartCount,
  totalPrice, 
  navigateTo,
  buttonName,
  inPayment,
  inDeliveryDetails
}) => {
  const [showPrmoInput, setShowPrmoInput] = useState(false);
  const pricingDetails = useSelector((state) => state.coupons.pricingDetails);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(getCheckoutDetials())
  }, [totalPrice, dispatch])

  const handleRemoveCoupon = () => {
    dispatch(removeApplayCoupon())
    .then(() => {
      return dispatch(getCheckoutDetials())
    })
  }

  return (
    <div className="bg-white max-w-md mx-auto">
      {!inPayment &&  <div
        className="flex justify-between items-center bg-black text-white p-3 mb-6 cursor-pointer"
        onClick={navigateTo}
      >
        <h1 className="text-xl font-bold">{buttonName}</h1>
        <MdArrowForward className="text-2xl" />
      </div>}

      {!inPayment && !inDeliveryDetails && <button
        className="flex items-center text-blue-600 font-bold mb-4"
        onClick={() => setShowPrmoInput(!showPrmoInput)}
      >
        <MdLocalOffer className="mr-2" />
        USE A PROMO CODE
      </button>}

      {showPrmoInput && (
        <div className="w-full">
          <input
            type="text"
            placeholder="Enter prom code"
            className="px-2 py-3 w-full border bo outline-none mb-2"
          />
        </div>
      )}

      {!inPayment && !inDeliveryDetails && <div className="flex items-center justify-between my-4">
        <div className="flex items-center">
          <MdLocalOffer className="text-gray-600 text-xl" />
          <span className="ml-2 font-semibold text-gray-800">
            Apply Coupons
          </span>
        </div>
        {pricingDetails?.couponDiscount===0? <button
          className="px-3 py-1 font-semibold text-green-500 bg-green-50"
          onClick={() => setOpen(true)}
        >
          APPLY
        </button>: <button
          className="px-3 py-1 font-semibold text-red-500 bg-red-50"
          onClick={handleRemoveCoupon}
        >
          REMOVE
        </button>}
        {/* <button
          className="px-3 py-1 font-semibold text-green-500 bg-green-50"
          onClick={() => setOpen(true)}
        >
          APPLY
        </button> */}
      </div>}

      {!inPayment &&   <h2 className="text-2xl font-bold mb-4">ORDER SUMMARY</h2>}

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="">{cartCount} items MRP</span>
          <span>₹ {pricingDetails?.originalTotalPrice}</span>
        </div>
       
        <div className="flex justify-between">
          <span>Discount MRP</span>
          <span className="text-green-600">{-pricingDetails?.savedTotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Coupon Discount</span>
          <span className="text-green-600">{-pricingDetails?.couponDiscount}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="text-green-600">{pricingDetails?.deliveryCharge}</span>
        </div>
      </div>

      <div className="flex justify-between font-bold mb-1">
        <span>Total</span>
        <span>₹ {pricingDetails?.finalPrice}</span>
      </div>

      <CouponModal
        open={open}
        onClose={() => setOpen(false)}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default CartCheckout;
