import React, { useState } from "react";
import {FaPlus, FaRegEdit} from "react-icons/fa";
import {BsThreeDotsVertical} from "react-icons/bs";
import ReusableTable from "../../../components/admin/ReusableTable";
import productData from "./productsData.json";
import {MdDeleteOutline} from "react-icons/md";
import shoesImage from "../../../assets/images/jordanAir.png";
import ProductForm from "../../../components/admin/ProductComponent/ProductForm";
import { Link } from "react-router-dom";

const Products = () => {

  const columns = [
    {
      label: (
        <div>
          <BsThreeDotsVertical size={20} />
        </div>
      ),
      field: "clickbox",
    },
    {label: "Product Name", field: "productName"},
    {label: "Category", field: "category"},
    {label: "Product ID", field: "productID"},
    {label: "Quantity", field: "quantity"},
    {label: "Price", field: "price"},
    {label: "Status", field: "status"},
    {label: "Action", field: "action"},
  ];

  console.log("list of dummy product data", productData);

  const productDetials =
    productData.map((product) => ({
      clickbox: (
        <div>
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600"
          />
        </div>
      ),
      productName: (
        <div className="flex items-center gap-2">
          <img
            src={shoesImage}
            alt={product.productName}
            className="h-12 w-12 object-contain"
          />
          {product.productName}
        </div>
      ),
      category: product.category,
      productID: product.productId,
      quantity: product.quantity,
      price: product.price,
      status: product.status,
      action: (
        <div className="flex space-x-2">
          <FaRegEdit className="text-green-700 cursor-pointer text-xl" />
          <MdDeleteOutline className="text-red-500 cursor-pointer text-xl" />
        </div>
      ),
    })) || [];

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-10 py-5 mb-4">
        <div>
          <h1 className="text-2xl font-bold">Popular Brands</h1>
          <nav className="text-gray-600 text-sm">Home &gt; Brand</nav>
        </div>
        <div className="flex items-center">
         <Link to="/dashboard/addNewProduct"> <button className="bg-black text-white p-2 rounded-md flex items-center">
            <span className="mr-2">Add New Product</span>
            <FaPlus />
          </button>
          </Link>
        </div>
      </div>  
      <div className="px-10">
        <ReusableTable columns={columns} data={productDetials} />
      </div>
      {/* {openAddProduct && <ProductForm/>} */}
    </div>
  );
};

export default Products;
