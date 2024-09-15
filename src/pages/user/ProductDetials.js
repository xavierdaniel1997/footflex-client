import React, { useEffect, useState } from "react";
import ImageGallery from "../../components/user/ImageGallery";
import { Link, useLocation, useParams } from "react-router-dom";
import api from "../../config/axiosConfig";
import { FaRegHeart } from "react-icons/fa";
import RelatedProducts from "../../components/user/RelatedProducts";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartDetails } from "../../redux/cartSlice";
import { addItemToWishList, fetchWishList, removeItemFromWishList } from "../../redux/wishListSlice";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ProductDetails = () => {
  const dispatch = useDispatch();
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

  console.log("this is from the product details page", product)
  return (
    <div className="px-10">
      <div className="mb-8 ">
        <span className="text-gray-600 font-semibold">
          Home / ProductDetials / {product?.gender}
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-14">
        <div className="md:w-2/3">
          <ImageGallery galleryImg={product?.gallery} />
        </div>

        {/* product details */}
        <div className="md:w-1/3 mt-4 md:mt-0">
          <div className="flex justify-between items-center">
            <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
              {product?.gender}
            </span>
            <button className="mr-2"
              onClick={toggleWishList}
            >
              {/* <FaRegHeart size={22} /> */}
              {isWishList ? <AiFillHeart color="red" size={24} /> : <AiOutlineHeart size={24} />}
            </button>
          </div>
          <h1 className="text-2xl font-bold mt-2">{product?.productName}</h1>

          <div className="flex items-center gap-2 mt-2">
          <p className={`text-blue-500 text-2xl  font-semibold ${priceDiscount?.discountedPrice ? "line-through" : ""}`}>
            ₹ {product?.salePrice}   
          </p>  
  
          {priceDiscount?.discountedPrice && (
              <p className="text-red-600 text-2xl font-semibold">
                {priceDiscount?.discountedPrice} ({priceDiscount?.offerPercentage}% OFF)
              </p>
            )}

          </div>

          <div className="mt-4">
            <p className="font-semibold">Review and Rating</p>
            <div className="flex space-x-2 mt-2">star rating and reviews</div>
          </div>

          <div className="mt-4">
            <div className="flex gap-3">
              <p className="font-semibold">Size</p>
              <div className="text-red-600">{error}</div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {product?.sizes?.map((size) => (
                <div key={size._id} className="text-center">
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-lg focus:outline-none ${selectSize === size.size ? "bg-black text-white" : " "
                      }`}
                    disabled={size.stock === 0}
                    onClick={() => setSelectSize(size.size)}
                  >
                    {size?.size}
                  </button>
                  <p
                    className={`text-sm mt-1 ${size.stock === 0 || size.stock === 1
                      ? "text-red-500"
                      : "text-green-700"
                      }`}
                  >
                    {size.stock > 0 ? `${size.stock} left` : "Out of stock"}
                  </p>
                </div>
              ))}
            </div>
            {/* <a href="#" className="text-blue-500 mt-2 block">Size Chart</a> */}
          </div>
          <div className="mt-4 flex items-center gap-4">
            <h1 className="font-semibold text-xl text-gray-600">
              Availability :
            </h1>
            <p
              className={`text-xl font-semibold ${product?.status ? "text-green-800" : "text-red-600"
                }`}
            >
              {product?.status ? "Available" : "Unavailable"}
            </p>
          </div>

          {!isInCart ? (
            <div className="mt-4 flex items-center gap-2">
              <button
                className={`flex-1 py-2 rounded-lg mb-2 ${product?.status
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-800 cursor-not-allowed"
                  }`}
                disabled={!product?.status}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          ) : (
            <Link to="/cart">
              <div className="mt-4 flex items-center gap-2">
                <button
                  className={`flex-1 py-2 rounded-lg mb-2 ${product?.status
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-800 cursor-not-allowed"
                    }`}
                  disabled={!product?.status}
                >
                  Go to Cart
                </button>
              </div>
            </Link>
          )}

          <button
            className={`w-full ${product?.status ? "bg-blue-600" : "bg-blue-400 cursor-not-allowed"
              }  text-white py-2 rounded-lg`}
            disabled={!product?.status}
          >
            Buy It Now
          </button>
          <div className="mt-4">
            <p>
              <span className="font-semibold">About : </span>
              {product?.description}
            </p>
          </div>
          {/* <div className="mt-4"></div> */}
          <h1 className="font-bold text-gray-600 text-xl">Brand Detials</h1>
          <div className="flex items-center gap-10 mt-4">
            <img
              src={product?.brand?.logo}
              alt=""
              className="w-28 h-28 object-cover"
            />
            <div className="flex flex-col items-start">
              <h2 className="font-semibold text-xl">
                By{product?.brand?.brandName}
              </h2>
              <p className="text-gray-700">{product?.brand?.brandTitle}</p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="font-bold text-xl">About the Delivery</h2>
            <p className="text-sm mt-2">Shadow Navy / Army Green</p>
            <p className="text-sm mt-2">
              This product is excluded from all promotional discounts and
              offers.
            </p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>
                For fast delivery and shipment go with net banking or UPI.
              </li>
              <li>
                Join footFlex-club to get unlimited free standard shipping,
                returns, & exchanges.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10">
        {/* <RelatedProducts /> */}
      </div>
    </div>
  );
};

export default ProductDetails;
