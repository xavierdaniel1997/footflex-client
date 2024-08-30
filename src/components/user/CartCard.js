import React, {useEffect, useState} from "react";
import {MdDeleteForever} from "react-icons/md";
import {useDispatch} from "react-redux";
import {removeFromCart, updateCart} from "../../redux/cartSlice";

const CartCard = ({cartItem, stockStatus}) => {
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

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleQtyChange = (e) => {
    setSelectedQty(Number(e.target.value));
  };

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

  const itemPrice = Number(cartItem?.productId?.salePrice);
  const totalPrice = itemPrice * selectedQty || 1;
  // console.log("this is from the cart card", cartItem);
  // console.log("this is from the cart card quantity", availableQty);

  return (
    <div className="border rounded-lg flex">
      {/* Image Section */}
      <div className="w-1/3 h-52 px-4 bg-slate-100">
        <img
          src={cartItem?.productId?.thumbnail}
          alt="Product"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Details Section */}
      <div className="flex-1 ml-4 flex flex-col justify-between p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2
              className="font-bold text-lg"
              style={{textTransform: "uppercase"}}
            >
              {cartItem?.productId?.brand?.brandName}
            </h2>
            <p className="text-gray-600">{cartItem?.productId?.productName}</p>

            {/* size and quatity updating */}
            <p className="text-yellow-600 font-semibold">Low in stock</p>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 rounded-sm max-w-fit bg-gray-100 px-1 my-2">
                <label>Size</label>
                <select
                  className="outline-none bg-gray-100"
                  name=""
                  id=""
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

              <div className="flex items-center gap-2 rounded-sm max-w-fit bg-gray-100 px-1 my-2">
                <label>Qty :</label>
                <select
                  className="outline-none bg-gray-100"
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
          <div className="text-right">
            <div className="flex items-center space-x-2">
              {/* <p className="line-through text-gray-500">₹4 599.00</p> */}
              <p className="text-red-500 font-bold">₹{totalPrice}</p>
              <button
                className="text-gray-500 hover:text-black"
                onClick={handleRemoveCartItem}
              >
                <MdDeleteForever size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* gender section */}
        <div className="flex items-center gap-4">
          <h2
            className={`font-semibold 
    ${cartItem?.productId?.gender === "Men" ? "bg-blue-100 text-blue-500" : ""} 
    ${
      cartItem?.productId?.gender === "Women" ? "bg-pink-100 text-pink-500" : ""
    } 
    ${
      cartItem?.productId?.gender === "Kids"
        ? "bg-green-100 text-green-500"
        : ""
    } 
    max-w-fit px-1 rounded-md`}
          >
            {cartItem?.productId?.gender}
          </h2>
          {stockStatus && !stockStatus.inStock && (
            <p className="text-red-500 text-md font-semibold">{stockStatus.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
