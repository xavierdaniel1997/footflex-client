import React, {useEffect} from "react";
import CartCard from "../../components/user/CartCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchCartDetails} from "../../redux/cartSlice";
import CartCheckout from "../../components/user/CartCheckout";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userName = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchCartDetails());
  }, [dispatch]);

  
  const totalPrice = cartItems?.items?.reduce((acc, item) => {
    const price = Number(item?.productId?.salePrice)
    const quantity = item?.quantity
    return acc + price*quantity
  }, 0)

  const totalQty = cartItems?.items?.reduce((acc, item) => {
    return acc + item?.quantity
  }, 0)

  const navigate = useNavigate()
  const handleNavAddress = () => {
    if(totalPrice > 0){
      navigate("/address")
    }
  }

  console.log("this is frm the cart page cart details", totalQty)
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
              <p className="text-gray-500 mt-2">
                Items in your bag are not reserved — check out now to make them
                yours.
              </p>
            </div>
          </div>
          <div className="py-10">
            {cartItems?.items?.map((cartItem) => (
              <div className="mb-5" key={cartItem?._id}>
                <CartCard cartItem={cartItem}/>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/3">
        <CartCheckout cartCount={totalQty} totalPrice={totalPrice} navigateTo={handleNavAddress} buttonName={"CHECKOUT"}/>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
