'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { toast } from 'react-toastify';
import ImageGallery from './ImageGallery';
import VariantSelector from './VariantSelector';
import RelatedProductsCarousel from './RelatedProductsCarousel';
import { addToCart, fetchCart } from '@/redux/slices/cartSlice';

const ProductDetailsPage = ({ productData }) => {
  const dispatch = useDispatch();
  const cartLoading = useSelector((state) => state.cart.loading);
  
  // Check if product has variants
  const hasVariants = productData.variants && productData.variants.length > 0;
  
  // Find the first available variant or fallback to first variant
  const getInitialVariant = () => {
    if (!hasVariants) return null;
    const availableVariant = productData.variants?.find(v => v.is_in_stock);
    return availableVariant || productData.variants?.[0] || null;
  };

  const initialVariant = getInitialVariant();
  
  // Initialize selected attributes based on initial variant
  const getInitialAttributes = () => {
    if (!initialVariant) return {};
    const attrs = {};
    initialVariant.attributes.forEach(attr => {
      attrs[attr.type] = attr.value;
    });
    return attrs;
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState(getInitialAttributes());
  
  const [addedToCart, setAddedToCart] = useState(false);

  // Find matching variant based on selected attributes
  const currentVariant = useMemo(() => {
    if (!hasVariants) return null;
    
    return productData.variants.find(variant => {
      return variant.attributes.every(attr => 
        selectedAttributes[attr.type] === attr.value
      );
    });
  }, [selectedAttributes, productData.variants, hasVariants]);

  console.log('currentVariant', currentVariant);

  // Get current price and stock based on selected variant or base product
  const currentPrice = currentVariant 
    ? (currentVariant.sale_price || currentVariant.price)
    : (productData.sale_price || productData.price);
  
  const originalPrice = currentVariant 
    ? currentVariant.price 
    : productData.price;
  
  const currentStock = currentVariant 
    ? currentVariant.stock 
    : productData.stock;
  
  const isInStock = currentVariant 
    ? currentVariant.is_in_stock 
    : productData.stock > 0;

  const isOnSale = currentVariant 
    ? currentVariant.is_on_sale 
    : productData.is_on_sale;
  
  const discountPercentage = currentVariant 
    ? currentVariant.discount_percentage 
    : productData.discount_percentage;

  const handleAttributeChange = (attributeType, value) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeType]: value
    }));
  };

  const handleAddToCart = async () => {
    // For products with variants, ensure a valid variant is selected
    if (hasVariants && !currentVariant) {
      toast.error('Please select a valid variant combination');
      return;
    }
    
    try {
      let payload = { quantity };

      if (hasVariants) {
        // Product has variants - use variant_id
        const variantId = currentVariant?.id;
        if (!variantId) {
          toast.error('Product variant not available');
          return;
        }
        payload.variant_id = variantId;
      } else {
        // Product has no variants - use product_id
        if (!productData.id) {
          toast.error('Product not available');
          return;
        }
        payload.product_id = productData.id;
      }

      const result = await dispatch(addToCart(payload)).unwrap();

      if (result.status) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
        toast.success(result.message || 'Item added to cart successfully!');
        
        // Refresh cart data
        dispatch(fetchCart());
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      
      if (error?.data?.errors) {
        const errors = error.data.errors;
        
        // Show field-specific errors
        if (errors.variant_id) {
          toast.error(errors.variant_id[0]);
        } else if (errors.product_id) {
          toast.error(errors.product_id[0]);
        } else if (errors.variant_required) {
          toast.error(errors.variant_required[0]);
        } else if (errors.quantity) {
          toast.error(errors.quantity[0]);
        } else if (errors.stock) {
          toast.error(errors.stock[0]);
        } else if (errors.error) {
          toast.error(errors.error[0]);
        } else {
          toast.error(error.message || 'Failed to add item to cart');
        }
      } else {
        toast.error(error.message || 'Failed to add item to cart');
      }
    }
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(currentStock, value));
    setQuantity(newQuantity);
  };

  const handleBuyNow = async () => {
    // For products with variants, ensure a valid variant is selected
    if (hasVariants && !currentVariant) {
      toast.error('Please select a valid variant combination');
      return;
    }
    
    try {
      let payload = { quantity };

      if (hasVariants) {
        // Product has variants - use variant_id
        const variantId = currentVariant?.id;
        if (!variantId) {
          toast.error('Product variant not available');
          return;
        }
        payload.variant_id = variantId;
      } else {
        // Product has no variants - use product_id
        if (!productData.id) {
          toast.error('Product not available');
          return;
        }
        payload.product_id = productData.id;
      }

      const result = await dispatch(addToCart(payload)).unwrap();

      if (result.status) {
        toast.success('Redirecting to checkout...');
        
        // Redirect to checkout page
        setTimeout(() => {
          window.location.href = '/checkout';
        }, 500);
      }
    } catch (error) {
      console.error('Buy now error:', error);
      
      if (error?.data?.errors) {
        const errors = error.data.errors;
        
        // Show field-specific errors
        if (errors.variant_id) {
          toast.error(errors.variant_id[0]);
        } else if (errors.product_id) {
          toast.error(errors.product_id[0]);
        } else if (errors.variant_required) {
          toast.error(errors.variant_required[0]);
        } else if (errors.quantity) {
          toast.error(errors.quantity[0]);
        } else if (errors.stock) {
          toast.error(errors.stock[0]);
        } else if (errors.error) {
          toast.error(errors.error[0]);
        } else {
          toast.error(error.message || 'Failed to process your request');
        }
      } else {
        toast.error(error.message || 'Failed to process your request');
      }
    }
  };

  // Prepare images for gallery (ImageGallery expects array of URLs)
  const galleryImages = productData.images || [];

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-800">
          <a href="/products" className="hover:opacity-75">
            Products
          </a>
          <span>/</span>
          <a href={`/products?category=${productData.category?.slug}`} className="hover:opacity-75">
            {productData.category?.name}
          </a>
          <span>/</span>
          <span className='text-gray-800'>{productData.title}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6">
          {/* Left Column - Images */}
          <div>
            <ImageGallery images={galleryImages} title={productData.title} currentVariantId={currentVariant?.id} />
          </div>

          {/* Right Column - Product Details */}
          <div>
            {/* Product Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-2 text-gray-800">
                    {productData.brand?.name}
                  </p>
                  <h1 className="text-4xl font-semibold mb-2 text-gray-800">
                    {productData.title}
                  </h1>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <span className="text-3xl font-bold text-gray-800">
                    Tk. {parseFloat(currentPrice).toFixed(0)}
                  </span>
                  {isOnSale && (
                    <span
                      className="ml-2 text-lg line-through"
                      style={{ color: 'var(--neutral-gray700)' }}
                    >
                      Tk. {parseFloat(originalPrice).toFixed(0)}
                    </span>
                  )}
                </div>
                {isOnSale && discountPercentage > 0 && (
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: 'var(--accent-red)', color: 'white' }}
                  >
                    Save {Math.round(discountPercentage)}%
                  </span>
                )}
              </div>

            </div>

            {/* Variant Selection */}
            {productData.available_attributes && productData.available_attributes.length > 0 && (
              <VariantSelector
                availableAttributes={productData.available_attributes}
                variants={productData.variants}
                selectedAttributes={selectedAttributes}
                onAttributeChange={handleAttributeChange}
              />
            )}

            {/* Stock Status / Availability Message */}
            <div className="mb-6 mt-6">
              {hasVariants && !currentVariant ? (
                <div className="p-4 rounded-lg border-2" style={{ borderColor: 'var(--error)', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                  <p className="text-sm font-semibold" style={{ color: 'var(--error)' }}>
                    ⚠ Product not available with current specifications
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--neutral-gray700)' }}>
                    Please try a different combination of options
                  </p>
                </div>
              ) : isInStock ? (
                <p className="text-sm font-semibold" style={{ color: 'var(--success)' }}>
                  ✓ In Stock ({currentStock} available)
                </p>
              ) : (
                <p className="text-sm font-semibold" style={{ color: 'var(--error)' }}>
                  ✗ Out of Stock
                </p>
              )}
            </div>

            {/* SKU Display */}
            {currentVariant && (
              <div className="mb-6 text-sm text-gray-800">
                <span className="font-semibold">SKU:</span> {currentVariant.sku}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-8">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-800 rounded-lg w-fit overflow-hidden text-gray-800">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-4 py-3 font-semibold hover:bg-gray-100 transition-colors"
                  disabled={!isInStock}
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 text-center border-l border-r border-gray-800 py-3 outline-none"
                  disabled={!isInStock}
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-4 py-3 font-semibold hover:bg-gray-100 transition-colors"
                  disabled={!isInStock}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={(hasVariants && !currentVariant) || !isInStock || cartLoading}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: addedToCart ? 'var(--success)' : 'var(--accent-orange)',
                }}
              >
                <ShoppingCart size={20} />
                {cartLoading ? 'Adding...' : hasVariants && !currentVariant ? 'Select Options' : addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              disabled={(hasVariants && !currentVariant) || !isInStock || cartLoading}
              className="w-full py-3 px-6 rounded-lg font-semibold text-gray-800 bg-white border border-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {cartLoading ? 'Processing...' : 'Buy Now'}
            </button>

            
          </div>
        </div>

        {/* Product Details Section */}
        <div className="border-t border-gray-300 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Product Details
              </h2>
              <p className="mb-6 leading-relaxed text-gray-600">
                {productData.description}
              </p>

              {/* Product Specifications */}
              {/* {productData.weight && (
                <>
                  <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--neutral-gray400)' }}>
                    Specifications
                  </h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-3" style={{ color: 'var(--neutral-gray400)' }}>
                      <span className="font-semibold min-w-[100px]">Weight:</span>
                      <span>{productData.weight} kg</span>
                    </li>
                  </ul>
                </>
              )} */}
            </div>

            {/* Product Info */}
            <div>
              <div className=" border border-gray-4\300 rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Category
                  </p>
                  <p className="text-gray-600">
                    {productData.category?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Brand
                  </p>
                  <p className="text-gray-600">
                    {productData.brand?.name}
                  </p>
                </div>
                {currentVariant && (
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      SKU
                    </p>
                    <p className="text-gray-600">
                      {currentVariant.sku}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Availability
                  </p>
                  <p
                    className="text-gray-600"
                    style={{ color: isInStock ? 'var(--success)' : 'var(--error)' }}
                  >
                    {!currentVariant ? 'Select options' : isInStock ? `${currentStock} in stock` : 'Out of stock'}
                  </p>
                </div>
                {productData.variant_count > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Variants Available
                    </p>
                    <p className="text-gray-600">
                      {productData.variant_count} options
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
