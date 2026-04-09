'use client';

import AccountSidebar from '@/components/account/AccountSidebar';
import ChangePasswordSection from '@/components/account/ChangePasswordSection';

export default function ChangePasswordPage() {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        <ChangePasswordSection />
      </div>
    </div>
  );
}
