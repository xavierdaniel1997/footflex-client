import React, { useState } from "react";
import bannerImg from "../../assets/images/fachry-zella-devandra-bNSdIkCBJOs-unsplash.jpg";
import api from "../../config/axiosConfig";

const PopularBrands = () => {
  const [brandDetials, setBrandDetials] = useState([])
  const brands = [
    "adidas",
    "nike",
    "new-balance",
    "jordan",
    "asics",
    "under-armour",
    "louis-vuitton",
    "crocs",
    "adidas",
    "nike",
    "new-balance",
    "jordan",
  ];

  const fetchingAllBrands = async () => {
    try{
      const response = await api.get("/brand/getAllBrands")
      setBrandDetials(response?.data?.brandData)
    }catch(error){
      console.log(error)
    }
  }

  useState(() => {
    fetchingAllBrands()
  }, [])


  return (
    <div className="mx-auto max-w-full">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold">Popular Brands</h2>
        <button className="text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-8 sm:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="flex space-x-4 sm:space-x-6 md:space-x-8 overflow-x-auto pb-6 sm:pb-8 mb-6 hide-scrollbar">
        {brandDetials?.map((brand, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gray-200 rounded-full flex items-center justify-center"
          >
            <img
              src={brand?.logo}
              alt={brand}
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain rounded-full"
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-xl">
        <img
          src={bannerImg}
          alt="Sneaker"
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] xl:h-[36rem] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center pl-8 sm:pl-12 md:pl-16 lg:pl-20 text-white">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 md:mb-4">
            Limited time only
          </p>
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-8xl font-extrabold mb-3 sm:mb-4 md:mb-6 leading-tight">
            Get 30% off
          </h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium max-w-md lg:max-w-lg xl:max-w-xl">
            Sneakers made with your comfort in mind so you can put all of your
            focus into your next session.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularBrands;
