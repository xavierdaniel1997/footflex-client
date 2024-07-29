
import React, {useState, useRef, useEffect, useCallback} from "react";
import {FaImage, FaTimes} from "react-icons/fa";
import {FaCropSimple} from "react-icons/fa6";
import ImageCropper from "../ImageCropper";

const ImageUploadSection = ({onImageData, editingImage}) => {
  // const [thumbnail, setThumbnail] = useState(null);
  // const [galleryImages, setGalleryImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(editingImage?.thumbnail || null);
const [galleryImages, setGalleryImages] = useState(editingImage?.galleryImages || []);
  const [imageError, setImageError] = useState("");
  const [galleryError, setGalleryError] = useState("");
  const thumbnailInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const [isCropping, setIsCropping] = useState(false);
  const [cropImage, setCropImage] = useState(null);
  const [cropImageIndex, setCropImageIndex] = useState(null);

  const validImageType = ["image/png", "image/jpeg"];

  console.log("this is form the image upload editingImage", editingImage)

  useEffect(()=> {
    if(editingImage){
      setThumbnail(editingImage?.thumbnail)
      setGalleryImages(editingImage?.galleryImages)
    }
  }, [editingImage])

  const handleThumbnailUpload = (file) => {
    if (file && validImageType.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = (e) => setThumbnail(e.target.result);
      reader.readAsDataURL(file);
      setImageError("");
    } else {
      setImageError("Upload a PNG or JPEG file");
    }
  };



  const handleGalleryImageUpload = (files) => {
    const fileArray = Array.from(files);
    let validFiles = [];
    let invalidFiles = 0;

    fileArray.forEach((file) => {
      if (validImageType.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setGalleryImages((prev) => [...prev, e.target.result]);
        };
        reader.readAsDataURL(file);
        validFiles.push(file);
      } else {
        invalidFiles++;
      }
    });

    if (invalidFiles > 0) {
      setGalleryError(
        `${invalidFiles} file is not uploaded , Only PNG or jpeg files`
      );
    } else {
      setGalleryError("");
    }
  };

  const removeThumbnail = () => {
    setThumbnail(null);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
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


    const startCropping = (image, index = null) => {
      setCropImage(image);
      setCropImageIndex(index);
      setIsCropping(true);
    };
  
    // const handleCropComplete = useCallback((croppedAreaPixels) => {
    //   const croppedImage = getCroppedImg(cropImage, croppedAreaPixels);
    //   if (cropImageIndex === null) {
    //     setThumbnail(croppedImage);
    //   } else {
    //     setGalleryImages(prev => 
    //       prev.map((img, index) => index === cropImageIndex ? croppedImage : img)
    //     );
    //   }
    //   setIsCropping(false);
    // }, [cropImage, cropImageIndex]);
  
    // const getCroppedImg = (imageSrc, pixelCrop) => {
    //   const image = new Image();
    //   image.src = imageSrc;
    //   const canvas = document.createElement('canvas');
    //   canvas.width = pixelCrop.width;
    //   canvas.height = pixelCrop.height;
    //   const ctx = canvas.getContext('2d');
  
    //   ctx.drawImage(
    //     image,
    //     pixelCrop.x,
    //     pixelCrop.y,
    //     pixelCrop.width,
    //     pixelCrop.height,
    //     0,
    //     0,
    //     pixelCrop.width,
    //     pixelCrop.height
    //   );
  
    //   return canvas.toDataURL('image/jpeg');
    // };
  
  useEffect(() => {
    onImageData({thumbnail, galleryImages});
  }, [thumbnail, galleryImages]);

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Product Gallery</h2>

      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">
          Main Thumbnail <span className="text-red-600">{imageError}</span>
        </h3>
        {thumbnail ? (
          <div className="relative">
            <img
              src={thumbnail}
              alt="Product thumbnail"
              className="w-full object-cover rounded-lg"
            />
            <button
              onClick={removeThumbnail}
              className="absolute top-2 right-10 bg-red-500 text-white rounded-full p-1"
            >
              <FaTimes />
            </button>
            <button
              className="absolute top-2 right-2 rounded-full p-1"
              onClick={() => startCropping(thumbnail)}
            >
              <FaCropSimple />
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


      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">
          Gallery Images <span className="text-red-600">{galleryError}</span>
        </h3>
        <div className="space-y-2">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2"
            >
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-28 h-20 object-contain rounded"
              />
              <span className="flex-grow truncate">
                Product-thumbnail-{index + 1}.png
              </span>
              <button
                onClick={() => removeGalleryImage(index)}
                className="text-red-500"
              >
                <FaTimes />
              </button>
              <button
                className="font-normal"
                onClick={() => startCropping(image, index)}
              >
                <FaCropSimple />
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
              onChange={(e) =>
                handleGalleryImageUpload(Array.from(e.target.files))
              }
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
      {isCropping && (
        <ImageCropper
          image={cropImage}
          onCancel={() => setIsCropping(false)}
        />
      )}
    </div>
  );
};

export default ImageUploadSection;




















