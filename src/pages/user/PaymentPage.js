import { useSelector } from "react-redux";
import CartCheckout from "../../components/user/CartCheckout";
import PaymentOptions from "../../components/user/PaymentOptions";

const PaymentPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

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

          <PaymentOptions />
        </div>
        <div className="lg:w-1/3 ">
          <div className="bg-white max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">ORDER SUMMARY</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>{totalQty} items</span> {/* Dummy data */}
                <span>₹ {totalPrice}</span> {/* Dummy data */}
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>

            <div className="flex justify-between font-bold mb-1">
              <span>Total</span>
              <span>₹ {totalPrice}</span> {/* Dummy data */}
            </div>
            <p className="text-gray-500 text-sm mb-6">
              (Inclusive of all taxes)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
