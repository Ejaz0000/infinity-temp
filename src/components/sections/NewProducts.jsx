'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../ProductCard';
import Link from 'next/link';

/**
 * NewProducts Component
 * Displays new arrival products in a responsive carousel using the ProductCard component
 * 
 * Props:
 * - newSection: New products section object from API
 */

const NewProducts = ({ newSection }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  if (!newSection) return null;

  const title = 'New Arrivals';
  const subtitle = newSection.subtitle || '';
  
  // Transform API products data
  const products = (newSection.products || []).map(product => ({
    id: product.id,
    name: product.title,
    slug: product.slug,
    price: parseFloat(product.price),
    salePrice: product.sale_price ? parseFloat(product.sale_price) : null,
    images: product.images || [],
    rating: 4.5,
    reviews: 0,
    badge: product.is_on_sale ? 'Sale' : null
  }));

  // Update items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  if (products.length === 0) return null;

  return (
    <section className="w-full bg-gray-50 py-16 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-0">{title}</h2>
          <Link href="/products" className="flex items-center gap-2 text-gray-600 font-medium hover:text-orange-500 transition-colors">
            View All
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id || product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProducts;
