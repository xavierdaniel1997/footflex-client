import React from 'react';

const BlockModal = ({ open, onClose, onConfirm, message, buttonName }) => {
  if (!open) return null;
  console.log("bbbb", buttonName)
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className={`bg-white p-6 rounded-md shadow-lg w-1/3 border-t-4 ${buttonName==="Block" ? "border-red-600" : "border-green-600"} `}>
        <h2 className="text-lg font-semibold mb-6 text-center">{message}</h2>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-black text-white px-4 py-2 rounded-sm"
            onClick={onClose}
          > 
            Cancel
          </button>
          <button
            className={`${buttonName==="Block" ? "bg-red-500" : "bg-green-600"} text-white px-4 py-2 rounded-sm`}
            onClick={onConfirm}
          >
            {buttonName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockModal;
