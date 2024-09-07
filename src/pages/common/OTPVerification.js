import React, { useState, useRef, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";
import api from "../../config/axiosConfig";
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const inputs = useRef([]);
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  const handleSubmit = async () => {   
    const otpValue = otp.join("");
    try{
      const response = await api.post("/users/verify-otp", {otp: otpValue})
      console.log("otp respones", response)
      toast.success("Register successfully")
      if(response.status === 200){
        navigate("/login")
        sessionStorage.removeItem("userEmail")
      }
      
    }catch(error){
      console.log(error)
      toast.error(error.response.data.message)
    }
  };

  const handleResendOTP = async () => {
    
    try{
      const userEmail = sessionStorage.getItem("userEmail")
      const response = await api.post("/users/resend-otp", {email: userEmail})
      console.log("responser for resend", response)
      toast.success(response.data.message)
    }catch(error){
      console.log(error)
      toast.error(error.response.data.message)
    }
    setTimer(60); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
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
            className="flex items-center justify-center bg-black p-2 md:py-2 md:px-5 font-semibold text-sm md:text-lg text-white hover:bg-gray-900 rounded-md"
          >
            Verify OTP
          </button>
           {!timer && <button
            onClick={handleResendOTP}
            disabled={timer > 0}
            className={`flex items-center justify-center gap-2 p-2 md:p-3 font-semibold text-sm md:text-lg ${
              timer > 0 ? "text-gray-400 cursor-not-allowed" : "text-black"
            }`}
          >
            <FiRefreshCw className="text-xl md:text-2xl" />
            Resend OTP
          </button>}
            {timer > 0 && <p className="ml-2">validity ends in : {timer}s</p>}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;