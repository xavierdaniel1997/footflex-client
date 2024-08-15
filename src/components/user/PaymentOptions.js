import React, {useState} from "react";
import {FaStar, FaWallet} from "react-icons/fa";
import {MdPayment} from "react-icons/md";
import {BsCashStack, BsCreditCard2Back} from "react-icons/bs";
import {SiPhonepe} from "react-icons/si";
import { IoMdRefresh } from "react-icons/io";

const generateCaptcha = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

const PaymentOptions = () => {
  const [selectedOption, setSelectedOption] = useState("recommended");
  const [openCashOnDel, setOpenCashOnDel] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const options = [
    {id: "recommended", label: "Recommended", icon: <FaStar />},
    {id: "cash", label: "Cash On Delivery", icon: <BsCashStack />},
    {id: "upi", label: "UPI (Pay via any App)", icon: <MdPayment />},
    {id: "card", label: "Credit/Debit Card", icon: <BsCreditCard2Back />},
    {id: "wallet", label: "Wallets", icon: <FaWallet />},
  ];

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
                />
                <label htmlFor="cod">Cash on Delivery</label>
                <BsCashStack className="ml-auto" />
              </div>
              {openCashOnDel && (
                <div className="w-full flex flex-col gap-4">
                  <div className="flex items-center justify-center gap-2 ">
                    <span className="font-bold italic text-2xl text-orange-600">{captcha}</span>
                    <button
                      onClick={() => setCaptcha(generateCaptcha())}
                      className="text-gray-600 underline"
                    >
                      <IoMdRefresh />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter captch"
                    className="outline-none px-2 py-2 border w-full"
                  />
                  <button className="px-3 py-2 bg-blue-700 text-white font-semibold text-lg">Confirm Order</button>
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
    </div>
  );
};

export default PaymentOptions;
