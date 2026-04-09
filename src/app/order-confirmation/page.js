import { Suspense } from 'react';
import OrderConfirmationContent from '@/components/order-confirmation/OrderConfirmationContent';

function OrderConfirmationFallback() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex items-center justify-center h-64">
          <p style={{ color: 'var(--neutral-gray700)' }}>Loading order details...</p>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<OrderConfirmationFallback />}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
