import React, { useEffect, useState } from "react";
import PopularBrands from "../../components/user/PopularBrands";
import ShoeCard from "../../components/user/ShoeCard";
import api from "../../config/axiosConfig";
import { useDispatch } from "react-redux";
import { fetchWishList } from "../../redux/wishListSlice";
import { fetchCartDetails } from "../../redux/cartSlice";
import ShoeCardShimmer from "../../components/user/ShoeCardShimmer";

const HomePage = () => {
  const dispatch = useDispatch();
  const [newArrival, setNewArrival] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchWishList());
    dispatch(fetchCartDetails());
  }, [dispatch]);

  const fetchNewArrival = async () => {
    try {
      const response = await api.get("product/getProducts");
      setNewArrival(response?.data?.products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrival();
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-10">
      {/* Popular Brands Section */}
      <div className="mb-10 sm:mb-12">
        <PopularBrands />
      </div>

      {/* New Arrivals Section */}
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
          New Arrivals
        </h2>

        {/* Responsive Grid */}
        <div
          className="
            grid 
            grid-cols-2 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5 
            gap-4 
            sm:gap-5 
            md:gap-6
          "
        >
          {isLoading
            ? Array(10)
                .fill(0)
                .map((_, index) => <ShoeCardShimmer key={index} />)
            : newArrival?.map((productData) => (
                <ShoeCard
                  key={productData?._id}
                  productData={productData}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
