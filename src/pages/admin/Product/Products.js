import React, {useEffect, useState} from "react";
import {FaPlus, FaRegEdit} from "react-icons/fa";
import {BsThreeDotsVertical} from "react-icons/bs";
import ReusableTable from "../../../components/admin/ReusableTable";
import {MdDeleteOutline} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import api from "../../../config/axiosConfig";
import ConfirmationModal from "../../../components/admin/ConfirmationModal";

const Products = () => {
  const [getProducts, setGetProducts] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProductDetials = async () => {
    try {
      const response = await api.get("product/getProducts");
      setGetProducts(response?.data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDetials();
  }, []);
  console.log("this is frm the product detials page productdetial", getProducts)

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

  const handleDeleteProduct = (id) => {
    setProductToDelete(id);
    setConfirmDelete(true);
  };

  const confirmDeletion = async () => {
    try {
      await api.delete(`/product/product-removeing/${productToDelete}`);
      setGetProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productToDelete)
      );
      setConfirmDelete(false);
      setProductToDelete(null);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const handleEditProduct = (productId) => {
    navigate(`/dashboard/editProduct/${productId}`);
  };

  const handleToggleStatus = async (productId) => {
    try {
      const response = await api.put(`product/activate-product/${productId}`);
      const updatedProduct = response?.data?.product;
      setGetProducts(prevProducts => prevProducts?.map((product) => product._id === productId ? {...product, status: updatedProduct.status} : product))
   
    } catch (error) {
      console.log(error);
    }
    console.log("frm the toggle status product", productId);
  };

  const productDetials =
    getProducts?.map((product) => ({
      clickbox: (
        <div>
          <input
            type="checkbox"
            value={product?.status}
            onChange={() => handleToggleStatus(product?._id)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
        </div>
      ),
      productName: (
        <div className="flex items-center gap-2">
          <img
            src={product?.thumbnail}
            alt={product.productName}
            className="h-12 w-12 object-contain"
          />
          {product.productName}
        </div>
      ),
      category: product?.category?.categoryName,
      productID: product?._id,
      quantity: product?.stock,
      price: product?.salePrice,
      status: (
        <div
          className={`text-center rounded-md py-1 px-2 font-semibold ${
            product?.status
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-600"
          }`}
        >
          {product.status ? "Active" : "Inactive"}
        </div>
      ),
      action: (
        <div className="flex space-x-2">
          <FaRegEdit
            className="text-green-700 cursor-pointer text-xl"
            onClick={() => handleEditProduct(product._id)}
          />
          <MdDeleteOutline
            className="text-red-500 cursor-pointer text-xl"
            onClick={() => handleDeleteProduct(product._id)}
          />
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
          <Link to="/dashboard/addNewProduct">
            {" "}
            <button className="bg-black text-white p-2 rounded-md flex items-center">
              <span className="mr-2">Add New Product</span>
              <FaPlus />
            </button>
          </Link>
        </div>
      </div>
      <div className="px-10">
        <ReusableTable columns={columns} data={productDetials} />
      </div>
      <ConfirmationModal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        message={"Are you sure you want to delete this product?"}
        onConfirm={confirmDeletion}
      />
    </div>
  );
};

export default Products;
