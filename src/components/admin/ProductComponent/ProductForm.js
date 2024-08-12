import React, {useEffect, useState} from "react";
import BreadCrumbWithButton from "../BreadCrumbWithButton";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {FaImage, FaTimes, FaPlus} from "react-icons/fa";
import ImageUploadSection from "./ImageUploadSection";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryItems} from "../../../redux/categorySlice";
import api from "../../../config/axiosConfig";
import {toast, Toaster} from "react-hot-toast";
import {validateProductForm} from "../../../utils/validateForms";

const ProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  const {productId} = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const [errors, setErrors] = useState({});
  // const [totalStock, setTotalStock] = useState(0);
  const [getBrands, setGetBrands] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "",
    brand: "",
    gender: "",
    stock: "",
    regularPrice: "",
    salePrice: "",
    sizes: [{size: "", stock: 0}],
  });
  const [imageData, setImageData] = useState({
    thumbnail: null,
    galleryImages: [],
  });

  const fetchBrands = async () => {
    const response = await api.get("/brand/getAllBrands");
    setGetBrands(response?.data?.brandData);
  };

  useEffect(() => {
    dispatch(getCategoryItems());
    fetchBrands();

    if (productId) {
      setIsEditing(true);
      fetchProductDetial(productId);
    }
  }, [dispatch, productId]);

  // fetching the current product to edit
  const fetchProductDetial = async (id) => {
    try {
      const response = await api.get(`product/product-detial/${id}`);
      const product = response?.data?.productDetial
      setFormData({
        productName: product?.productName,
        description: product?.description,
        category: product?.category?._id,
        brand: product?.brand?._id,
        gender: product?.gender,  
        regularPrice: product?.regularPrice,
        salePrice: product?.salePrice,
        stock: product?.stock,
        sizes: product.sizes,
      });
      setImageData({
        thumbnail: product.thumbnail,
        galleryImages: product?.gallery,
      }) 
    } catch (error) {
      console.log(error);
    }
  };

  const getBrandLogo = (brandId) => {
    const brand = getBrands?.find((brand) => brand?._id === brandId);
    return brand ? brand.logo : null;
  };

  const handleShowProducts = () => {
    navigate("/dashboard/products");
  };

  // size fields adding
  const handleSizeChange = (index, field, value) => {
    const newSizes = [...formData.sizes];
    newSizes[index][field] = value;
    setFormData({...formData, sizes: newSizes});
  };

  const addSize = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, {size: "", stock: 0}],
    });
  };

  const removeSize = (index) => {
    const newSizes = formData.sizes.filter((_, i) => i !== index);
    setFormData({...formData, sizes: newSizes});
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageData = (data) => {
    setImageData(data);
  };

  const {thumbnail, galleryImages} = imageData;
 
  const submitProductForm = async () => {
    const validateForm = validateProductForm(formData);
    setErrors(validateForm);
    if (Object.keys(validateForm).length === 0)
      try {
        const data = {...formData, ...imageData}
        let response;
        if(isEditing){
          response = await api.put(`product/product-modify/${productId}`, data)
        }else{
          response = await api.post("product/addProduct", data);
        }
        if (response.status === 200) {
          toast.success(response.data.message);
          setFormData({
            productName: "",
            description: "",
            category: "",
            brand: "",
            gender: "",
            stock: "",
            regularPrice: "",
            salePrice: "",
            sizes: [{size: "", stock: 0}],
          });
          setImageData({
            thumbnail: null,
            galleryImages: [],
          });
        }
        console.log("rsp of Productadd", response);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
  };

  return (
    <div className="container mx-auto px-4">
      <BreadCrumbWithButton
        componentLocation={isEditing ? "Edit Product" : "Add New Product"}
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
              {/* product name container */}
              <div>
                <label
                  className={`text-sm font-medium  flex ${
                    errors.productName ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  Product Name
                  {errors.productName && (
                    <p className="text-red-500 text-sm px-2">
                      {errors.productName}
                    </p>
                  )}
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              {/* product description */}
              <div>
                <label
                  className={`text-sm font-medium  flex ${
                    errors.productName ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  Description{" "}
                  {errors.description && (
                    <p className="text-red-500 text-sm px-2">
                      {errors.description}
                    </p>
                  )}
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              {/* product category */}
              <div>
                <label
                  className={`text-sm font-medium  flex ${
                    errors.category ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  Category
                  {errors.category && (
                    <p className="text-red-500 text-sm px-2">
                      {errors.category}
                    </p>
                  )}
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">Select Category</option>
                  {categories?.map((category) => (
                    <option key={category?._id} value={category?._id}>
                      {category?.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* product brand */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
                  {getBrandLogo(formData.brand) ? (
                    <img
                      src={getBrandLogo(formData.brand)}
                      alt={`${formData.brand} logo`}
                      className=" rounded-full object-contain"
                    />
                  ) : (
                    <FaImage className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-grow">
                  <label
                    className={`text-sm font-medium  flex ${
                      errors.brand ? "text-red-500" : "text-gray-700"
                    }`}
                  >
                    Brand Name
                    {errors.brand && (
                      <p className="text-red-500 text-sm px-2">
                        {errors.brand}
                      </p>
                    )}
                  </label>
                  <select
                    id="brandName"
                    name="brand"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={formData.brand}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Brand</option>
                    {getBrands?.map((brand) => (
                      <option key={brand._id} value={brand?._id}>
                        {brand.brandName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* product gender */}
              <div>
                <label
                  className={`text-sm font-medium  flex ${
                    errors.gender ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  Gender
                  {errors.gender && (
                    <p className="text-red-500 text-sm px-2">{errors.gender}</p>
                  )}
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">Select gender</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              {/* product stock */}
              {/* <div className="flex gap-4"> */}
              <div className="">
                <label
                  className={`text-sm font-medium  flex ${
                    errors.stock ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  Total Stock
                  {errors.stock && (
                    <p className="text-red-500 text-sm px-2">{errors.stock}</p>
                  )}
                </label>
                <input
                  type="text"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              {/* product price */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label
                    className={`text-sm font-medium  flex ${
                      errors.regularPrice ? "text-red-500" : "text-gray-700"
                    }`}
                  >
                    Regular Price
                    {errors.regularPrice && (
                      <p className="text-red-500 text-sm px-2">
                        {errors.regularPrice}
                      </p>
                    )}
                  </label>
                  <input
                    type="number"
                    id="regularPrice"
                    name="regularPrice"
                    value={formData.regularPrice}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>

                {/* sale price */}
                <div className="w-1/2">
                  <label
                    className={`text-sm font-medium  flex ${
                      errors.salePrice ? "text-red-500" : "text-gray-700"
                    }`}
                  >
                    Sale Price
                    {errors.salePrice && (
                      <p className="text-red-500 text-sm px-2">
                        {errors.salePrice}
                      </p>
                    )}
                  </label>
                  <input
                    type="number"
                    id="salePrice"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </div>
              <div>
                {/* Sizes and Stock */}

                <label
                  className={`text-sm font-medium flex ${
                    errors.stock ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  Sizes and Stock{" "}
                  {errors.stock && (
                    <p className="text-red-500 text-sm px-2">{errors.stock}</p>
                  )}
                </label>
                {formData.sizes?.map((sizeObj, index) => (
                  <div key={index} className="flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      placeholder="Size"
                      value={sizeObj.size}
                      onChange={(e) =>
                        handleSizeChange(index, "size", e.target.value)
                      }
                      className="flex-grow border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={sizeObj.stock}
                      onChange={(e) =>
                        handleSizeChange(index, "stock", e.target.value)
                      }
                      className="flex-grow border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="p-2 text-red-600 border-2 border-red-600 rounded-md"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSize}
                  className="mt-2 p-2 bg-green-500 text-white rounded-md flex items-center"
                >
                  <FaPlus className="mr-1" /> Add Size
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 ">
          <ImageUploadSection onImageData={handleImageData} editingImage={imageData}/>
        </div>
      </div>
      {/* Updated button container */}
      <div className="mt-6 px-20">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={submitProductForm}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
          >
            {isEditing? "Update" : "Save"}
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
