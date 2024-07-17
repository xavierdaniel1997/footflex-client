import React from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { FaBell } from 'react-icons/fa6';

const TopNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md px-6 py-3 flex items-center justify-end space-x-6 gap-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="pr-8 pl-4 py-2 rounded-full border border-black focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-black"
        />
        <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2" />
      </div>
      <button className="relative text-gray-600 hover:text-gray-800">
        <FaBell className="w-6 h-6" />
        <span className="absolute bottom-4 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">3</span>
      </button>
      <div className="flex items-center space-x-2 border-2 border-black px-2 py-1 rounded-md">
        <span className="font-medium text-gray-700">ADMIN</span>
        <FiChevronDown className="text-gray-500" />
      </div>
    </nav>
  );
};

export default TopNavbar;
