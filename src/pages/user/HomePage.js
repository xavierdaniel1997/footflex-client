import React, { useEffect, useState } from 'react';
import PopularBrands from '../../components/user/PopularBrands';
import ShoeCard from '../../components/user/ShoeCard';
import api from '../../config/axiosConfig';

const HomePage = () => {
  const [newArrival, setNewArrival] = useState([])

  const fetchNewArrival = async () => {
    try{
      const resposne = await api.get("product/getProducts")
      setNewArrival(resposne?.data?.products)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchNewArrival()
  }, [])
  console.log("this is  frm the new arrival", newArrival)

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <PopularBrands />
      <div className="mt-8">
        {/* Heading for New Arrivals */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
          New Arrivals
        </h2>
        {/* Grid container for ShoeCard components */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrival?.map((productData, index) => (
            <ShoeCard key={productData?._id} productData={productData}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
