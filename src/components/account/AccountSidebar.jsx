'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Lock, MapPin, ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { id: 'profile', label: 'Profile', icon: User, href: '/my-account' },
  { id: 'password', label: 'Change Password', icon: Lock, href: '/my-account/change-password' },
  { id: 'address', label: 'Address', icon: MapPin, href: '/my-account/address' },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, href: '/my-account/orders' },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {isOpen ? (
            <>
              <X className="w-5 h-5" />
              Close Menu
            </>
          ) : (
            <>
              <Menu className="w-5 h-5" />
              Menu
            </>
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`md:block md:w-64 md:sticky md:top-24 md:max-h-screen overflow-y-auto transition-all duration-300 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">My Account</h2>
          </div>

          {/* Navigation Items */}
          <nav className="divide-y divide-gray-200">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors ${
                    isActive
                      ? 'bg-gray-100 text-gray-900 border-l-4'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={isActive ? { borderColor: 'var(--accent-main)' } : {}}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
