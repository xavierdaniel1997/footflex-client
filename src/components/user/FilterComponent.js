import React, {useEffect, useState} from "react";
import api from "../../config/axiosConfig";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryItems} from "../../redux/categorySlice";

const priceRanges = [
  "Rs. 5999 to Rs. 9999",
  "Rs. 9999 to Rs. 15999",
  "Rs. 15999 to Rs. 19999",
  "Rs. 19999 to Rs. 25999",
  "Rs. 25999 to Rs. 29999",
];

const FilterComponent = ({filters, onFilterChange}) => {
  const [myBrands, setMyBrands] = useState([]);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  const fetchBrand = async () => {
    try {
      const response = await api("/brand/getAllBrands");
      setMyBrands(response?.data?.brandData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBrand();
    dispatch(getCategoryItems());
  }, []);

  const handleToggleBrands = () => {
    setShowAllBrands(!showAllBrands);
  };

  const handleFilterChange = (type, value) => {
    const newFilters = {...filters};
    if (newFilters[type].includes(value)) {
      newFilters[type] = newFilters[type].filter((item) => item !== value);
    } else {
      newFilters[type].push(value);
    }
    onFilterChange(newFilters);
  };

  const removeFilter = (type, value) => {
    const newFilters = {...filters};
    newFilters[type] = newFilters[type].filter((item) => item !== value);
    onFilterChange(newFilters);
  };

  const displayedBrands = showAllBrands ? myBrands : myBrands.slice(0, 8);

  console.log("this is frm the filter page categories", categories)
  
  return (
    <div className="w-72 bg-gray-50 border shadow-lg rounded-sm px-6 py-4">
      <div className="mb-4 flex flex-wrap gap-1">
        {["brands", "categories", "prices"].map((type) =>
          filters[type].map((filterValue) => (
            <div key={filterValue} className="flex items-center mb-1 border-2 rounded-full px-2 w-fit">
              <span className="mr-2">{filterValue}</span>
              <button onClick={() => removeFilter(type, filterValue)}>×</button>
            </div>
          ))
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">BRAND</h3>
        {displayedBrands?.map((brand) => (
          <div key={brand?._id} className="flex items-center mb-1">
            <input type="checkbox" className="mr-2" 
            checked={filters.brands.includes(brand.brandName)}
            onChange={() => handleFilterChange('brands', brand.brandName)}
            />
            <label>{brand?.brandName}</label>
          </div>
        ))}
        <button
          className="text-blue-500 text-sm mt-1"
          onClick={handleToggleBrands}
        >
          {showAllBrands ? "less" : "more"}
        </button>
      </div>

      {/* <div className="mb-4">
        <h3 className="font-medium mb-2">PRICE</h3>
        {priceRanges.map((range, index) => (
          <div key={index} className="flex items-center mb-1">
            <input type="checkbox" id={`price-${index}`} className="mr-2"
            checked={filters.prices.includes(range)}
            onChange={() => handleFilterChange('prices', range)} 
            />
            <label htmlFor={`price-${index}`}>{range}</label>
          </div>
        ))}
      </div> */}

      <div className="">
        <h3 className="font-medium mb-2">TYPE OFF</h3>
        {categories?.map((category) => (
          <div key={category?._id} className="flex items-center mb-1">
            <input type="checkbox" className="mr-2" 
             checked={filters.categories.includes(category.categoryName)}
             onChange={() => handleFilterChange('categories', category.categoryName)}
            />
            <label>{category?.categoryName}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
