'use client';

import AccountSidebar from '@/components/account/AccountSidebar';
import OrdersSection from '@/components/account/OrdersSection';

export default function OrdersPage() {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        <OrdersSection />
      </div>
    </div>
  );
}
