import React, {useEffect, useState} from "react";
import {MdArrowForward, MdLocalOffer} from "react-icons/md";
import CouponModal from "./CouponModal";

const CartCheckout = ({cartCount, totalPrice, navigateTo, buttonName}) => {
  const [showPrmoInput, setShowPrmoInput] = useState(false);
  const [open, setOpen] = useState(false);
  // const [selectedCoupon, setSelectedCoupon] = useState(null);
  // const [discountAmount, setDiscountAmount] = useState(0);
  // const [finalPrice, setFinalPrice] = useState(totalPrice);

  // useEffect(() => {
  //   if (selectedCoupon) {
  //     const discountPercentage = Number(selectedCoupon.discount);
  //     const discount = (totalPrice * discountPercentage) / 100;
   
  //     const maxDiscountAmount = Number(selectedCoupon.maxDiscountAmount);

  //     const maxDiscount = Math.min(discount, maxDiscountAmount);
  
  //     const roundedDiscountAmount = Math.round(maxDiscount);
  //     setDiscountAmount(roundedDiscountAmount);
  
  //     const roundedFinalPrice = Math.round(totalPrice - roundedDiscountAmount);
  //     setFinalPrice(roundedFinalPrice);
  //   } else {
  //     setDiscountAmount(0);
  //     setFinalPrice(totalPrice);
  //   }
  // }, [selectedCoupon, totalPrice]);


  return (
    <div className="bg-white max-w-md mx-auto">
      <div
        className="flex justify-between items-center bg-black text-white p-3 mb-6 cursor-pointer"
        onClick={navigateTo}
      >
        <h1 className="text-xl font-bold">{buttonName}</h1>
        <MdArrowForward className="text-2xl" />
      </div>

      <button
        className="flex items-center text-blue-600 font-bold mb-4"
        onClick={() => setShowPrmoInput(!showPrmoInput)}
      >
        <MdLocalOffer className="mr-2" />
        USE A PROMO CODE
      </button>

      {showPrmoInput && (
        <div className="w-full">
          <input
            type="text"
            placeholder="Enter prom code"
            className="px-2 py-3 w-full border bo outline-none mb-2"
          />
        </div>
      )}

      <div className="flex items-center justify-between my-4">
        <div className="flex items-center">
          <MdLocalOffer className="text-gray-600 text-xl" />
          <span className="ml-2 font-semibold text-gray-800">
            Apply Coupons
          </span>
        </div>
        <button
          className="px-3 py-1 font-semibold text-green-500 bg-green-50"
          onClick={() => setOpen(true)}
        >
          APPLY
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">ORDER SUMMARY</h2>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="">{cartCount} items MRP</span>
          <span>₹ {totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between">
          <span>Coupon Discount</span>
          <span className="text-green-600">discountAmount</span>
        </div>
      </div>

      <div className="flex justify-between font-bold mb-1">
        <span>Total</span>
        <span>₹ {totalPrice}</span>
      </div>
      <p className="text-gray-500 text-sm mb-6">(Inclusive of all taxes)</p>

      {/* <p className="font-bold">ACCEPTED PAYMENT METHODS</p> */}
      <CouponModal
        open={open}
        onClose={() => setOpen(false)}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default CartCheckout;
