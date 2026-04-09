'use client';

import AccountSidebar from '@/components/account/AccountSidebar';
import ProfileSection from '@/components/account/ProfileSection';

export default function MyAccountPage() {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        <ProfileSection />
      </div>
    </div>
  );
}
