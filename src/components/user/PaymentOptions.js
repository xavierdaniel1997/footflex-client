import React, {useEffect, useState} from "react";
import {FaStar, FaWallet} from "react-icons/fa";
import {MdPayment} from "react-icons/md";
import {BsCashStack, BsCreditCard2Back} from "react-icons/bs";
import {SiRazorpay} from "react-icons/si";
import {IoMdRefresh} from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import toast from "react-hot-toast";
import api from "../../config/axiosConfig";
import {clearCart} from "../../redux/cartSlice";
import SuccessModal from "./SuccessModal";

const generateCaptcha = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

const PaymentOptions = ({totalPrice}) => {
  const [selectedOption, setSelectedOption] = useState("recommended");
  const [openCashOnDel, setOpenCashOnDel] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const pricingDetails = useSelector((state) => state.coupons.pricingDetails);
  const address = useSelector((state) => state.address.selectedAddress);
  const {user} = useSelector((state) => state.auth);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dispatch = useDispatch();


  const options = [
    {id: "recommended", label: "Recommended", icon: <FaStar />},
    {id: "cash", label: "Cash On Delivery", icon: <BsCashStack />},
    {id: "upi", label: "UPI (Pay via Razorpay)", icon: <SiRazorpay />},
    {id: "wallet", label: "Wallets", icon: <FaWallet />},
  ];

  const error = totalPrice < 5000 ? "Cash On Delivery is not available" : "";

  const handleCaptchaValidation = () => {
    setIsCaptchaValid(captchaInput === captcha);
  };

  useEffect(() => {
    handleCaptchaValidation();
  }, [captchaInput]);

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
    address: address,
    totalPrice: totalPrice,
    originalTotalPrice: pricingDetails.originalTotalPrice,
    totalPriceAfterDiscount: pricingDetails.totalPriceAfterDiscount,
    savedTotal: pricingDetails.savedTotal,
    couponDiscount: pricingDetails.couponDiscount,
    finalPrice: pricingDetails.finalPrice,
  });

  const handlePayment = async (paymentMethod) => {
    if (!cartItems || !address) {
      toast.error("Please select an address.");
      return;
    }

    try {
      const response = await api.get("cart/check-items");
      if (!response?.data?.allItemsInStock) {
        toast.error("Some items in your cart are out of stock or unavailable.");
        return;
      }

      const orderData = {
        ...createOrderData(),
        payment: {
          method: paymentMethod,
          status: "Pending",
        },
      };

      const createOrderResponse = await api.post(
        "order/place-order",
        orderData
      );
      if (createOrderResponse.status === 200) {
        if (paymentMethod === "Cash on Delivery") {
          setShowSuccessModal(true);
          dispatch(clearCart());
          setCaptchaInput("");
        }
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
    
  const handleRazorpay = async () => {
    try {
      const {data} = await api.post("order/create-razorpay-order", {
        totalPrice: pricingDetails.finalPrice,
      });

      console.log("this is from the payment option process.env.REACT_APP_RZP_KEY_ID", process.env.RZP_KEY_ID)
      const options = {
        key: process.env.RZP_KEY_ID,
        amount: pricingDetails.finalPrice * 100,
        currency: "INR",
        name: user?.firstName,
        description: "Online payment",
        order_id: data.orderId,
        handler: async (response) => {
          const orderData = createOrderData();
  
          const verifyResponse = await api.post("order/verify-razorpay-order", {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            orderData,
          });
  
          if (verifyResponse.status === 200) {
            setShowSuccessModal(true);
            dispatch(clearCart());
          } else {
            toast.error("Failed to confirm order. Please try again.");
          }
        },
        prefill: {
          name: user.firstName,
          email: user.email,
          contact: user.phoneNumber,
        },
        theme: {
          color: "#F37254",
        },

        
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
      console.log("this is from the payment razorpay", razorpayInstance)
    } catch (error) {
      console.log("Error processing Razorpay payment:", error);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "recommended":
        return (
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="cod"
                name="payment"
                className="form-radio"
              />
              <label htmlFor="cod">Cash on Delivery (Cash/UPI)</label>
              <BsCashStack className="ml-auto" />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="phonepe"
                name="payment"
                className="form-radio"
              />
              <label htmlFor="phonepe">Razorpay</label>
              <SiRazorpay className="ml-auto text-blue-800 text-2xl" />
            </div>
          </div>
        );
      case "cash":
        return (
          <div className="flex items-center space-x-2">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  className="form-radio"
                  onClick={() => {
                    setOpenCashOnDel(!openCashOnDel);
                    setCaptcha(generateCaptcha());
                  }}
                  disabled={error ? true : false}
                />
                <label htmlFor="cod">Cash on Delivery</label>
                <BsCashStack className="ml-auto" />
              </div>
              <span className="text-red-600">{error}</span>
              {openCashOnDel && (
                <div className="w-full flex flex-col gap-4">
                  <div className="flex items-center justify-center gap-2 ">
                    <span
                      className="font-bold italic text-2xl text-orange-600"
                      style={{userSelect: "none", pointerEvents: "none"}}
                      disabled={true}
                    >
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
                    placeholder="Enter captch"
                    className="outline-none px-2 py-2 border w-full"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                  />
                  {/* click this button to cod */}
                  <button
                    className={`px-3 py-2 font-semibold text-lg ${
                      isCaptchaValid
                        ? "bg-blue-700 text-white cursor-pointer"
                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }`}
                    disabled={!isCaptchaValid}
                    // onClick={handleConfirmCOD}
                    onClick={() => handlePayment("Cash on Delivery")}
                  >
                    Confirm Order
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case "upi":
        return (
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <label htmlFor="upi">UPI (Pay via Razorpay)</label>
              <SiRazorpay className="ml-auto" />
            </div>
            {/* click this button for razorpay */}
            <button
              className="bg-blue-700 text-white cursor-pointer px-3 py-2 font-semibold text-lg mt-4 w-28"
              onClick={handleRazorpay}
            >
              PAY NOW
            </button>
          </div>
        );

      case "wallet":
        return (
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="wallet"
              name="payment"
              className="form-radio"
            />
            <label htmlFor="wallet">Wallets</label>
            <FaWallet className="ml-auto" />
          </div>
        );
      default:
        return <p>Select a payment option</p>;
    }
  };

  console.log("this is from the payment options", pricingDetails);
  return (
    <div className="flex overflow-hidden">
      <div className="w-1/3 bg-gray-100">
        <ul>
          {options.map((option) => (
            <li
              key={option.id}
              className={`p-4 flex items-center cursor-pointer hover:bg-gray-200 ${
                selectedOption === option.id
                  ? "border-l-4 border-blue-600 text-blue-600 bg-white"
                  : ""
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <span
                className={`mr-3 ${
                  selectedOption === option.id ? "text-blue-600" : ""
                }`}
              >
                {option.icon}
              </span>
              <span
                className={`${
                  selectedOption === option.id ? "text-blue-600" : ""
                }`}
              >
                {option.label}
              </span>
              {option.offers && (
                <span className="ml-auto text-xs text-green-600">
                  {option.offers}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3">
        <h2 className="text-xl font-semibold px-10 py-3">
          {selectedOption === "recommended"
            ? "Recommended Payment Options"
            : "Payment Option "}
        </h2>
        <div className="px-10 py-3">{renderContent()}</div>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default PaymentOptions;
