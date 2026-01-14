import React, { useState } from "react";
import {FaPlus} from "react-icons/fa";
import {Link} from "react-router-dom";
import {FiSearch} from "react-icons/fi";

const BreadCrumbWithButton = ({
  componentLocation,
  location,
  goback,
  buttonName,
  buttonNavigate,
  noButton,
  onClick,
  onSearch,
  showSearch
}) => {

  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value)
}

const handleSearchSubmit = () => {
    onSearch(query)
}

  return (
    <div className="flex justify-between items-center px-10 py-5 mb-4">
      <div>
        <h1 className="text-2xl font-bold">{componentLocation}</h1>
        <Link to={goback}>
          <nav className="text-gray-600 text-sm">{location}</nav>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div>
          {showSearch ? (<div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pr-8 pl-4 py-2 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-black"
              onChange={handleSearchChange}
            />
            <button
            onClick={handleSearchSubmit}
            >
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2" />
            </button>
          </div>) : ""}
          
        </div>
        <Link to={buttonNavigate}>
          <div className="flex items-center">
            {noButton && (
              <button
                className="bg-black text-white p-2 rounded-md flex items-center"
                onClick={onClick}
              >
                <span className="mr-2">{buttonName}</span>
                <FaPlus />
              </button>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BreadCrumbWithButton;
