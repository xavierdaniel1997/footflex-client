import React, {useEffect, useState} from "react";
import ShoeCard from "../../components/user/ShoeCard";
import {FaFilter} from "react-icons/fa";
import api from "../../config/axiosConfig";
import FilterComponent from "../../components/user/FilterComponent";
import {useDispatch} from "react-redux";
import {fetchWishList} from "../../redux/wishListSlice";
import ShoeCardShimmer from "../../components/user/ShoeCardShimmer";

const ShopPage = ({gender}) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(false);
  const [productDetials, setProductDetials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    // gender,
    brands: [],
    categories: [],
    prices: [],
    sort: "Recommended",
  });

  const fetchProductDetials = async () => {
    try {
      const resposne = await api.get(
        `product/product-By-query?gender=${gender}`
      );
      setProductDetials(resposne?.data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilteredProducts = async () => {
    try {
      const params = {
        gender: gender,
        brands: filters.brands.join(","),
        categories: filters.categories.join(","),
        // prices: filters.prices.join(","),
        sort: filters.sort,
      };

      console.log("Fetching products with params:", params);
      const response = await api.get("product/filter-items", {params});
      setLoading(false);
      setProductDetials(response?.data?.products);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [filters, gender]);

  useEffect(() => {
    setFilters({
      gender,
      brands: [],
      categories: [],
      prices: [],
      sort: "Recommended",
    });
    // fetchProductDetials();
    fetchFilteredProducts();
  }, [gender]);

  const handleFilterChange = (newFilters) => {
    console.log("Filters received in ShopPage:", newFilters);
    setFilters({...filters, ...newFilters});
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      sort: selectedSort,
    }));
  };


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
            <select
              className="form-select block w-full sm:w-auto outline-none"
              onChange={handleSortChange}
              value={filters.sort}
            >
              <option value="Recommended">Recommended</option>
              <option value="Low to High">Low to High</option>
              <option value="High to Low">High to Low</option>
              <option value="aA - zZ">aA - zZ </option>
              <option value="zZ - aA">zZ - aA </option>
            </select>
          </div>
        </div>

        {/* <div>filter items</div> */}

        <div className="flex flex-col lg:flex-row">
          {/* Filter Component */}
          {filter && (
            <div className="lg:w-1/4 w-full">
              <FilterComponent
                onFilterChange={handleFilterChange}
                filters={filters}
              />
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
              {productDetials.length===0
                ? Array(8)
                    .fill(0)
                    .map((_, index) => <ShoeCardShimmer key={index} />)
                : productDetials?.map((productData) => (
                    <ShoeCard
                      key={productData?._id}
                      productData={productData}
                    />
                  ))}
              {/* {productDetials?.map((productData) => (
                <ShoeCard key={productData?._id} productData={productData} />
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
