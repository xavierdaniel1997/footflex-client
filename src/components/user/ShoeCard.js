import { useNavigate } from "react-router-dom";
import shoesImg from "../../assets/images/jordanAir.png";
import { AiOutlineHeart } from "react-icons/ai";

const ShoeCard = ({productData}) => {
  

  const navigate = useNavigate()
  // Example rating
  const rating = 4.5;

  const handleProductDetials = () => {
    navigate(`/productDetials/${productData?._id}`)
  }
  return (
    <div className="max-sm:mt-5" onClick={handleProductDetials}>
      <div className={`lg:w-auto p-8 bg-slate-100 rounded-xl md:w-60 max-sm:w-44`}>
        <div className="flex justify-end">
          <button className="bg-white p-2 text-xl rounded-full">
            <AiOutlineHeart />
          </button>
        </div>
        <div className="flex justify-center items-center h-32 md:h-40 lg:h-48">
          <img
            src={productData?.thumbnail}
            alt="Shoe"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="p-2 flex items-center justify-between">
        <div>
          <h1 className="text-gray-600 font-semibold">{productData?.productName}</h1>
          <p className="text-gray-600">₹ {productData?.salePrice}</p>
        </div>
        <div className="text-gray-600 font-medium">
          {/* Displaying the rating */}
          {rating.toFixed(1)}
        </div>
      </div>
    </div>
  );
};

export default ShoeCard;
