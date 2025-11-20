import React, { useEffect, useState } from "react";
import ImageGallery from "../../components/user/ImageGallery";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../config/axiosConfig";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartDetails } from "../../redux/cartSlice";
import { addItemToWishList, fetchWishList, removeItemFromWishList } from "../../redux/wishListSlice";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
   const { userName, isAuthenticated, status } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishList.items);
  const [product, setProduct] = useState(null);
  const [priceDiscount, setPriceDiscount] = useState(null)
  const [selectSize, setSelectSize] = useState(null);
  const [error, setError] = useState("");
  const [isInCart, setIsInCart] = useState(false);
  const [isWishList, setIsWishList] = useState(false)
  const { id } = useParams();

  const fetchProdctDetial = async () => {
    try {
      const response = await api.get(`/product/product-detial/${id}`);
      setProduct(response?.data?.productDetial);
      setPriceDiscount(response?.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProdctDetial();
    dispatch(fetchWishList())
    // dispatch(fetchCartDetails());
  }, [id, dispatch]);



  // cart functions
  const checkIfInCart = () => {
    return cartItems.items?.some((item) => item.productId._id === product?._id);
  };

  useEffect(() => {
    if (product && cartItems.items) {
      setIsInCart(checkIfInCart());
    }
  }, [product, cartItems]);

  const handleAddToCart = async () => {
    if(!isAuthenticated){
      navigate("/login")
    }
    if (!selectSize) {
      setError("Please select a size");
      return;
    }
    setError("");
    dispatch(
      addToCart({
        productId: product._id,
        size: selectSize,
      })
    ).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success("Added to cart successfully");
        setIsInCart(!isInCart);
        dispatch(fetchCartDetails());
      } else {
        toast.error("Failed to add");
      }
    });
  };




  useEffect(() => {
    if (product) {
      const isInWishList = wishlistItems.some(item => item._id === product._id);
      setIsWishList(isInWishList);
    }
  }, []);

  const toggleWishList = () => {
    if (isWishList) {
      dispatch(removeItemFromWishList(id));
    } else {
      dispatch(addItemToWishList(id));
    }
    setIsWishList(!isWishList)
  };



  return (
  <div className="px-4 sm:px-6 md:px-10 py-6">
    {/* Breadcrumb */}
    <div className="mb-6 sm:mb-8">
      <span className="text-gray-600 font-semibold text-sm sm:text-base">
        Home / Product Details / {product?.gender}
      </span>
    </div>

    {/* Main Content Layout */}
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

      {/* LEFT: Image Gallery */}
      <div className="w-full lg:w-2/3">
        <ImageGallery galleryImg={product?.gallery} />
      </div>

      {/* RIGHT: Product Info */}
      <div className="w-full lg:w-1/3">

        {/* Gender + Wishlist */}
        <div className="flex justify-between items-center">
          <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            {product?.gender}
          </span>
          <button onClick={toggleWishList}>
            {isWishList ? (
              <AiFillHeart size={26} color="red" />
            ) : (
              <AiOutlineHeart size={26} />
            )}
          </button>
        </div>

        {/* Product Name */}
        <h1 className="text-2xl sm:text-3xl font-bold mt-3">
          {product?.productName}
        </h1>

        {/* Price */}
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <p
            className={`text-blue-500 text-2xl font-semibold ${
              priceDiscount?.discountedPrice ? "line-through" : ""
            }`}
          >
            ₹ {product?.salePrice}
          </p>

          {priceDiscount?.discountedPrice && (
            <p className="text-red-600 text-2xl font-semibold">
              ₹ {priceDiscount?.discountedPrice} ({priceDiscount?.offerPercentage}% OFF)
            </p>
          )}
        </div>

        {/* Review & Rating Placeholder */}
        <div className="mt-5">
          <p className="font-semibold">Review & Rating</p>
          <div className="flex space-x-2 mt-2 text-gray-500">
            star rating and reviews
          </div>
        </div>

        {/* Size Selection */}
        <div className="mt-5">
          <div className="flex gap-3">
            <p className="font-semibold">Size</p>
            <p className="text-red-600">{error}</p>
          </div>

          <div className="flex flex-wrap gap-3 mt-3">
            {product?.sizes?.map((size) => (
              <div key={size._id} className="text-center">
                <button
                  className={`px-4 py-2 border rounded-lg transition-all ${
                    selectSize === size.size
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  disabled={size.stock === 0}
                  onClick={() => setSelectSize(size.size)}
                >
                  {size.size}
                </button>
                <p
                  className={`text-sm mt-1 ${
                    size.stock <= 1 ? "text-red-500" : "text-green-700"
                  }`}
                >
                  {size.stock > 0 ? `${size.stock} left` : "Out of stock"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="mt-5 flex gap-4 items-center">
          <h1 className="font-semibold text-lg text-gray-600">Availability:</h1>
          <p
            className={`text-lg font-semibold ${
              product?.status ? "text-green-800" : "text-red-600"
            }`}
          >
            {product?.status ? "Available" : "Unavailable"}
          </p>
        </div>

        {/* Buttons */}
        {!isInCart ? (
          <button
            className={`w-full mt-5 py-3 rounded-lg text-lg ${
              product?.status
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-700 cursor-not-allowed"
            }`}
            onClick={handleAddToCart}
            disabled={!product?.status}
          >
            Add to Cart
          </button>
        ) : (
          <Link to="/cart">
            <button
              className="w-full mt-5 py-3 rounded-lg text-lg bg-black text-white hover:bg-gray-800"
            >
              Go to Cart
            </button>
          </Link>
        )}

        <button
          className={`w-full mt-3 py-3 text-lg rounded-lg ${
            product?.status
              ? "bg-blue-600 text-white"
              : "bg-blue-400 text-white cursor-not-allowed"
          }`}
          disabled={!product?.status}
        >
          Buy It Now
        </button>

        {/* Description */}
        <div className="mt-6">
          <p>
            <span className="font-semibold">About: </span>
            {product?.description}
          </p>
        </div>

        {/* Brand Details */}
        <h1 className="font-bold text-gray-700 text-xl mt-8">Brand Details</h1>
        <div className="flex items-center gap-6 mt-5">
          <img
            src={product?.brand?.logo}
            alt=""
            className="w-24 h-24 object-cover rounded-md"
          />
          <div>
            <h2 className="font-semibold text-xl">
              By {product?.brand?.brandName}
            </h2>
            <p className="text-gray-700 text-sm mt-1">
              {product?.brand?.brandTitle}
            </p>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="mt-8">
          <h2 className="font-bold text-xl">About the Delivery</h2>
          <p className="text-sm mt-3">Shadow Navy / Army Green</p>
          <p className="text-sm mt-2 text-gray-700">
            This product is excluded from all promotional discounts and offers.
          </p>
          <ul className="list-disc list-inside mt-3 text-sm text-gray-700">
            <li>For fast delivery, use net banking or UPI.</li>
            <li>
              Join footFlex-club for free standard shipping, returns & exchanges.
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="mt-10">{/* <RelatedProducts /> */}</div>
  </div>
);

};



export default ProductDetails;
