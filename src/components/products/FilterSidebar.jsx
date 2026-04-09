'use client';

import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  isOpen, 
  onClose,
  brands = []
}) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brand: true,
  });

  

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (type, value) => {
    onFilterChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: parseFloat(value) || 0,
      },
    });
  };

 

  const handleBrandChange = (brandSlug) => {
    const updatedBrands = filters.selectedBrands.includes(brandSlug)
      ? filters.selectedBrands.filter((b) => b !== brandSlug)
      : [...filters.selectedBrands, brandSlug];

    onFilterChange({
      ...filters,
      selectedBrands: updatedBrands,
    });
  };

  const handleResetFilters = () => {
    onFilterChange({
      priceRange: { min: 0, max: 25000 },
      selectedBrands: [],
    });
    // optionally onClose()
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-[rgba(0,0,0,0.25)]">
      <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 shrink-0 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 flex flex-col flex-1 overflow-y-auto">
          {/* Reset Button */}
          <button
            onClick={handleResetFilters}
            className="w-full mb-6 py-2 px-4 border border-gray-300 bg-white rounded-lg font-semibold transition-colors hover:bg-gray-100 text-gray-700"
          >
            Reset Filters
          </button>

          {/* Price Filter */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full mb-4 focus:outline-none"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Price Range
              </h3>
              <ChevronDown
                size={20}
                className="text-gray-500"
                style={{
                  transform: expandedSections.price ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 300ms',
                }}
              />
            </button>

            {expandedSections.price && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Price
                  </label>
                  <input
                    type="number"
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ '--tw-ring-color': 'var(--accent-main)' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Price
                  </label>
                  <input
                    type="number"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ '--tw-ring-color': 'var(--accent-main)' }}
                  />
                </div>
              </div>
            )}
          </div>

          

          {/* Brand Filter */}
          <div className="mb-2">
            <button
              onClick={() => toggleSection('brand')}
              className="flex items-center justify-between w-full mb-4 focus:outline-none"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Brand
              </h3>
              <ChevronDown
                size={20}
                className="text-gray-500"
                style={{
                  transform: expandedSections.brand ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 300ms',
                }}
              />
            </button>

            {expandedSections.brand && (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {brands.map((brand) => (
                  <label key={brand.slug} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.selectedBrands.includes(brand.slug)}
                      onChange={() => handleBrandChange(brand.slug)}
                      className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      style={{ accentColor: 'var(--accent-main)' }}
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      {brand.name}
                      <span className="text-xs ml-1 text-gray-500">
                        ({brand.product_count})
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Footer actions */}
        <div className="p-6 border-t border-gray-200 shrink-0 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
