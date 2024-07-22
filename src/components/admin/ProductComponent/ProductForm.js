import React, { useState } from "react";
import BreadCrumbWithButton from "../BreadCrumbWithButton";
import { useLocation, useNavigate } from "react-router-dom";
import { FaImage, FaTimes } from "react-icons/fa";
import ImageUploadSection from "./ImageUploadSection";

const ProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleShowProducts = () => {
    navigate("/dashboard/products");
  };

  return (
    <div className="container mx-auto px-4">
      <BreadCrumbWithButton
        componentLocation={"Add Product"}
        location={location.pathname}
        goback={"/dashboard/products"}
        buttonName={"Show Products"}
        buttonNavigate={handleShowProducts}
      />
      <div className="px-10 mt-8 flex flex-col md:flex-row gap-8 ">
        {/* left product details fields */}
        <div className="w-full md:w-1/2 bg-white py-10 px-5 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <form>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  defaultValue="Adidas Ultra boost"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  defaultValue="Long distance running requires a lot from athletes."
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  defaultValue="Sneaker"
                />
              </div>
              <div>
                <label
                  htmlFor="brandName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Brand Name
                </label>
                <input
                  type="text"
                  id="brandName"
                  name="brandName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  defaultValue="Adidas"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label
                    htmlFor="sku"
                    className="block text-sm font-medium text-gray-700"
                  >
                    SKU
                  </label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    defaultValue="#32453"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="stockQuantity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    id="stockQuantity"
                    name="stockQuantity"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    defaultValue="21"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label
                    htmlFor="regularPrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Regular Price
                  </label>
                  <input
                    type="number"
                    id="regularPrice"
                    name="regularPrice"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    defaultValue="110.40"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="salePrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sale Price
                  </label>
                  <input
                    type="number"
                    id="salePrice"
                    name="salePrice"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    defaultValue="95"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 ">
          <ImageUploadSection />
        </div>
      </div>
      {/* Updated button container */}
      <div className="mt-6 px-10">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
          >
            Save
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;