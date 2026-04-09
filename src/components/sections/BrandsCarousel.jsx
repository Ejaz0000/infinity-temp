'use client';

import React from 'react';
import Link from 'next/link';
import ImageComponent from '../shared/ImageComponent';
import { ArrowRight } from 'lucide-react';

/**
 * Brands Component
 * Displays brand logos in a simple responsive grid
 * 
 * Props:
 * - brands: Array of brand objects from API
 */

const BrandsCarousel = ({ brands: brandsArray = [] }) => {
  if (!brandsArray || brandsArray.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-0">Brands</h2>
          <Link href="/products" className="flex items-center gap-2 text-gray-600 font-medium hover:text-orange-500 transition-colors">
            View All
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {brandsArray.map((brand, idx) => (
            <Link
              key={idx}
              href={`/products?brand=${brand.slug}`}
              className="flex items-center justify-center bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 no-underline h-32 md:h-40 cursor-pointer"
            >
              {brand.logo_url ? (
                <ImageComponent
                  src={brand.logo_url}
                  alt={brand.name}
                  width={150}
                  height={100}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-lg font-bold text-gray-700 text-center">
                  {brand.name}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsCarousel;
