import React, {useState} from "react";
import {AiOutlineSearch} from "react-icons/ai";
import {BsBag, BsPerson} from "react-icons/bs";
import {BiHeart} from "react-icons/bi";
import {FiMenu} from "react-icons/fi";
import {Link} from "react-router-dom";

const NavBar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <nav className=" fixed top-0 left-0 right-0 px-7 py-6 shadow-md lg:mx-auto lg:px-20 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button className="text-2xl" onClick={toggleMenu}>
            <FiMenu />
          </button>
        </div>

        {/* Logo (Centered on Small Devices) */}
        <Link to="/">
          <div className="text-black text-2xl font-bold ">
            FOOT<span className="text-green-500">FLEX</span>
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
          <div className="lg:hidden bg-white text-gray-600  absolute top-20 left-0 right-0 py-10 px-10">
            <ul className="flex flex-col gap-5 justify-center items-center font-semibold text-xl">
              <Link to="menshop">
                <li>MENS</li>
              </Link>
              <Link to="womenshop">
                <li>WOMENS</li>
              </Link>
              <Link to="kidshop">
                <li>KIDS</li>
              </Link>
            </ul>
          </div>
        )}

        {/* Search Bar */}
        <div className="hidden lg:flex  text-gray-600 justify-center items-center gap-10">
          <ul className="flex justify-around gap-10 font-semibold text-xl">
            <Link to="menshop">
              <li>MENS</li>
            </Link>
            <Link to="womenshop">
              <li>WOMENS</li>
            </Link>
            <Link to="kidshop">
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
            <Link to="/profile">
              <button className="flex flex-col justify-center items-center text-2xl">
                <BsPerson />
                <span className="text-xs">Profile</span>
              </button>
            </Link>

            <button className="flex flex-col justify-center items-center">
              <BiHeart />
              <span className="text-xs">Wishlist</span>
            </button>
            <button className="flex flex-col justify-center items-center">
              <BsBag />
              <span className="text-xs">Cart</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
