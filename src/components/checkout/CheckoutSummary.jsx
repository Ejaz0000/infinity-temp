import { HandCoins, Package } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '@/utils/axiosInstance';

export default function CheckoutSummary({ cart }) {
  const [deliveryCharges, setDeliveryCharges] = useState(null);
  const [deliveryLoading, setDeliveryLoading] = useState(true);

  const subtotal = parseFloat(cart?.subtotal || 0);
  const savings = parseFloat(cart?.total_savings || 0);
  // Subtotal already includes discounted prices, so total should be subtotal (or grand_total if available)
  const total = parseFloat(cart?.grand_total || cart?.subtotal || 0);

  useEffect(() => {
    const fetchDeliveryCharges = async () => {
      setDeliveryLoading(true);
      try {
        const response = await axiosInstance.get('/delivery-charges/');
        if (response?.data?.status) {
          setDeliveryCharges(response.data.data?.delivery_charges || null);
        }
      } catch (error) {
        console.error('Failed to fetch delivery charges:', error);
      } finally {
        setDeliveryLoading(false);
      }
    };

    fetchDeliveryCharges();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg h-fit sticky top-4" style={{ border: `1px solid var(--neutral-gray400)` }}>
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-main)' }}>
        Order Summary
      </h3>

      {/* Cart Items */}
      <div className="space-y-3 mb-4 max-h-48 overflow-y-auto border-b" style={{ borderColor: 'var(--neutral-gray400)' }}>
        {cart?.items?.map((item) => {
          const itemTitle = item.item_type === 'variant' 
            ? item.variant?.product?.title 
            : item.product?.title;
          const itemImage = item.item_type === 'variant'
            ? item.variant?.image
            : item.product?.image;
          const itemPrice = parseFloat(item.price_snapshot || item.price || 0);
          const itemQuantity = parseInt(item.quantity || 1);
          const itemTotal = parseFloat(item.total || (itemPrice * itemQuantity));

          return (
            <div key={item.id} className="flex gap-3 text-sm pb-3">
              {itemImage && (
                <img
                  src={itemImage.startsWith('http') ? itemImage : `${process.env.NEXT_PUBLIC_BASE_URL}${itemImage}`}
                  alt={itemTitle}
                  className="w-12 h-12 rounded object-cover"
                />
              )}
              <div className="flex-1">
                <p className="font-medium line-clamp-2" style={{ color: 'var(--primary-main)' }}>
                  {itemTitle}
                </p>
                {/* {item.item_type === 'variant' && item.variant?.attributes && (
                  <p className="text-xs" style={{ color: 'var(--neutral-gray600)' }}>
                    {Object.entries(item.variant.attributes)
                      .map(([key, value]) => `${value}`)
                      .join(', ')}
                  </p>
                )} */}
                <p style={{ color: 'var(--neutral-gray700)' }}>
                  Qty: {itemQuantity} × Tk. {itemPrice.toFixed(2)}
                </p>
              </div>
              <div className="text-right font-medium" style={{ color: 'var(--primary-main)' }}>
                Tk. {itemTotal.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between" style={{ color: 'var(--neutral-gray700)' }}>
          <span>Subtotal</span>
          <span>Tk. {(subtotal).toFixed(2)}</span>
        </div>

        {/* Show savings as informational only - not deducted from total */}
        {savings > 0 && (
          <div className="flex justify-between py-2 px-3 rounded bg-blue-50" style={{ color: 'var(--success)' }}>
            <div className="font-medium flex items-center gap-1">
              <HandCoins size={14} />
               You saved
               </div>
            <span className="font-semibold">Tk. {(savings).toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="pt-4 flex justify-between items-center" style={{ borderTop: `1px solid var(--neutral-gray400)` }}>
        <span className="font-semibold" style={{ color: 'var(--primary-main)' }}>Total</span>
        <span className="text-2xl font-bold" style={{ color: 'var(--accent-orange)' }}>
          Tk. {(total).toFixed(2)}
        </span>
      </div>

      {/* Items Count */}
      <div className="text-xs mt-4" style={{ color: 'var(--neutral-gray600)' }}>
        {cart?.total_items || 0} item{(cart?.total_items !== 1) ? 's' : ''} in cart
      </div>

      {/* Delivery Charge Info */}
      <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-(--accent-main)" >
        <div className="text-sm font-semibold mb-2 flex items-center gap-1" style={{ color: 'var(--accent-main)' }}>
           <Package size={14} />
           Delivery Charges
        </div>

        {deliveryLoading ? (
          <p className="text-xs" style={{ color: 'var(--neutral-gray700)' }}>
            Loading delivery charges...
          </p>
        ) : deliveryCharges ? (
          <ul className="text-xs space-y-1" style={{ color: 'var(--primary-main)' }}>
            {Array.isArray(deliveryCharges.cities) &&
              deliveryCharges.cities.map((entry) => (
                <li key={entry.city}>
                  • <span className="font-medium">{entry.city}:</span> Tk. {parseFloat(entry.charge || 0).toFixed(2)}
                </li>
              ))}
            <li>
              • <span className="font-medium">Other Cities:</span>{' '}
              Tk. {parseFloat(deliveryCharges.other_cities_charge || 0).toFixed(2)}
            </li>
          </ul>
        ) : (
          <p className="text-xs" style={{ color: 'var(--neutral-gray700)' }}>
            Delivery charges are currently unavailable.
          </p>
        )}
      </div>
    </div>
  );
}
