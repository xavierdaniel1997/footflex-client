import React, {useEffect, useState} from "react";
import CartCard from "../../components/user/CartCard";
import {useDispatch, useSelector} from "react-redux";
import {clearCart, fetchCartDetails} from "../../redux/cartSlice";
import CartCheckout from "../../components/user/CartCheckout";
import {useLocation, useNavigate} from "react-router-dom";
import EmptyItems from "../../components/user/EmptyItems";
import toast from "react-hot-toast";
import api from "../../config/axiosConfig";
import { applyCouponPricingDetails } from "../../redux/couponSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  
  const userName = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  // const {selectedCoupon} = useSelector((state) => state.coupons); 
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
    <div className="py-48 md:p-8 lg:px-36">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {/* cart title */}

          <div className="bg-white">
            <div className="flex justify-between items-center bg-gray-100 p-5 rounded-sm">
              <h1
                className="text-xl font-bold"
                style={{textTransform: "uppercase"}}
              >
                HELLO {userName?.firstName}
              </h1>
            </div>

            <div className="mt-8">
              <h2 className="text-3xl font-bold">YOUR BAG</h2>
              <p className="text-gray-600 font-semibold mt-2">
                TOTAL ({totalQty}) ₹{totalPrice}
              </p>
              <div className="flex justify-between">
                <p className="text-gray-500 mt-2">
                  Items in your bag are not reserved — check out now to make
                  them yours.
                </p>
                {/* <button>CLEAR CART</button> */}
              </div>
            </div>
          </div>
          <div className="py-10">
            {cartItems?.items?.map((cartItem) => (
              <div className="mb-5" key={cartItem?._id}>
                <CartCard
                  cartItem={cartItem}
                  stockStatus={stockStatus[cartItem.productId._id]}
                />
              </div> 
            ))}
          </div>
        </div>
        <div className="lg:w-1/3">
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
