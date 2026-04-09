'use client';

import AccountSidebar from '@/components/account/AccountSidebar';
import AddressSection from '@/components/account/AddressSection';

export default function AddressPage() {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        <AddressSection />
      </div>
    </div>
  );
}
