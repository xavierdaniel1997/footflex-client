import React from 'react';

const ImageGallery = ({galleryImg}) => {
    console.log("this is from galler", galleryImg)
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
        {galleryImg?.map((image, index) => (
            <div key={index} className="bg-gray-200 p-2 h-64 md:h-80 lg:h-96">
            <img src={image} alt="" className="w-full h-full object-contain" />
          </div>
        ))}
       
    </div>
  );
};

export default ImageGallery;
