import React from 'react';

const ConfirmationModal = ({ open, onClose, onConfirm, message }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/3 border-t-4 border-red-600">
        <h2 className="text-lg font-semibold mb-6 text-center">{message}</h2>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-black text-white px-4 py-2 rounded-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-sm"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
