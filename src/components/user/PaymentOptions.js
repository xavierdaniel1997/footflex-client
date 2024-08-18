import React, {useEffect, useState} from "react";
import {FaStar, FaWallet} from "react-icons/fa";
import {MdPayment} from "react-icons/md";
import {BsCashStack, BsCreditCard2Back} from "react-icons/bs";
import {SiPhonepe} from "react-icons/si";
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
  const address = useSelector((state) => state.address.selectedAddress);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dispatch = useDispatch();

  const options = [
    {id: "recommended", label: "Recommended", icon: <FaStar />},
    {id: "cash", label: "Cash On Delivery", icon: <BsCashStack />},
    {id: "upi", label: "UPI (Pay via any App)", icon: <MdPayment />},
    {id: "card", label: "Credit/Debit Card", icon: <BsCreditCard2Back />},
    {id: "wallet", label: "Wallets", icon: <FaWallet />},
  ];

  const error = totalPrice < 10000 ? "Cash On Delivery is not available" : "";

  const handleCaptchaValidation = () => {
    setIsCaptchaValid(captchaInput === captcha);
  };

  useEffect(() => {
    handleCaptchaValidation();
  }, [captchaInput]);

  const handleConfirmCOD = async () => {
    if (cartItems && address) {
      const response = await api.get("cart/check-items");  
      if (response?.data?.allItemsInStock) {
        const orderData = {
          items: cartItems?.items.map((item) => ({
            product: item.productId._id,
            productName: item.productId.productName,
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
          payment: {
            method: "Cash on Delivery",
            status: "Pending",
          },  
        };
        const createOrderResponse = await api.post(
          "order/place-order",
          orderData
        );
        console.log("this is the resposne of order", createOrderResponse)
        if (createOrderResponse.status === 200) {
          // toast.success("Order placed successfully!");
          setShowSuccessModal(true);
          dispatch(clearCart());
          setCaptchaInput("")
        } else {
          toast.error("Failed to place order. Please try again.");
        }
      } else {
        toast.error("Some items in your cart are out of stock or unavailable.");
      }
    } else {
      toast.error("Select an address");
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
              <label htmlFor="phonepe">PhonePe</label>
              <SiPhonepe className="ml-auto text-purple-600 text-2xl" />
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
                    placeholder="Enter captch"
                    className="outline-none px-2 py-2 border w-full"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                  />
                  <button
                    className={`px-3 py-2 font-semibold text-lg ${
                      isCaptchaValid
                        ? "bg-blue-700 text-white cursor-pointer"
                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }`}
                    disabled={!isCaptchaValid}
                    onClick={handleConfirmCOD}
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
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="upi"
              name="payment"
              className="form-radio"
            />
            <label htmlFor="upi">UPI (Pay via any App)</label>
            <MdPayment className="ml-auto" />
          </div>
        );
      case "card":
        return (
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="card"
              name="payment"
              className="form-radio"
            />
            <label htmlFor="card">Credit/Debit Card</label>
            <BsCreditCard2Back className="ml-auto" />
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
