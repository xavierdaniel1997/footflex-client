import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
  FaWallet,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import api from "../../config/axiosConfig";
import { logoutUser } from "../../redux/authSlice";

const ProfileSideBar = ({ closeMobile }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { name: "Orders", icon: FaShoppingBag, path: "/userProfile/orders" },
    { name: "Wishlist", icon: FaHeart, path: "/userProfile/wishlist" },
    { name: "Cart", icon: FaShoppingCart, path: "/cart" },
    { name: "FOOTFLEX Wallet", icon: FaWallet, path: "/userProfile/wallet" },
    { name: "Edit Profile", icon: FaUser, path: "/userProfile" },
    { name: "Address", icon: FaMapMarkerAlt, path: "/userProfile/address" },
  ];

  const handleLogout = async () => {
    await api.post("users/logout");
    dispatch(logoutUser());
  };

  return (
    <div className="bg-white shadow-md rounded-lg w-full lg:w-72 overflow-hidden">
      {/* TOP SECTION */}
      <div className="px-6 py-6">
        <h2 className="text-xl font-semibold text-gray-800">My Account</h2>

        {/* ORDERS & CREDITS */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">Orders & Credits</h3>
          <ul className="mt-3 space-y-3">
            {menuItems.slice(0, 4).map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={closeMobile}
                  className={`text-base flex items-center cursor-pointer 
                  hover:text-gray-800 transition 
                  ${
                    location.pathname === item.path
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  <item.icon className="mr-3 text-lg" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* PROFILE SECTION */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-700">Profile</h3>
          <ul className="mt-3 space-y-3">
            {menuItems.slice(4).map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={closeMobile}
                  className={`text-base flex items-center cursor-pointer 
                  hover:text-gray-800 transition 
                  ${
                    location.pathname === item.path
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  <item.icon className="mr-3 text-lg" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM USER + LOGOUT */}
      <div className="mt-5 px-6 py-4 border-t flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={user?.dpImage || "https://via.placeholder.com/48"}
            alt="avatar"
            className="w-12 h-12 rounded-full"
          />
          <span className="font-medium text-gray-700">{user?.firstName}</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center text-red-500 hover:text-red-600 transition"
        >
          <RiLogoutBoxRLine size={22} className="mr-1" />
        </button>
      </div>
    </div>
  );
};

export default ProfileSideBar;
