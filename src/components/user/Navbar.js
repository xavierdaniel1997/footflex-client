import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineSearch, AiOutlineDown } from "react-icons/ai";
import { BsBag, BsCreditCard, BsPerson } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartDetails } from "../../redux/cartSlice";
import { BsCart3 } from "react-icons/bs";

const NavBar = () => {
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  // const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemsCount = useSelector((state) => state.cart.cartItems?.items?.length || 0);

  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1); // 1: Bag, 2: Delivery Details, 3: Payment

  useEffect(() => {
    
    // Determine current step based on the route
    if (location.pathname === "/cart") {
      setCurrentStep(1);
    } else if (location.pathname === "/address") {
      setCurrentStep(2);
    } else if (location.pathname === "/payment") {
      setCurrentStep(3);
    }
  }, [location]);

  useEffect(() => {
    dispatch(fetchCartDetails());
  }, [dispatch])

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 px-7 py-6 shadow-md lg:mx-auto lg:px-20 bg-white z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button className="text-2xl" onClick={toggleMenu}>
            <FiMenu />
          </button>
        </div>

        {/* Logo (Centered on Small Devices) */}
        <Link to="/">
          <div className="text-black text-2xl font-bold">
            FOOT<span className="text-blue-500">FLEX</span>
          </div>
        </Link>

        {/* Profile Button (Right-aligned) */}
        <div className="lg:hidden">
          <button className="text-2xl">
            <BsPerson />
          </button>
        </div>

        {/* Navigation Links */}
        {menuVisible && (
          <div className="lg:hidden bg-white text-gray-600 absolute top-20 left-0 right-0 py-10 px-10">
            <ul className="flex flex-col gap-5 justify-center items-center font-semibold text-xl">
              <Link to="/menshop">
                <li>MENS</li>
              </Link>
              <Link to="/womenshop">
                <li>WOMENS</li>
              </Link>
              <Link to="/kidshop">
                <li>KIDS</li>
              </Link>
            </ul>
          </div>
        )}

        {/* Breadcrumb Navigation - Centered with More button on Right */}
        {["/cart", "/address", "/payment"].includes(location.pathname) ? (
          <div className="flex justify-between w-full">
          <div className="hidden lg:flex justify-center items-center w-full relative">
            {/* Flexbox container with centered breadcrumb */}
            

            <div className="flex items-center gap-2 mx-auto">
              <Link to="/cart">
                <div
                  className={`flex items-center gap-2 ${
                    currentStep >= 1 ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  <BsCart3 className="text-2xl" />
                  <span>Cart</span>
                </div>
              </Link>
              <hr className="w-8 border-t-2 border-gray-300" />
              <Link to="/address">
                <div
                  className={`flex items-center gap-2 ${
                    currentStep >= 2 ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  <AiOutlineHome className="text-2xl" />
                  <span>Delivery Details</span>
                </div>
              </Link>
              <hr className="w-8 border-t-2 border-gray-300" />
              <Link to="/payment">
                <div
                  className={`flex items-center gap-2 ${
                    currentStep >= 3 ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  <BsCreditCard className="text-2xl" />
                  <span>Payment</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>More</span>
            <AiOutlineDown/>
          </div>
          </div>
        ) : (
          <div className="hidden lg:flex text-gray-600 justify-center items-center gap-10">
            {/* Search Bar and Other Links (Hidden when breadcrumb is shown) */}
            <ul className="flex justify-around gap-10 font-semibold text-xl">
              <Link to="/menshop">
                <li>MENS</li>
              </Link>
              <Link to="/womenshop">
                <li>WOMENS</li>
              </Link>
              <Link to="/kidshop">
                <li>KIDS</li>
              </Link>
            </ul>
            <div className="hidden lg:block bg-gray-100 text-gray-800 rounded-full p-2">
              <div className="flex justify-center items-center gap-3">
                <AiOutlineSearch className="text-2xl text-gray-400" />
                <input
                  type="text"
                  placeholder="What you looking for?"
                  className="w-full outline-none bg-inherit"
                />
              </div>
            </div>
            <div className="flex justify-around gap-10 text-xl">
              <Link to="/userProfile">
                <button className="flex flex-col justify-center items-center text-2xl">
                  <BsPerson />
                  <span className="text-xs">Profile</span>
                </button>
              </Link>

              <Link to="/wishList">
                <button className="flex flex-col justify-center items-center">
                  <BiHeart />
                  <span className="text-xs">Wishlist</span>
                </button>
              </Link>
              <Link to="/cart">
                <button className="relative flex flex-col justify-center items-center">
                  <div className="relative">
                    <BsCart3 size={24} />
                    {cartItemsCount > 0 && (
                      <div className="absolute -top-2 -right-4 flex items-center justify-center w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full">
                        {cartItemsCount}
                      </div>
                    )}
                  </div>
                  <span className="text-xs mt-1">Cart</span>
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
