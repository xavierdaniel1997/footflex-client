import React, { useState } from 'react';
import { MdArrowForward, MdLocalOffer } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const CartCheckout = ({cartCount, totalPrice, navigateTo, buttonName}) => {
    const [showPrmoInput, setShowPrmoInput] = useState(false)


  return (
    <div className="bg-white max-w-md mx-auto">
      <div className="flex justify-between items-center bg-black text-white p-3 mb-6 cursor-pointer" onClick={navigateTo}>
        <h1 className="text-xl font-bold">{buttonName}</h1>
        <MdArrowForward className="text-2xl" />
      </div>
      
      <h2 className="text-2xl font-bold mb-4">ORDER SUMMARY</h2>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="">{cartCount} items</span>
          <span>₹ {totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="text-green-600">Free</span>
        </div>
      </div>
      
      <div className="flex justify-between font-bold mb-1">
        <span>Total</span>
        <span>₹ {totalPrice}</span>
      </div>
      <p className="text-gray-500 text-sm mb-6">(Inclusive of all taxes)</p>
      
      <button className="flex items-center text-blue-600 font-bold mb-4" onClick={() => setShowPrmoInput(!showPrmoInput)}>
        <MdLocalOffer className="mr-2" />
        USE A PROMO CODE
      </button>

      {showPrmoInput && <div className='w-full'>
        <input type="text" placeholder='Enter prom code' className='px-2 py-3 w-full border bo outline-none mb-2'/>
      </div>}
      
      <p className="font-bold">ACCEPTED PAYMENT METHODS</p>
    </div>
  );
};

export default CartCheckout;