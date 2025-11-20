import React, { useEffect, useState } from "react";
import { FaStar, FaWallet } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { BsCashStack } from "react-icons/bs";
import { SiRazorpay } from "react-icons/si";
import { IoMdRefresh } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../../config/axiosConfig";
import { clearCart } from "../../redux/cartSlice";
import SuccessModal from "./SuccessModal";
import FailureModal from "./FailureModal";
import { useNavigate } from "react-router-dom";

// Captcha generator
const generateCaptcha = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 6 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
};

const PaymentOptions = ({ totalPrice }) => {
  const [selectedOption, setSelectedOption] = useState("recommended");
  const [openCashOnDel, setOpenCashOnDel] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const pricingDetails = useSelector((state) => state.coupons.pricingDetails);
  const address = useSelector((state) => state.address.selectedAddress);
  const { user } = useSelector((state) => state.auth);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sidebar menu options
  const options = [
    { id: "recommended", label: "Recommended", icon: <FaStar /> },
    { id: "cash", label: "Cash On Delivery", icon: <BsCashStack /> },
    { id: "upi", label: "Online Payments", icon: <SiRazorpay /> },
    { id: "wallet", label: "Wallets", icon: <FaWallet /> },
  ];

  const error = totalPrice > 10000 ? "Cash On Delivery is not available" : "";

  useEffect(() => {
    setIsCaptchaValid(captchaInput === captcha);
  }, [captchaInput]);

  // Create orderData object
  const createOrderData = () => ({
    items: cartItems?.items.map((item) => ({
      product: item.productId._id,
      productName: item.productId.productName,
      productBrand: item.productId.brand.brandName,
      description: item.productId.description,
      price: item.productId.salePrice,
      regularPrice: item.productId.regularPrice,
      quantity: item.quantity,
      size: item.size,
      totalPrice: item.quantity * item.productId.salePrice,
      thumbnail: item.productId.thumbnail,
    })),
    address,
    totalPrice,
    deliveryCharge: pricingDetails.deliveryCharge,
    originalTotalPrice: pricingDetails.originalTotalPrice,
    totalPriceAfterDiscount: pricingDetails.totalPriceAfterDiscount,
    savedTotal: pricingDetails.savedTotal,
    couponDiscount: pricingDetails.couponDiscount,
    finalPrice: pricingDetails.finalPrice,
  });

  // Handle COD, Wallet, and failed orders
  const handlePayment = async (paymentMethod) => {
    if (!cartItems || !address) {
      toast.error("Please select an address.");
      return;
    }

    try {
      const response = await api.get("cart/check-items");
      if (!response?.data?.allItemsInStock) {
        toast.error("Some items in your cart are out of stock.");
        return;
      }

      const orderData = {
        ...createOrderData(),
        payment: { method: paymentMethod, status: "Pending" },
      };

      const res = await api.post("order/place-order", orderData);

      if (res.status === 200) {
        setShowSuccessModal(true);
        dispatch(clearCart());
        setCaptchaInput("");
      }
    } catch (error) {
      toast.error("Failed to place order.");
      console.log(error);
    }
  };

  const handleRazorpay = async () => {
    if (!cartItems || !address) {
      toast.error("Please select an address.");
      return;
    }

    try {
      const { data } = await api.post("order/create-razorpay-order", {
        totalPrice: pricingDetails.finalPrice,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: pricingDetails.finalPrice * 100,
        currency: "INR",
        name: user?.firstName,
        description: "Online payment",
        order_id: data.orderId,
        handler: async (response) => {
          const verifyRes = await api.post("order/verify-razorpay-order", {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            orderData: createOrderData(),
          });

          if (verifyRes.status === 200) {
            setShowSuccessModal(true);
            dispatch(clearCart());
          }
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Failed to initiate payment.");
      console.log(error);
    }
  };

  // Handle payment failure state
  const handlePaymentFailure = async (response) => {
    try {
      await api.post("order/payment-failed", {
        response,
        orderData: createOrderData(),
      });

      navigate("/userProfile/orders");
      toast.error("Payment failed. Try again.");
    } catch (err) {
      toast.error("Error processing failure.");
    }
  };

  // Render payment content
  const renderContent = () => {
    switch (selectedOption) {
      case "recommended":
        return (
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Cash on Delivery</span>
              <BsCashStack />
            </div>
            <div className="flex justify-between">
              <span>Razorpay</span>
              <SiRazorpay className="text-blue-700" />
            </div>
            <div className="flex justify-between">
              <span>Wallet</span>
              <FaWallet />
            </div>
          </div>
        );

      case "cash":
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                onClick={() => {
                  setOpenCashOnDel(true);
                  setCaptcha(generateCaptcha());
                }}
                disabled={!!error}
              />
              <span>Cash on Delivery</span>
              <BsCashStack className="ml-auto" />
            </div>
            {error && <span className="text-red-600">{error}</span>}

            {openCashOnDel && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="font-bold italic text-2xl text-orange-600">
                    {captcha}
                  </span>
                  <button
                    onClick={() => {
                      setCaptcha(generateCaptcha());
                      setCaptchaInput("");
                    }}
                    className="text-gray-600 underline"
                  >
                    <IoMdRefresh />
                  </button>
                </div>

                <input
                  type="text"
                  className="border p-2 outline-none"
                  placeholder="Enter captcha"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                />

                <button
                  disabled={!isCaptchaValid}
                  onClick={() => handlePayment("Cash on Delivery")}
                  className={`px-4 py-2 font-semibold text-white rounded 
                    ${
                      isCaptchaValid
                        ? "bg-blue-700 cursor-pointer"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                  Confirm Order
                </button>
              </div>
            )}
          </div>
        );

      case "upi":
        return (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Razorpay</span>
              <SiRazorpay />
            </div>

            <button
              onClick={handleRazorpay}
              className="bg-blue-700 text-white px-4 py-2 rounded font-semibold w-32"
            >
              PAY NOW
            </button>
          </div>
        );

      case "wallet":
        return (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Wallets</span>
              <FaWallet />
            </div>

            <button
              onClick={() => handlePayment("Wallet")}
              className="bg-blue-700 text-white px-4 py-2 rounded font-semibold w-32"
            >
              PAY NOW
            </button>
          </div>
        );

      default:
        return <p>Select a payment option</p>;
    }
  };

  return (
    <div
      className="
        flex flex-col 
        md:flex-row 
        rounded-md border bg-white shadow-sm overflow-hidden
      "
    >
      {/* SIDEBAR */}
      <div className="w-full md:w-1/3 bg-gray-100 border-r">
        <ul className="text-sm">
          {options.map((option) => (
            <li
              key={option.id}
              className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-200 ${
                selectedOption === option.id
                  ? "border-l-4 border-blue-600 bg-white text-blue-600"
                  : ""
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CONTENT */}
      <div className="w-full md:w-2/3 p-5">{renderContent()}</div>

      {/* MODALS */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
      <FailureModal
        isOpen={showFailureModal}
        onClose={() => setShowFailureModal(false)}
      />
    </div>
  );
};

export default PaymentOptions;
