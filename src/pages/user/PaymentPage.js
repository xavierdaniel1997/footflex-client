import { useDispatch, useSelector } from "react-redux";
import CartCheckout from "../../components/user/CartCheckout";
import PaymentOptions from "../../components/user/PaymentOptions";
import { useEffect } from "react";
import { setSelectedAddress } from "../../redux/selectedAddressSlice";

const PaymentPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const address = useSelector(state => state.address.selectedAddress)

  const totalPrice = cartItems?.items?.reduce((acc, item) => {
    const price = Number(item?.productId?.salePrice)
    const quantity = item?.quantity
    return acc + price*quantity
  }, 0)

  const totalQty = cartItems?.items?.reduce((acc, item) => {
    return acc + item?.quantity
  }, 0)

 
  return ( 
    <div className="py-12 md:p-8 lg:px-36">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          
        <div className="bg-white mb-8">
            <div className="my-4 border px-4 py-3">
              <p className="text-red-600 font-semibold ">
                TOTAL ({totalQty}) ₹ {totalPrice}
              </p>
              <p className="text-gray-500 mt-2">
                Items in your bag are not reserved — click confirm order now to make them
                yours.
              </p>
            </div>
          </div>

          <PaymentOptions totalPrice={totalPrice}/>
        </div>
        <div className="lg:w-1/3 ">
          <CartCheckout cartCount={totalQty} inPayment={true}/>
          
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
