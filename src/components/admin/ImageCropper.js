

import React, {useCallback, useState} from "react";
import Cropper from "react-easy-crop";
import {FaTimes, FaUndo, FaCrop} from "react-icons/fa";

const ImageCropper = ({onCancel, image, onCropComplete}) => {
  const [crop, setCrop] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);



// const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
//     onCropComplete(croppedAreaPixels);
//   }, [onCropComplete]);



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg w-full max-w-4xl h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Manage Image</h2>
          <button className="text-gray-700 cursor-pointer" onClick={onCancel}>
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Cropping Area */}
        <div className="relative h-[65vh] mb-6">
         
           <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onZoomChange={setZoom}
          />
          {/* <img src={image} alt="" /> */}
        </div>
        <div className="text-center m-2">
          <button className="py-2 px-4 rounded-md bg-black text-white font-medium"
        //    onClick={() => onCropComplete(crop)}
            >Save</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
