import React, { useState, useRef } from "react";
import { FaImage, FaTimes } from "react-icons/fa";

const ImageUploadSection = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const thumbnailInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleThumbnailUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setThumbnail(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImageUpload = (files) => {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => setGalleryImages(prev => [...prev, e.target.result]);
      reader.readAsDataURL(file);
    });
  };

  const removeThumbnail = () => {
    setThumbnail(null);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleThumbnailDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleThumbnailUpload(file);
  };

  const handleGalleryDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleGalleryImageUpload(files);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Product Gallery</h2>
      
      {/* Main Thumbnail */}
      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">Main Thumbnail</h3>
        {thumbnail ? (
          <div className="relative">
            <img src={thumbnail} alt="Product thumbnail" className="w-full object-cover rounded-lg" />
            <button
              onClick={removeThumbnail}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            >
              <FaTimes />
            </button>
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
            onClick={() => thumbnailInputRef.current.click()}
            onDragOver={handleDragOver}
            onDrop={handleThumbnailDrop}
          >
            <input
              type="file"
              ref={thumbnailInputRef}
              onChange={(e) => handleThumbnailUpload(e.target.files[0])}
              accept="image/*"
              className="hidden"
            />
            <FaImage className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-1 text-sm text-gray-500">
              Drag and drop or click to upload main thumbnail
            </p>
          </div>
        )}
      </div>

      {/* Gallery Images */}
      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">Gallery Images</h3>
        <div className="space-y-2">
          {galleryImages.map((image, index) => (
            <div key={index} className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
              <img src={image} alt={`Product ${index + 1}`} className="w-28 h-20 object-contain rounded" />
              <span className="flex-grow truncate">Product-thumbnail-{index + 1}.png</span>
              <button onClick={() => removeGalleryImage(index)} className="text-red-500">
                <FaTimes />
              </button>
            </div>
          ))}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
            onClick={() => galleryInputRef.current.click()}
            onDragOver={handleDragOver}
            onDrop={handleGalleryDrop}
          >
            <input
              type="file"
              ref={galleryInputRef}
              onChange={(e) => handleGalleryImageUpload(Array.from(e.target.files))}
              accept="image/*"
              multiple
              className="hidden"
            />
            <FaImage className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-1 text-sm text-gray-500">
              Drag and drop or click to add gallery images
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSection;