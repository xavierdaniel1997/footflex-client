import React from "react";
import {BiLogoVisa} from "react-icons/bi";
import {FaCcPaypal} from "react-icons/fa";
import {BiLogoMastercard} from "react-icons/bi";

const Footer = () => {
  return (
    <div className="bg-black">
      <div className="py-20 flex flex-col gap-4 justify-center items-center text-center ">
        <h1 className="font-semibold text-2xl text-white">
          FOOT
          <span className="font-semibold text-2xl text-green-600">FLEX</span>
        </h1>
        <div>
          <h1 className="text-xl text-gray-200">Payment Methods</h1>
          <div className="flex justify-around gap-7">
            <div className="text-white text-5xl">
              <BiLogoVisa />
            </div>
            <div className="text-white text-5xl">
              <FaCcPaypal />
            </div>
            <div className="text-white text-5xl">
              <BiLogoMastercard />
            </div>
          </div>
        </div>
        <p className="text-white">© 2023 FOOTFLEX.com</p>
      </div>
    </div>
  );
};

export default Footer;
