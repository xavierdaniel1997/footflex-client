import React, {useEffect, useState} from "react";
import {FaPlus} from "react-icons/fa";
import ReusableTable from "../../components/admin/ReusableTable";
import BrandForm from "../../components/admin/BrandComponent/BrandForm";
import api from "../../config/axiosConfig";

const BrandPage = () => {
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState([]);

  const fetchBrand = async (req, res) => {
    try {
      const response = await api.get("brand/getAllBrands");
      setBrands(response?.data?.brandData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBrand();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  console.log("this is form the brand page", brands);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-10 py-5 mb-4">
        <div>
          <h1 className="text-2xl font-bold">Popular Brands</h1>
          <nav className="text-gray-600 text-sm">Home &gt; Brand</nav>
        </div>
        <div className="flex items-center">
          <button
            className="bg-black text-white p-2 rounded-md flex items-center"
            onClick={handleClickOpen}
          >
            <span className="mr-2">Add New Brand</span>
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 px-10">
        {brands?.map((brand) => (
          <div
            key={brand.id}
            className="flex flex-col items-center w-40 h-40 mb-5 "
          >
            <img
              src={brand?.logo}
              alt={brand?.name}
              className="object-contain mb-2"
            />
            <h3 className="text-lg font-semibold mb-5">{brand?.brandName}</h3>
          </div>
        ))}
      </div> 
      


      <BrandForm open={open} handleClose={handleClose} />
    </div>
  );
};

export default BrandPage;
