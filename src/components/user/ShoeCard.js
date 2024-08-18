import {useNavigate} from "react-router-dom";
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addItemToWishList, fetchWishList, removeItemFromWishList } from "../../redux/wishListSlice";
import { useEffect, useState } from "react";


const ShoeCard = ({productData, inUserProfile}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishList.items);
  const [isWishListed, setIsWishListed] = useState(false);


  // Example rating
  const rating = 4.5;
 
  const handleProductDetials = () => {
    navigate(`/productDetials/${productData?._id}`);
  };


  useEffect(() => {
    setIsWishListed(wishlistItems.some(item => item._id === productData._id));
  }, []);

  const toggleWishList = () => {
    if (isWishListed) {
      dispatch(removeItemFromWishList(productData._id));
    } else {
      dispatch(addItemToWishList(productData._id));
    }
    setIsWishListed(!isWishListed)
  };


  return (
    <div className="max-sm:mt-5">
      <div
        className={`${inUserProfile? "bg-gray-100 p-3 rounded-md" : "lg:w-auto p-8 bg-gray-100 rounded-md md:w-60 max-sm:w-44 "}`}
      >
        <div className="flex justify-end">
          <button className="bg-white p-2 text-xl rounded-full"
          onClick={toggleWishList} 
          >
            {isWishListed ? <AiFillHeart color="red"/> : <AiOutlineHeart />}
          </button>
        </div>
        <div
          className="flex justify-center items-center h-32 md:h-40 lg:h-48"
          onClick={handleProductDetials}
        >
          <img
            src={productData?.thumbnail}
            alt="Shoe"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="p-2 flex items-center justify-between">
        <div>
          <h1 className="text-gray-600 font-semibold">
            {inUserProfile ? productData?.productName.split(" ").slice(0, 2).join(" ") :  productData?.productName}
          </h1>
          <p className="text-green-600 font-semibold">₹ {productData?.salePrice}</p>
        </div>
        <div className="text-gray-600 font-medium">
          {/* Displaying the rating */}
          {rating}
        </div>
      </div>
    </div>
  );
};

export default ShoeCard;
