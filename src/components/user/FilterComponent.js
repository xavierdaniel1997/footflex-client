import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi'; // Filter icon from React Icons
import api from '../../config/axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryItems } from '../../redux/categorySlice';

const priceRanges = [
  'Rs. 5999 to Rs. 9999',
  'Rs. 9999 to Rs. 15999',
  'Rs. 15999 to Rs. 19999', 
  'Rs. 19999 to Rs. 25999',
  'Rs. 25999 to Rs. 29999',
];

const FilterComponent = () => {
  const [myBrands, setMyBrands] = useState([])
  const [showAllBrands, setShowAllBrands] = useState(false);
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category.categories)

  const fetchBrand = async () => {
    try{
      const response = await api("/brand/getAllBrands")
      setMyBrands(response?.data?.brandData)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    fetchBrand()
    dispatch(getCategoryItems())
  }, [])
 
  const handleToggleBrands = () => {
    setShowAllBrands(!showAllBrands);
  };
  const displayedBrands = showAllBrands ? myBrands : myBrands.slice(0, 8);

  console.log("this is form the filter compoent categories", categories)
  return (
    <div className="w-72 bg-gray-50 border shadow-lg rounded-sm px-6 py-4">

      <div className="mb-4">
        <h3 className="font-medium mb-2">BRAND</h3>
        {displayedBrands?.map((brand) => (
          <div key={brand?._id} className="flex items-center mb-1">
            <input type="checkbox" className="mr-2" />
            <label>{brand?.brandName}</label>
          </div>
        ))}
        <button className="text-blue-500 text-sm mt-1" onClick={handleToggleBrands}>
          {showAllBrands ? "less" : "more"}
        </button>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">PRICE</h3>
        {priceRanges.map((range, index) => (
          <div key={index} className="flex items-center mb-1">
            <input type="checkbox" id={`price-${index}`} className="mr-2" />
            <label htmlFor={`price-${index}`}>{range}</label>
          </div>
        ))}
      </div>

      <div className=''>
        <h3 className="font-medium mb-2">TYPE OFF</h3>
        {categories.map((category) => (
          <div key={category?._id} className="flex items-center mb-1">
          <input type="checkbox" className="mr-2" />
          <label>{category?.categoryName}</label>
        </div>
        ))}
        {/* <button className="text-blue-500 text-sm mt-1">more</button> */}
      </div>
    </div>
  );
};

export default FilterComponent;
