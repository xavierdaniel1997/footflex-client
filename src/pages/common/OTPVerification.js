import React, { useState, useRef } from "react";
import { FiRefreshCw } from "react-icons/fi";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d$/.test(value) && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      if (/^\d$/.test(pasteData[i])) {
        newOtp[i] = pasteData[i];
        if (i < 5) {
          inputs.current[i + 1].focus();
        }
      }
    }
    setOtp(newOtp);
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    console.log("Entered OTP:", otpValue);
    // You can now send the otpValue to your backend for verification
  };

  const handleResendOTP = () => {
    console.log("OTP resent");
    // Add your logic to resend the OTP here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 md:p-10">
        <div className="flex flex-col gap-3 justify-center items-center">
          <span className="font-bold text-xl md:text-2xl text-green-600 text-center">
            OTP Verification
          </span>
          <p className="font-semibold text-lg md:text-xl text-center">
            Enter the 6-digit OTP sent to your phone
          </p>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              maxLength="1"
              ref={(el) => (inputs.current[index] = el)}
              className="text-center text-md md:text-lg text-gray-500 w-10 md:w-12 h-10 md:h-12 outline-none border-2 p-2 md:p-3 rounded-md"
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 mt-4">
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center bg-green-500 p-2 md:py-2 md:px-5 font-semibold text-sm md:text-lg text-white hover:bg-green-600 rounded-md"
          >
            Verify OTP
          </button>
          <button
            onClick={handleResendOTP}
            className="flex items-center justify-center gap-2 p-2 md:p-3 font-semibold text-sm md:text-lg text-green-500 "
          >
            <FiRefreshCw className="text-xl md:text-2xl" />
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
