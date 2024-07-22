import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MdDashboard, 
  MdInventory, 
  MdShoppingCart, 
  MdPeople, 
  MdBarChart, 
  MdLocalOffer, 
  MdCategory, 
  MdAdminPanelSettings, 
  MdSettings, 
  MdLogout 
} from 'react-icons/md';
import api from '../../config/axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/authSlice';

const SideNavbar = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const navItems = [
    { icon: <MdDashboard />, text: "DASHBOARD", path: "/dashboard" },
    { icon: <MdInventory />, text: "PRODUCTS", path: "/dashboard/products" },
    { icon: <MdShoppingCart />, text: "ORDERS", path: "/dashboard/orders" },
    { icon: <MdPeople />, text: "CUSTOMERS", path: "/customers" },
    { icon: <MdBarChart />, text: "SALES REPORT", path: "/sales-report" },
    { icon: <MdLocalOffer />, text: "COUPONS", path: "/coupons" },
    { icon: <MdCategory />, text: "CATEGORY", path: "/dashboard/category" },
    { icon: <MdAdminPanelSettings />, text: "BRANDS", path: "/dashboard/brand" },
    { icon: <MdSettings />, text: "SETTINGS", path: "/settings" },
  ];

  const handleLogout = async () => {
    await api.post("users/logout")
    dispatch(logoutUser())
    console.log("logout clicked")
  }

  return (
    <nav className="fixed bg-white w-64 h-screen shadow-lg flex flex-col justify-between z-10">
      <div className='px-2'>
        <div className="p-4 border-b border-gray-200 flex justify-center items-center">
          <h1 className="text-3xl font-bold">FOOT<span className="text-blue-500">FLEX</span></h1>
        </div>
        <ul>
          {navItems.map((item, index) => (
            <Link key={index} to={item.path}>
              <li
                className={`px-4 py-3 flex items-center space-x-3 cursor-pointer mt-2 ${
                  location.pathname === item.path ? 'bg-blue-600 text-white rounded-md' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.text}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {/* <div className="p-4 border-t border-gray-200">
        <button className="w-full py-2 text-gray-600 hover:text-gray-800 font-medium flex items-center justify-center" onClick={handleLogout}>
          <MdLogout className="mr-2" />
          LOGOUT
        </button>
      </div> */}
      <div className="p-4 border-t border-gray-200 flex items-center">
        <img
          src="https://via.placeholder.com/40"
          alt="Avatar"
          className="w-10 h-10 rounded-full mr-2"
        />
        <span className="font-medium text-gray-600 mr-auto">{user?.firstName}</span>
        <button className="text-gray-600 hover:text-gray-800 font-medium flex items-center" onClick={handleLogout}>
          <MdLogout className="mr-1" />
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default SideNavbar;
