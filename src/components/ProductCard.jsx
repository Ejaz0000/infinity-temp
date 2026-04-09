'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ImageComponent from './shared/ImageComponent';
import { Plus } from 'lucide-react';

/**
 * ProductCard Component
 * Displays a single product card with image, title, and price
 * The entire card is a clickable link to the product details page
 */
const ProductCard = ({ product }) => {
  if (!product) return null;
  const productDetailsUrl = `/products/${product.slug || product.id}`;

  
  
  // Support both API format (title) and internal format (name)
  const productName = product.title || product.name;
  
  const productPrice = product.price;
  const productSalePrice = product.salePrice || product.sale_price;
  const hasSale = productSalePrice && productSalePrice < productPrice;

  return (
    <Link href={productDetailsUrl}>
      <div 
        className="relative rounded-sm overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group h-full flex flex-col bg-gray-50 p-2 border border-gray-200"
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 right-3 z-10">
            <span className="px-3 py-1 text-xs font-semibold text-white bg-orange-500 rounded-sm">
              {product.badge}
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="relative rounded-sm overflow-hidden aspect-square shrink-0 group-hover:scale-110 transition-transform duration-500 bg-gray-50">
          <ImageComponent
            src={product?.images?.[0] || '/placeholder-image.jpg'}
            alt={productName}
            width={300}
            height={300}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${product?.images?.[1] ? 'group-hover:opacity-0 opacity-100' : ''}`}
          />
          {product?.images?.[1] && (
            <ImageComponent
              src={product.images[1]}
              alt={`${productName} hover`}
              width={300}
              height={300}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="pt-4 md:pt-5 flex flex-col grow">
          {/* Product Title */}
          <h3 className="text-sm font-semibold mb-2 leading-tight text-gray-800 truncate">
            {productName}
          </h3>

          {/* Price */}
          <div className="mt-auto">
            {hasSale ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-lg font-bold text-orange-400">
                  Tk. {parseFloat(productSalePrice).toFixed(2)}
                </span>
                <span className="text-sm line-through text-gray-500">
                  Tk. {parseFloat(productPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-orange-400">
                Tk. {parseFloat(productPrice).toFixed(2)}
              </span>
            )}
          </div>

          <button className='border-2 border-gray-400 mt-4 bg-orange-500 hover:bg-orange-600 rounded-sm py-2 text-white font-semibold'>
            <Plus size={18} className="inline-block mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
