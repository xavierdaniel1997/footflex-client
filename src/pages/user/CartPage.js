import React, {useEffect, useState} from "react";
import CartCard from "../../components/user/CartCard";
import {useDispatch, useSelector} from "react-redux";
import {clearCart, fetchCartDetails} from "../../redux/cartSlice";
import CartCheckout from "../../components/user/CartCheckout";
import {useLocation, useNavigate} from "react-router-dom";
import EmptyItems from "../../components/user/EmptyItems";
import toast from "react-hot-toast";
import api from "../../config/axiosConfig";

const CartPage = () => {
  const dispatch = useDispatch();
  

  const { userName } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [stockStatus, setStockStatus] = useState({});

  
  

  const totalPrice = cartItems?.items?.reduce((acc, item) => {
    const price = Number(item?.productId?.salePrice);
    const quantity = item?.quantity;
    return acc + price * quantity;
  }, 0);

  const totalQty = cartItems?.items?.reduce((acc, item) => {
    return acc + item?.quantity;
  }, 0);

  useEffect(() => {
    dispatch(fetchCartDetails());
  }, [dispatch]);

  const navigate = useNavigate();
  const handleNavAddress = async () => {
    if (totalPrice > 0) {
      try {
        const response = await api.get("cart/check-items");
        if (response?.data?.allItemsInStock) {
          navigate("/address");
        } else {
          toast.error(
            "Some items in your cart are out of stock or unavailable."
          );
          const newStockStatus = {};
          response.data.stockCheckResults.forEach((result) => {
            newStockStatus[result.productId] = result;
          });
          setStockStatus(newStockStatus);
        }
      } catch (error) { 
        console.error(error);
        toast.error("Failed to verify cart items. Please try again.");
      }
    } else {
      toast.error(
        "our cart is empty. Add items before proceeding to checkout."
      );
    }
  };

  if (cartItems?.items?.length === 0) {
    return (
      <EmptyItems buttonName={"ADD ITEMS TO YOUR CART"} pageName={"cart"} />
    );
  }


 return (
  <div className="px-4 sm:px-6 md:px-8 lg:px-20 py-5">
    <div className="flex flex-col lg:flex-row gap-10">

      {/* LEFT — CART ITEMS */}
      <div className="flex-1">

        {/* Header Section */}
        <div className="bg-white p-6">
          {/* <div className="flex justify-between items-center bg-gray-100 p-4 sm:p-5 rounded-md">
            <h1 className="text-lg sm:text-xl font-bold uppercase">
              Hello {userName?.firstName}
            </h1>
          </div> */}

          {/* Bag Summary */}
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-2xl sm:text-3xl font-bold">Your Bag</h2>

            <p className="text-gray-600 font-semibold mt-2 text-sm sm:text-base">
              TOTAL ({totalQty}) • ₹{totalPrice}
            </p>

            <p className="text-gray-500 mt-2 text-sm sm:text-base leading-snug">
              Items in your bag are not reserved — complete checkout to secure them.
            </p>
          </div>
        </div>

        {/* Cart Items */}
        <div className="mt-8 sm:mt-10">
          {cartItems?.items?.map((cartItem) => (
            <div
              className="mb-6 sm:mb-8 border-b pb-6 lg:p-6"
              key={cartItem?._id}
            >
              <CartCard
                cartItem={cartItem}
                stockStatus={stockStatus[cartItem.productId._id]}
              />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — CHECKOUT BOX */}
      <div className="w-full lg:w-1/3">
        <CartCheckout
          cartCount={totalQty}
          totalPrice={totalPrice}
          navigateTo={handleNavAddress}
          buttonName={"CHECKOUT"}
        />
      </div>

    </div>
  </div>
);

};

export default CartPage;
