'use client';

import React from 'react';
import ProductCard from '../ProductCard';
import FeaturedProductCard from '../FeaturedProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * FeaturedProducts Component
 * Displays featured products in a responsive grid using the ProductCard component
 * 
 * Props:
 * - featuredSection: Featured section object from API
 */

const FeaturedProducts = ({ featuredSection }) => {
  if (!featuredSection) return null;

  const title = 'Featured Products';
  const subtitle = featuredSection.subtitle || '';
  
  // Transform API products data
  const products = (featuredSection.products || []).map(product => ({
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

  return (
    <section className="w-full bg-white py-16 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12 flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-0">{title}</h2>
          <Link href="/products" className="flex items-center gap-2 text-gray-600 font-medium hover:text-orange-500 transition-colors">
            View All
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <ProductCard key={product.id || idx} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
