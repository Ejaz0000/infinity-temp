"use client";

import React from "react";
import Link from "next/link";
import ImageComponent from "./shared/ImageComponent";
import { ArrowRight } from "lucide-react";

/**
 * ProductCard Component
 * Displays a single product card with image, title, and price
 * The entire card is a clickable link to the product details page
 */
const FeaturedProductCard = ({ product }) => {
  if (!product) return null;

  const productDetailsUrl = `/products/${product.slug || product.id}`;

  // Support both API format (title) and internal format (name)
  const productName = product.title || product.name;
  const productImage = product.image || product.primary_image;
  const productPrice = product.price;
  const productSalePrice = product.salePrice || product.sale_price;
  const hasSale = productSalePrice && productSalePrice < productPrice;

  return (
    <Link href={productDetailsUrl}>
      <div className="relative rounded-sm overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group h-full flex flex-col bg-orange-50">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 right-0 z-10">
            <span className="pl-2 pr-3 py-1 text-xs font-normal text-gray-200 bg-(--accent-main) rounded-l-full">
              on {product.badge}
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="relative overflow-hidden rounded-sm shadow-md h-[450px] shrink-0 group-hover:scale-110 transition-transform duration-300">
          <ImageComponent
            src={productImage}
            alt={productName}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="absolute bg-[linear-gradient(to_top,_rgba(0,0,0,0.8),_transparent)] bottom-0 left-0 right-0 px-3 pb-3 md:px-6 md:pb-6 pt-[200px] flex flex-col grow">
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 -translate-x-2.5 group-hover:translate-x-0 transition-all duration-300 mb-4">
            Check now
            <ArrowRight size={24} />
          </div>

          {/* Product Title */}
          <h3 className="text-base font-semibold mb-2 leading-tight min-h-4 text-white truncate">
            {productName}
          </h3>

          {/* Price */}
          <div className="mt-auto">
            {hasSale ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-lg font-bold text-gray-400">
                  Tk. {parseFloat(productSalePrice).toFixed(2)}
                </span>
                <span className="text-sm line-through text-gray-400">
                  Tk. {parseFloat(productPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-400">
                Tk. {parseFloat(productPrice).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedProductCard;
