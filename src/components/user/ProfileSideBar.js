import React from "react";
import {Link, useLocation} from "react-router-dom";
import {
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
  FaWallet,
  FaUserFriends,
  FaUser,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";
import {RiLogoutBoxRLine} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import api from "../../config/axiosConfig";
import {logoutUser} from "../../redux/authSlice";

const ProfileSideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const menuItems = [
    {name: "Orders", icon: FaShoppingBag, path: "/userProfile/orders"},
    {name: "Wishlist", icon: FaHeart, path: "/userProfile/wishlist"},
    {name: "Cart", icon: FaShoppingCart, path: "/userProfile/cart"},
    {name: "FOOTFLEX Wallet", icon: FaWallet, path: "/userProfile/wallet"},
    {name: "Invite Friends", icon: FaUserFriends, path: "/userProfile/invite"},
    {name: "Edit Profile", icon: FaUser, path: "/userProfile/editProfile"},
    {name: "Address", icon: FaMapMarkerAlt, path: "/userProfile/address"},
  ];

  const handleLogout = async () => {
    await api.post("users/logout");
    dispatch(logoutUser());
  };

  return (
    <div className="w-72 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-5">
        <h2 className="text-xl font-semibold text-gray-800">My Account</h2>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">
            Orders & Credits
          </h3>
          <ul className="mt-3 space-y-3">
            {menuItems.slice(0, 5).map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`text-base flex items-center cursor-pointer hover:text-gray-800 ${
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

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-700">Profile</h3>
          <ul className="mt-3 space-y-3">
            {menuItems.slice(5).map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`text-base flex items-center cursor-pointer hover:text-gray-800 ${
                    location.pathname === item.path
                      ? "text-gray-800 font-semibold"
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

      <div className="mt-8 px-6 py-4 flex items-center gap-6">
        <div className="flex items-center">
          {user?.dpImage ? (
            <img
              src={user?.dpImage}
              alt="Avatar"
              className="w-12 h-12 rounded-full mr-3"
            />
          ) : (
            <img
              src="https://via.placeholder.com/48"
              alt="Avatar"
              className="w-12 h-12 rounded-full mr-3"
            />
          )}

          <span className="text-base font-medium text-gray-700">
            {user?.firstName}
          </span>
        </div>
        {/* <Link to="/login" > */}
        <button
          className="flex items-center text-red-500 hover:text-red-600"
          onClick={handleLogout}
        >
          <RiLogoutBoxRLine size={24} className="mr-2" />
          <span className="text-sm font-medium">Logout</span>
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default ProfileSideBar;
