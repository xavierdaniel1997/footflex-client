import React from 'react';

const AddressCard = ({ name, address, mobile }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border mb-4">
      <div className="flex items-center mb-2 gap-2">
        <input type="radio" className='w-4 h-4'/>
        <span className="font-semibold">{name}</span>
        <span className="ml-2 text-xs font-semibold text-teal-800 bg-teal-200 py-1 px-2 rounded">
          HOME
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{address}</p>
      <p className="text-sm text-gray-600 mb-2">Mobile: {mobile}</p>
      <p className="text-sm text-gray-600 mb-4">• Cash on Delivery available</p>
      <div className="flex space-x-2">
        <button className="px-3 py-1 border border-black rounded text-sm hover:bg-gray-100">
          REMOVE
        </button>
        <button className="px-3 py-1 border border-black rounded text-sm hover:bg-gray-100">
          EDIT
        </button>
      </div>
    </div>
  );
};

export default AddressCard;