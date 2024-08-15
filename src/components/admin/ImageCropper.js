import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ImageCropper = ({ onCancel, image, onCropComplete }) => {
  const [cropper, setCropper] = useState(null);

  const handleCropComplete = () => {
    if (cropper) {
      const croppedImageUrl = cropper.getCroppedCanvas().toDataURL();
      onCropComplete(croppedImageUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg w-full max-w-4xl h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Manage Image</h2>
          <button className="text-gray-700 cursor-pointer" onClick={onCancel}>
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <div className="relative h-[65vh] mb-6">
          <Cropper
            src={image}
            style={{ height: '100%', width: '100%' }}
            aspectRatio={1}
            guides={true}
            onInitialized={(instance) => setCropper(instance)}
          />
        </div>
        <div className="text-center m-2">
          <button 
            className="py-2 px-4 rounded-md bg-black text-white font-medium"
            onClick={handleCropComplete}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;