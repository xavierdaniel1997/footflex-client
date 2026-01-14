import React, {useEffect, useState} from "react";
import {FaPlus, FaRegEdit} from "react-icons/fa";
import {BsThreeDotsVertical} from "react-icons/bs";
import ReusableTable from "../../../components/admin/ReusableTable";
import {MdBlock, MdDeleteOutline} from "react-icons/md";
import {CgUnblock} from "react-icons/cg";
import {Link, useLocation, useNavigate} from "react-router-dom";
import api from "../../../config/axiosConfig";
import ConfirmationModal from "../../../components/admin/ConfirmationModal";
import BlockModal from "../../../components/admin/BlockModal";
import BreadCrumbWithButton from "../../../components/admin/BreadCrumbWithButton";

const Products = () => {
  const [getProducts, setGetProducts] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [openBlockModal, setOpenBlockModal] = useState(false);
  const [productToBlock, setProductToBlock] = useState(null);
  const [blockButtonName, setBlockButtonName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const fetchProductDetials = async (currentPage, query = "") => {
    try {
      const response = await api.get(
        `product/getProductsToAdmin?page=${currentPage}&limit=${limit}&search=${query}`
      );
      console.log("this is frm the product page", response);
      setGetProducts(response?.data?.products);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDetials(page);
  }, [page]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    fetchProductDetials (1, query);
  };

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

  const handleBlockProduct = (productId) => {
    const product = getProducts.find((product) => product._id === productId);
    setOpenBlockModal(true);
    setProductToBlock(productId);
    setBlockButtonName(product?.status ? "Block" : "Unblock");
  };

  const confirmBlocking = async () => {
    try {
      const response = await api.put(
        `product/activate-product/${productToBlock}`
      );
      const updatedProduct = response?.data?.product;
      setGetProducts((prevProducts) =>
        prevProducts?.map((product) =>
          product._id === productToBlock
            ? {...product, status: updatedProduct.status}
            : product
        )
      );
      setOpenBlockModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const productDetials =
    getProducts?.map((product) => ({
      clickbox: (
        <div> 
          <input
            type="checkbox"
            checked={product?.status}
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
          {product?.status ? (
            <MdBlock
              className="text-red-500 cursor-pointer text-xl"
              onClick={() => handleBlockProduct(product?._id)}
            />
          ) : (
            <CgUnblock
              className="text-green-500 cursor-pointer text-xl"
              onClick={() => handleBlockProduct(product?._id)}
            />
          )}
        </div>
      ),
    })) || [];

  const location = useLocation();
  const handlePageChange = (event, value) => {
    setPage(value);
  };

 

  return (
    <div className="flex flex-col">
      <BreadCrumbWithButton
        buttonName={"Add New Product"}
        noButton={true}
        buttonNavigate={"/dashboard/addNewProduct"}
        componentLocation={"Popular Brands"}
        location={location.pathname}
        showSearch={true}
        onSearch={handleSearch}
      />
      <div className="px-10">
        <ReusableTable
          columns={columns}
          data={productDetials}
          page={page}
          rowsPerPage={limit}
          totalCount={totalCount}
          onPageChange={handlePageChange}
          isPagination={true}
        />
      </div>
      <ConfirmationModal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        message={"Are you sure you want to delete this product?"}
        onConfirm={confirmDeletion}
      />

      <BlockModal
        open={openBlockModal}
        onClose={() => setOpenBlockModal(false)}
        message={"Are you sure you want to block this product?"}
        buttonName={blockButtonName}
        onConfirm={confirmBlocking}
      />
    </div>
  );
};

export default Products;
