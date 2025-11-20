import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCart } from "../../redux/cartSlice";
import { applyCouponPricingDetails } from "../../redux/couponSlice";

const CartCard = ({ cartItem, stockStatus }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(cartItem?.size);
  const [availableQty, setAvailableQty] = useState([]);
  const [selectedQty, setSelectedQty] = useState(cartItem?.quantity);

  const handleRemoveCartItem = () => {
    const productId = cartItem?.productId?._id;
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    const selectedSizeObj = cartItem?.productId?.sizes?.find(
      (size) => size.size === selectedSize
    );
    if (selectedSizeObj) {
      const maxQty = selectedSizeObj.stock > 5 ? 5 : selectedSizeObj.stock;
      setAvailableQty(Array.from({ length: maxQty }, (_, i) => i + 1));
      setSelectedQty(cartItem?.quantity);
    }
  }, [selectedSize]);

  const handleSizeChange = (e) => setSelectedSize(e.target.value);

  const handleQtyChange = (e) => setSelectedQty(Number(e.target.value));

  const handleUpdateCart = () => {
    dispatch(
      updateCart({
        productId: cartItem?.productId?._id,
        size: selectedSize,
        quantity: selectedQty,
      })
    );
  };

  useEffect(() => {
    handleUpdateCart();
  }, [selectedSize, selectedQty]);

  const itemPrice =
    cartItem?.discountedPrice || cartItem?.productId?.salePrice;
  const finalPrice = itemPrice * selectedQty;

  return (
    <div className="border rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row gap-4 sm:gap-6">

      {/* IMAGE */}
      <div className="w-full sm:w-1/3">
        <div className="w-full h-48 sm:h-52 rounded-lg overflow-hidden bg-slate-100">
          <img
            src={cartItem?.productId?.thumbnail}
            alt="product"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* DETAILS */}
      <div className="flex-1 flex flex-col justify-between">

        {/* TOP ROW */}
        <div className="flex justify-between items-start">

          {/* LEFT */}
          <div className="w-2/3">
            <h2 className="font-bold text-lg uppercase">
              {cartItem?.productId?.brand?.brandName}
            </h2>

            <p className="text-gray-600 text-sm">
              {cartItem?.productId?.productName}
            </p>

            <p className="text-yellow-600 font-semibold text-sm mt-1">
              Low in stock
            </p>

            {/* SIZE + QTY */}
            <div className="flex gap-3 mt-3 flex-wrap">

              {/* SIZE */}
              <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
                <label className="text-sm">Size</label>
                <select
                  className="outline-none bg-gray-100 text-sm"
                  value={selectedSize}
                  onChange={handleSizeChange}
                >
                  {cartItem?.productId?.sizes?.map((size) => (
                    <option key={size._id} value={size.size}>
                      {size.size}
                    </option>
                  ))}
                </select>
              </div>

              {/* QTY */}
              <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
                <label className="text-sm">Qty</label>
                <select
                  className="outline-none bg-gray-100 text-sm"
                  value={selectedQty}
                  onChange={handleQtyChange}
                >
                  {availableQty.map((quantity) => (
                    <option key={quantity} value={quantity}>
                      {quantity}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* RIGHT PRICE + DELETE */}
          <div className="text-right">
            <div className="flex items-center justify-end gap-2">

              {/* ORIGINAL / DISCOUNTED PRICE */}
              <p
                className={`font-bold ${
                  cartItem?.discountedPrice ? "text-green-500 line-through" : "text-green-500"
                }`}
              >
                ₹
                {cartItem?.discountedPrice
                  ? cartItem?.originalPrice
                  : finalPrice}
              </p>

              {/* DISCOUNTED FINAL PRICE */}
              {cartItem.discountedPrice && (
                <div className="flex items-center gap-1">
                  <p className="text-red-500 font-bold">{finalPrice}</p>
                  <p className="text-gray-600 text-sm">
                    {cartItem?.offerPercentage}% OFF
                  </p>
                </div>
              )}

              {/* DELETE */}
              <button
                className="text-gray-500 hover:text-black"
                onClick={handleRemoveCartItem}
              >
                <MdDeleteForever size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* GENDER + STOCK MESSAGE */}
        <div className="flex items-center gap-4 mt-3">
          <h2
            className={`font-semibold px-2 py-1 rounded-md text-sm
              ${
                cartItem?.productId?.gender === "Men" &&
                "bg-blue-100 text-blue-600"
              }
              ${
                cartItem?.productId?.gender === "Women" &&
                "bg-pink-100 text-pink-600"
              }
              ${
                cartItem?.productId?.gender === "Kids" &&
                "bg-green-100 text-green-600"
              }
            `}
          >
            {cartItem?.productId?.gender}
          </h2>

          {stockStatus && !stockStatus.inStock && (
            <p className="text-red-500 font-semibold text-sm">
              {stockStatus.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
