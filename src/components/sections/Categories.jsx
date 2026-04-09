'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ImageComponent from '../shared/ImageComponent';

/**
 * Categories Component
 * 
 * Displays product categories in a responsive grid:
 * - Desktop: 4 columns
 * - Tablet: 2 columns
 * - Mobile: 2 columns
 * 
 * Features:
 * - Category cards with images
 * - Hover effects with overlay and CTA
 * - Responsive grid layout
 * 
 * Props:
 * - categories: Array of category objects from API
 */

const Categories = ({ categories = [] }) => {
  const title = 'Top Categories';
  
  // Transform API categories data to items format
  const items = categories.map(category => ({
    name: category.name,
    image: category.image_url,
    href: `/products?category=${category.slug}`,
    productCount: category.product_count
  }));

  const remainder = items.length % 4;

  return (
    <section className="w-full bg-gray-100 py-16 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12 flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-0">{title}</h2>
          <Link href="/products" className="flex items-center gap-2 text-gray-600 font-medium hover:text-orange-500 transition-colors">
            View All
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-4">
          
          {items.map((item, idx) => {
            const isLastRow =
              remainder !== 0 && idx >= items.length - remainder;

          let spanClass = "col-span-12 md:col-span-3";

            if (isLastRow) {
              if (remainder === 1) spanClass = "col-span-12";
              if (remainder === 2) spanClass = "col-span-12 md:col-span-6";
              if (remainder === 3) spanClass = "col-span-12 md:col-span-4";
            }
            return (
            <Link key={idx} href={item.href} className={`group cursor-pointer ${spanClass}`}>
              <div
                className="relative overflow-hidden rounded-sm min-h-[250px] shadow-md hover:shadow-xl transition-all bg-gray-300"
                
              >
                {/* Background Image */}
                <ImageComponent
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={250}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.3)_0%,_rgba(0,0,0,0.5)_100%)] group-hover:bg-black/50 transition-colors duration-300"
                />

                {/* Content */}
                <div
                  className="absolute inset-0 p-6 text-white flex flex-col justify-center items-center z-2"
                >
                  <div className='py-2 px-3 text-center text-white font-semibold text-lg md:text-xl'>
                    {item.name}

                    <div className="w-full h-0.5 mx-auto rounded-full bg-white" />
                  </div>

                  {/* Arrow Icon */}
                  <div
                    className="flex items-center gap-2 opacity-0 group-hover:opacity-100 -translate-x-2.5 group-hover:translate-x-0 transition-all duration-300"
                  > 
                    Check now
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
            </Link>
          )})}
        </div>
      </div>
    </section>
  );
};

export default Categories;
