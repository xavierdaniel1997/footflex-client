import React, { useEffect, useState } from 'react';
import ImageGallery from '../../components/user/ImageGallery';
import { useParams } from 'react-router-dom';
import api from '../../config/axiosConfig';
import { FaRegHeart } from "react-icons/fa";


const ProductDetails = () => {
  const [product, setProduct] = useState(null)
  const {id} = useParams()

  const fetchProdctDetial = async () => {
    try{
      const response = await api.get(`/product/product-detial/${id}`)
      setProduct(response?.data?.productDetial)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProdctDetial()
  }, [])

  console.log("this is frm the product detials page", product)
  return (
    <div className='flex flex-col md:flex-row justify-between gap-10'>
      <div className='md:w-2/3'>
        <ImageGallery galleryImg={product?.gallery}/>
      </div>
      

      {/* product details */}
      <div className="md:w-1/3 mt-4 md:mt-0">
        <div className="flex justify-between items-center">
          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">{product?.gender}</span>
        </div>
        <h1 className="text-2xl font-bold mt-2">{product?.productName}</h1>
        <p className="text-blue-500 text-2xl mt-2 font-semibold">₹ {product?.salePrice}</p>
        
        <div className="mt-4">
          <p className="font-semibold">Review and Rating</p>
          <div className="flex space-x-2 mt-2">
            star rating and reviews
          </div>
        </div>
        
        <div className="mt-4">
          <p className="font-semibold">Size</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {product?.sizes?.map(size => (
               <div key={size._id} className="text-center">
              <button key={size} className="px-4 py-2 border rounded-lg focus:outline-none" disabled={size.stock===0}>
                {size?.size}
              </button>
               <p className={`text-sm mt-1 ${size.stock===0 || size.stock===1 ? "text-red-500" : "text-green-700"}`}>{size.stock > 0 ? `${size.stock} left` : 'Out of stock'}</p>
               </div>
            ))}
          </div>
          {/* <a href="#" className="text-blue-500 mt-2 block">Size Chart</a> */}
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          <button className="flex-1 bg-black text-white py-2 rounded-lg mb-2">Add to Cart</button>
          <button className="bg-black p-2 rounded-lg mb-2">
            <FaRegHeart size={22} className='text-white'/>
          </button>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Buy It Now</button>
        
        <div className="mt-4">
          <h2 className="font-bold">About the Product</h2>
          <p className="text-sm mt-2">Shadow Navy / Army Green</p>
          <p className="text-sm mt-2">This product is excluded from all promotional discounts and offers.</p>
          <ul className="list-disc list-inside mt-2 text-sm">
            <li>Pay over time in interest-free installments with Affirm, Klarna or Afterpay.</li>
            <li>Join adiClub to get unlimited free standard shipping, returns, & exchanges.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;
