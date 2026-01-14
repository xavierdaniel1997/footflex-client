import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProfileSideBar from "../../components/user/ProfileSideBar";
import Orders from "./Orders";
import EditProfile from "./EditProfile";
import DeliveryDetails from "./DeliveryDetails";
import WishList from "./WishList";
import CartPage from "./CartPage";
import WalletPage from "./WalletPage";
import { FiMenu } from "react-icons/fi";

const UserProfilePage = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <div className="pt-28 pb-10 px-4 md:px-10 lg:px-20">
      {/* MOBILE MENU BUTTON */}
      <button
        className="lg:hidden flex items-center gap-2 mb-4 px-3 py-2 border rounded-md"
        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
      >
        <FiMenu className="text-xl" />
        <span className="text-sm font-semibold">Menu</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* SIDEBAR — mobile toggle + desktop fixed */}
        <div
          className={`
            ${showMobileSidebar ? "block" : "hidden"} 
            lg:block 
            lg:w-72 
            w-full 
            shrink-0
          `}
        >
          <ProfileSideBar closeMobile={() => setShowMobileSidebar(false)} />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 min-w-0">
          <Routes>
            <Route path="cart" element={<CartPage />} />
            <Route path="orders" element={<Orders />} />
            <Route path="wishlist" element={<WishList inUserProfile={true} />} />
            <Route path="" element={<EditProfile />} />
            <Route path="address" element={<DeliveryDetails inUserProfile={true} />} />
            <Route path="wallet" element={<WalletPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
