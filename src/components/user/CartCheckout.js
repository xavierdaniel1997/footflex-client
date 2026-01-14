import React, { useEffect, useState } from "react";
import { MdArrowForward, MdLocalOffer } from "react-icons/md";
import CouponModal from "./CouponModal";
import { useDispatch, useSelector } from "react-redux";
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
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const pricingDetails = useSelector((state) => state.coupons.pricingDetails);

  useEffect(() => {
    dispatch(getCheckoutDetials());
  }, [totalPrice, dispatch]);

  const handleRemoveCoupon = () => {
    dispatch(removeApplayCoupon()).then(() =>
      dispatch(getCheckoutDetials())
    );
  };

  return (
    <div
      className="
        bg-white 
        w-full 
        p-4 sm:p-5 md:p-6 
        rounded-md 
        shadow-sm
      "
    >
      {/* DESKTOP/TABLET Checkout Button (TOP) */}
      {!inPayment && (
        <div
          className="
            hidden sm:flex
            justify-between 
            items-center 
            bg-black 
            text-white 
            p-3 sm:p-4
            text-base sm:text-lg 
            rounded-md 
            mb-6 
            cursor-pointer
          "
          onClick={navigateTo}
        >
          <h1 className="font-bold">{buttonName}</h1>
          <MdArrowForward className="text-xl sm:text-2xl" />
        </div>
      )}

      {/* Promo Toggle */}
      {!inPayment && !inDeliveryDetails && (
        <button
          className="
            flex 
            items-center 
            text-blue-600 
            font-semibold 
            text-sm sm:text-base 
            mb-4
          "
          onClick={() => setShowPrmoInput(!showPrmoInput)}
        >
          <MdLocalOffer className="mr-2 text-lg" />
          USE A PROMO CODE
        </button>
      )}

      {/* Promo Input */}
      {showPrmoInput && (
        <div className="w-full mb-3">
          <input
            type="text"
            placeholder="Enter promo code"
            className="
              w-full 
              px-3 
              py-3 
              border 
              rounded-md 
              text-sm 
              outline-none
            "
          />
        </div>
      )}

      {/* Apply / Remove Coupon */}
      {!inPayment && !inDeliveryDetails && (
        <div className="flex items-center justify-between my-4">
          <div className="flex items-center">
            <MdLocalOffer className="text-gray-600 text-xl" />
            <span className="ml-2 font-semibold text-gray-800 text-sm sm:text-base">
              Apply Coupons
            </span>
          </div>

          {pricingDetails?.couponDiscount === 0 ? (
            <button
              className="
                px-3 py-1 
                font-semibold 
                text-green-600 
                bg-green-50 
                rounded-md 
                text-sm
              "
              onClick={() => setOpen(true)}
            >
              APPLY
            </button>
          ) : (
            <button
              className="
                px-3 py-1 
                font-semibold 
                text-red-600 
                bg-red-50 
                rounded-md 
                text-sm
              "
              onClick={handleRemoveCoupon}
            >
              REMOVE
            </button>
          )}
        </div>
      )}

      {/* Order Summary Title */}
      {!inPayment && (
        <h2 className="text-xl sm:text-2xl font-bold mb-4">ORDER SUMMARY</h2>
      )}

      {/* Summary Items */}
      <div className="space-y-3 mb-2 text-sm sm:text-base">
        <div className="flex justify-between">
          <span>{cartCount} items MRP</span>
          <span>₹ {pricingDetails?.originalTotalPrice}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount MRP</span>
          <span className="text-green-600">-{pricingDetails?.savedTotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Coupon Discount</span>
          <span className="text-green-600">-{pricingDetails?.couponDiscount}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="text-green-600">
            {pricingDetails?.deliveryCharge}
          </span>
        </div>
      </div>

      {/* Total Price */}
      <div className="flex justify-between font-bold text-base sm:text-lg mt-4 mb-2">
        <span>Total</span>
        <span>₹ {pricingDetails?.finalPrice}</span>
      </div>

      {/* MOBILE Checkout Button (BOTTOM) */}
      {!inPayment && (
        <div
          className="
            sm:hidden
            flex 
            justify-between 
            items-center 
            bg-black 
            text-white 
            p-3
            text-base 
            rounded-md 
            mt-3
            cursor-pointer
          "
          onClick={navigateTo}
        >
          <h1 className="font-bold">{buttonName}</h1>
          <MdArrowForward className="text-xl" />
        </div>
      )}

      {/* Coupon Modal */}
      <CouponModal
        open={open}
        onClose={() => setOpen(false)}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default CartCheckout;
