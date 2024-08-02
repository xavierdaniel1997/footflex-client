import React, {useEffect, useState} from "react";
import ShoeCard from "../../components/user/ShoeCard";
import {FaFilter} from "react-icons/fa";
import api from "../../config/axiosConfig";
import FilterComponent from "../../components/user/FilterComponent";

const ShopPage = ({gender}) => {
  const [filter, setFilter] = useState(false);
  const [productDetials, setProductDetials] = useState([])
  const [loading, setLoading] = useState(true);

  const fetchProductDetials = async () => {
    try{
      const resposne = await api.get(`product/product-By-query?gender=${gender}`)
      setProductDetials(resposne?.data?.products)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProductDetials()
  }, [gender])

  console.log("this is form the respons of product detials ", productDetials)
  return (
    <div>
      <div className="pl-8">
      <span className="text-gray-600 font-semibold">Home / {gender}</span>
      </div>
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

      <div className="flex flex-col lg:flex-row">
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
            {productDetials?.map((productData) => (
              <ShoeCard key={productData?._id} productData={productData}/>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ShopPage;
