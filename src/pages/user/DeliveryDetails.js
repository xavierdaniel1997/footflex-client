import React from 'react'
import CartCheckout from '../../components/user/CartCheckout'
import AddressCard from '../../components/user/AddressCard'
import { FaPlus } from 'react-icons/fa'

const DeliveryDetails = () => {
  return (
    <div className="py-12 md:p-8 lg:px-36">
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <div className="">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Select Delivery Address</h2>
            <button className="px-2 py-2 rounded text-xs font-semibold border border-black">
              ADD NEW ADDRESS
            </button>
          </div>
          <AddressCard
            name="Daniel"
            address="PS Kavala Ezhupunna South Cherthala Road house no 282, Ezhupunna South ED Aroor, Kerala - 688537"
            mobile="9605718774"
          />
        </div>
      </div>
      <div className="lg:w-1/3 ">
        <CartCheckout buttonName={"NEXT"}/>
      </div>
    </div>
  </div>
  )
}
  
export default DeliveryDetails