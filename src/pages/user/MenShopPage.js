import React, {useState} from "react";
import FilterComponent from "./FilterComponent";
import ShoeCard from "../../components/user/ShoeCard";
import {FaFilter} from "react-icons/fa";

const MenShopPage = () => {
  const [filter, setFilter] = useState(false);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Filter and Sort Options */}
      <div className="flex justify-between items-center mb-6 border-b-2 border-gray-200 pb-2">
        <div
          className="flex items-center space-x-5 cursor-pointer border-2 border-gray-300 px-8 py-2"
          onClick={() => setFilter(!filter)}
        >
          <FaFilter />
          <span className="font-semibold">FILTER</span>
        </div>
        <div className="flex items-center border-2 border-gray-300 px-8 py-2">
          <span className="mr-2">Sort by :</span>
          <select className="form-select block w-full sm:w-auto outline-none">
            <option>Recommended</option>
            <option>High to Low</option>
            <option>Low to High</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Component */}
        {filter && (
          <div className="lg:w-1/4 w-full">
            <FilterComponent />
          </div>
        )}

        {/* Shoes Container */}
        <div className={filter ? "lg:w-3/4 w-full" : "w-full"}>
          <div
            className={`grid gap-6 ${
              filter
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {/* Example ShoeCard components */}
            <ShoeCard />
            <ShoeCard />
            <ShoeCard />
            <ShoeCard />
            <ShoeCard />
            <ShoeCard />
            <ShoeCard />
            <ShoeCard />
            {/* Add more ShoeCard components as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenShopPage;
