'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="p-6 rounded-full mb-6" style={{ backgroundColor: 'rgba(29, 35, 48, 0.1)' }}>
        <ShoppingCart className="w-16 h-16" style={{ color: 'var(--accent-main)' }} />
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Looks like you haven't added anything to your cart yet. <br />
        Start shopping to find amazing products!
      </p>

      <Link
        href="/products"
        className="px-8 py-3 text-white font-semibold rounded-lg transition-colors duration-200 hover:opacity-90"
        style={{ backgroundColor: 'var(--accent-main)' }}
      >
        Continue Shopping
      </Link>
    </div>
  );
}
