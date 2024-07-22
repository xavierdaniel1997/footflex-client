import React from 'react';
import { Link } from 'react-router-dom';
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

const SideNavbar = () => {
  const navItems = [
    { icon: <MdDashboard />, text: "DASHBOARD", path: "/dashboard", active: false },
    { icon: <MdInventory />, text: "PRODUCTS", path: "/products", active: true },
    { icon: <MdShoppingCart />, text: "ORDERS", path: "/orders", active: false },
    { icon: <MdPeople />, text: "CUSTOMERS", path: "/customers", active: false },
    { icon: <MdBarChart />, text: "SALES REPORT", path: "/sales-report", active: false },
    { icon: <MdLocalOffer />, text: "COUPONS", path: "/coupons", active: false },
    { icon: <MdCategory />, text: "CATEGORY", path: "/category", active: false },
    { icon: <MdAdminPanelSettings />, text: "ADMIN", path: "/admin", active: false },
    { icon: <MdSettings />, text: "SETTINGS", path: "/settings", active: false },
  ];

  return (
    <nav className="bg-white w-64 h-screen shadow-lg flex flex-col justify-between">
      <div>
        <div className="p-4 border-b border-gray-200 flex justify-center items-center">
          <h1 className="text-2xl font-bold">FOOTFLEX</h1>
        </div>
        <ul>
          {navItems.map((item, index) => (
            <Link key={index} to={item.path}>
              <li
                className={`px-4 py-3 flex items-center space-x-3 cursor-pointer ${
                  item.active ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.text}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t border-gray-200">
        <button className="w-full py-2 text-gray-600 hover:text-gray-800 font-medium flex items-center justify-center">
          <MdLogout className="mr-2" />
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default SideNavbar;











import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideNavbar from './components/SideNavbar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import SalesReport from './pages/SalesReport';
import Coupons from './pages/Coupons';
import Category from './pages/Category';
import Admin from './pages/Admin';
import Settings from './pages/Settings';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <SideNavbar />
        <div className="flex-grow">
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/products" component={Products} />
            <Route path="/orders" component={Orders} />
            <Route path="/customers" component={Customers} />
            <Route path="/sales-report" component={SalesReport} />
            <Route path="/coupons" component={Coupons} />
            <Route path="/category" component={Category} />
            <Route path="/admin" component={Admin} />
            <Route path="/settings" component={Settings} />
            {/* Add more routes as needed */}
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;











import React, { useState } from "react";
import BreadCrumbWithButton from "../BreadCrumbWithButton";
import {useLocation, useNavigate} from "react-router-dom";

const ProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [productImage, setProductImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShowProducts = () => {
    navigate("/dashboard/products");
  };



  return (
    <div>
      <BreadCrumbWithButton
        componentLocation={"Add Product"}
        location={location.pathname}
        goback={"/dashboard/products"}
        buttonName={"Show Products"}
        buttonNavigate={handleShowProducts}
      />
    </div>
  );
};

export default ProductForm;


w-full md:w-1/2 bg-white py-10 px-5 rounded-md














******************************




import React, { useState, useRef } from "react";
import { FaImage, FaTimes } from "react-icons/fa";

const ImageUploadSection = () => {
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const thumbnailInputRef = useRef(null);
  const additionalInputRef = useRef(null);

  const handleThumbnailUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) =>
        setAdditionalImages((prev) => [...prev, e.target.result]);
      reader.readAsDataURL(file);
    }
  };

  const removeAdditionalImage = (index) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Product Gallery</h2>

      <div className="mb-6">
        {thumbnailImage && (
          <div className="relative mb-4">
            <img
              src={thumbnailImage}
              alt="Thumbnail Preview"
              className="w-full max-w-md rounded-lg mx-auto"
            />
            <button
              onClick={() => setThumbnailImage(null)}
              className="absolute top-2 right-2 bg-black text-white rounded-full p-1"
            >
              <FaTimes />
            </button>
          </div>
        )}

        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
          onClick={() => thumbnailInputRef.current.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {!thumbnailImage && (
            <>
              <FaImage className="text-3xl text-gray-400 mb-2" />
              <p className="text-gray-400">Drag your image here, or click to browse</p>
              <em className="text-gray-400">JPEG, PNG, SVG, or GIF (max. 800x400px)</em>
            </>
          )}
          <input
            type="file"
            ref={thumbnailInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleThumbnailUpload}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[...Array(Math.max(4, additionalImages.length + 1))].map((_, index) => (
          <div key={index} className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer">
            {additionalImages[index] ? (
              <div className="relative">
                <img
                  src={additionalImages[index]}
                  alt={`Additional Preview ${index + 1}`}
                  className="w-full max-w-xs rounded-lg"
                />
                <button
                  onClick={() => removeAdditionalImage(index)}
                  className="absolute top-2 right-2 bg-black text-white rounded-full p-1"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <>
                <FaImage className="text-3xl text-gray-400 mb-2" />
                <p className="text-gray-400">Product-thumbnail-{index + 1}.png</p>
                <button
                  onClick={() => additionalInputRef.current.click()}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                >
                  Upload
                </button>
              </>
            )}
          </div>
        ))}
        <input
          type="file"
          ref={additionalInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleAdditionalImageUpload}
        />
      </div>
    </div>
  );
};

export default ImageUploadSection;
