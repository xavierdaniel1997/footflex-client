import { useSelector } from "react-redux";
import CartCheckout from "../../components/user/CartCheckout";
import PaymentOptions from "../../components/user/PaymentOptions";

const PaymentPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const address = useSelector((state) => state.address.selectedAddress);

  const totalPrice = cartItems?.items?.reduce((acc, item) => {
    const price = Number(item?.productId?.salePrice);
    return acc + price * item.quantity;
  }, 0);

  const totalQty = cartItems?.items?.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return (
    <div className="pt-28 pb-10 px-4 md:px-10 lg:px-36">
      {/* MAIN GRID: STACKS ON MOBILE, SPLITS ON DESKTOP */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT SECTION */}
        <div className="flex-1">

          {/* BAG TOTAL BOX */}
          <div className="bg-white rounded-md shadow-sm mb-6 border">
            <div className="px-4 py-3">
              <p className="text-red-600 font-semibold text-sm sm:text-base">
                TOTAL ({totalQty}) ₹ {totalPrice}
              </p>
              <p className="text-gray-500 mt-2 text-xs sm:text-sm">
                Items in your bag are not reserved — complete your order now to secure them.
              </p>
            </div>
          </div>

          {/* PAYMENT OPTIONS */}
          <PaymentOptions totalPrice={totalPrice} />
        </div>

        {/* RIGHT SECTION (CHECKOUT SUMMARY) */}
        <div className="lg:w-1/3 w-full">
          <CartCheckout
            cartCount={totalQty}
            totalPrice={totalPrice}
            inPayment={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
