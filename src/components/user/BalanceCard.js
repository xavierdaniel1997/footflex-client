import React from "react";
import {FaWallet} from "react-icons/fa";

const BalanceCard = ({wallet, user}) => {
  return (
    <div className="bg-white p-4 shadow rounded-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FaWallet className="text-4xl text-blue-500 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Main Balance</h3>
            <p className="text-2xl font-bold text-gray-900">₹ {wallet?.balance}</p>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">CARD HOLDER</p>
            <p className="text-gray-900">{user?.firstName}</p>
          </div>
        </div>


        {/* More Options (Menu) */}
        <div className="ml-4">
          <button className="text-gray-600 font-semibold">
            ADD MONEY TO WALLET
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
