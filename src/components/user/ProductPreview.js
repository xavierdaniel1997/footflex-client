const ProductPreview = ({item}) => {
    return (
      <div className="flex items-start space-x-4 p-2">
        <img
          src={item?.productId?.thumbnail}
          alt="Ultraboost 5 Shoes"
          className="w-24 h-24 object-cover bg-gray-100"
        />
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{item?.productId?.brand?.brandName}</h2>
          <p className="text-sm text-gray-600">{item?.productId?.productName.split(" ").slice(0, 4).join(" ")}</p>
          <p className="text-red-600 font-bold">₹ {item?.productId?.salePrice}</p>
          <p className="text-sm text-gray-600">
            Size : {item?.size} / Quantity : {item?.quantity}
          </p> 
        </div>
      </div>
    );
  };
  
  export default ProductPreview;