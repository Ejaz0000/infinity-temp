'use client';

import React, { useEffect, useState } from 'react';
import ImageComponent from '../shared/ImageComponent';

const ImageGallery = ({ images = [], title = 'Product', currentVariantId }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  console.log('ImageGallery props', { images, title, currentVariantId });

  useEffect(() => {
    const selectedIndex = images.findIndex(img => img.color === currentVariantId);
    if (selectedIndex !== -1) {
      setSelectedImageIndex(selectedIndex);
    } else {
      setSelectedImageIndex(0);
    }
  }, [currentVariantId]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full bg-gray-200 aspect-square rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="w-full bg-gray-100 rounded-lg overflow-hidden aspect-square">
        <ImageComponent
          src={images[selectedImageIndex]?.image}
          alt={`${title} - Image ${selectedImageIndex + 1}`}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImageIndex === idx
                  ? 'border-gray-900'
                  : 'border-gray-300 hover:border-gray-500'
              }`}
            >
              <ImageComponent
                src={image.image}
                alt={image.alt_text}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
