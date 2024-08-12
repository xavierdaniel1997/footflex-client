import React from 'react';
import Magnifier from 'react-magnifier';

const ImageGallery = ({galleryImg}) => {
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
      {galleryImg?.map((image, index) => (
        <div key={index} className="bg-gray-50  h-64 md:h-80 lg:h-96 flex items-center justify-center">
          <div className="w-full h-full relative object-cover">
            <Magnifier
              src={image}
              width="100%"
              height="100%"
              mgWidth={200}
              mgHeight={200}
              zoomFactor={0.8}
              mgShape="square"
              className="w-full h-full object-cover"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover'}}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;





