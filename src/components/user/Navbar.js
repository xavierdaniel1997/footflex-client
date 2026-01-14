import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BsCreditCard, BsPerson, BsCart3 } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartDetails } from "../../redux/cartSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartItemsCount = useSelector(
    (state) => state.cart.cartItems?.items?.length || 0
  );
  const address = useSelector((state) => state.address.selectedAddress);

  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (location.pathname === "/cart") setCurrentStep(1);
    else if (location.pathname === "/address") setCurrentStep(2);
    else if (location.pathname === "/payment") setCurrentStep(3);
  }, [location]);

  useEffect(() => {
    dispatch(fetchCartDetails());
  }, [dispatch]);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleNavgate = () => {
    if (cartItemsCount > 0) navigate("/address");
  };

  const handleNavgatePymt = () => {
    if (cartItemsCount > 0 && address) navigate("/payment");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const isCheckout =
    location.pathname === "/cart" ||
    location.pathname === "/address" ||
    location.pathname === "/payment";

  return (
    <>
      {/* MAIN NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md px-5 md:px-10 lg:px-20 py-5 z-20">
        {/* 3 COLUMN DESKTOP LAYOUT */}
        <div className="flex items-center justify-between lg:grid lg:grid-cols-3">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-4 lg:justify-start">
            {/* MOBILE ONLY MENU BUTTON */}
            <button className="text-2xl lg:hidden" onClick={toggleMenu}>
              <FiMenu />
            </button>

            {/* LOGO */}
            <Link to="/">
              <div className="text-black text-2xl font-bold">
                FOOT<span className="text-blue-500">FLEX</span>
              </div>
            </Link>
          </div>

          {/* CENTERED MEN / WOMEN / KIDS — DESKTOP ONLY */}
          {!isCheckout && (
            <ul className="hidden lg:flex gap-10 font-semibold text-xl text-gray-700 justify-center">
              <Link to="/menshop"><li>MENS</li></Link>
              <Link to="/womenshop"><li>WOMENS</li></Link>
              <Link to="/kidshop"><li>KIDS</li></Link>
            </ul>
          )}

          {/* RIGHT SIDE ICONS + SEARCH (DESKTOP) */}
          {!isCheckout && (
            <div className="hidden lg:flex items-center justify-end gap-8">
              {/* SEARCH */}
              <form
                onSubmit={handleSearch}
                className="bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2"
              >
                <AiOutlineSearch className="text-2xl text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-inherit outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>

              {/* ICONS */}
              <div className="flex gap-6 text-xl">
                <Link to="/userProfile">
                  <BsPerson />
                </Link>

                <Link to="/wishList">
                  <BiHeart />
                </Link>

                <Link to="/cart">
                  <div className="relative">
                    <BsCart3 />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* RIGHT SIDE — MOBILE PROFILE ICON */}
          {!isCheckout && (
            <Link to="/userProfile" className="text-2xl lg:hidden">
              <BsPerson />
            </Link>
          )}
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {menuVisible && !isCheckout && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-white shadow-md py-8 px-10 text-center">
            <ul className="flex flex-col gap-6 font-semibold text-xl">
              <Link to="/menshop"><li>MENS</li></Link>
              <Link to="/womenshop"><li>WOMENS</li></Link>
              <Link to="/kidshop"><li>KIDS</li></Link>
              <Link to="/wishList"><li>Wishlist</li></Link>
              <Link to="/cart"><li>Cart</li></Link>
            </ul>

            {/* MOBILE SEARCH */}
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-3 bg-gray-100 mt-6 rounded-full p-3"
            >
              <AiOutlineSearch className="text-2xl text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full outline-none bg-inherit"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        )}
      </nav>

      {/* CHECKOUT STEPS — DESKTOP + MOBILE */}
      {isCheckout && (
        <div className="fixed top-20 left-0 right-0 bg-white shadow-sm z-10 py-3 px-5 flex justify-center">
          <div className="flex items-center gap-5 sm:gap-10 text-sm sm:text-base">

            {/* CART */}
            <Link to="/cart">
              <div
                className={`flex items-center gap-1 ${
                  currentStep >= 1 ? "text-green-600" : "text-gray-400"
                }`}
              >
                <BsCart3 className="text-xl" />
                <span>Cart</span>
              </div>
            </Link>

            <div
              className={`w-6 sm:w-10 border-t-2 ${
                currentStep >= 1 ? "border-green-600" : "border-gray-300"
              }`}
            />

            {/* ADDRESS */}
            <div
              className={`flex items-center gap-1 ${
                currentStep >= 2 ? "text-green-600 cursor-pointer" : "text-gray-400"
              }`}
              onClick={handleNavgate}
            >
              <AiOutlineHome className="text-xl" />
              <span>Address</span>
            </div>

            <div
              className={`w-6 sm:w-10 border-t-2 ${
                currentStep >= 2 ? "border-green-600" : "border-gray-300"
              }`}
            />

            {/* PAYMENT */}
            <div
              className={`flex items-center gap-1 ${
                currentStep >= 3 ? "text-green-600 cursor-pointer" : "text-gray-400"
              }`}
              onClick={handleNavgatePymt}
            >
              <BsCreditCard className="text-xl" />
              <span>Payment</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
