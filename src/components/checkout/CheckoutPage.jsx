'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
import bkashImage from '../../../public/assets/bkash-logo.png';
import nagadImage from '../../../public/assets/nogod-logo.png';
import CheckoutSummary from './CheckoutSummary';
import { createOrder, clearOrder } from '@/redux/slices/orderSlice';
import { clearCart } from '@/redux/slices/cartSlice';
import GuestAddressForm from './GuestAddressForm';

const PAYMENT_METHODS = [
  {
    id: 'cod',
    label: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    enabled: true,
    icon: '💵',
  },
  {
    id: 'bkash',
    label: 'bKash',
    description: 'Mobile payment service',
    enabled: false,
    icon: <Image src={bkashImage} alt="bKash Logo" width={48} height={34} />,
  },
  {
    id: 'nagad',
    label: 'Nagad',
    description: 'Digital payment service',
    enabled: false,
    icon: <Image src={nagadImage} alt="Nagad Logo" width={48} height={34} />,
  },
  {
    id: 'visa',
    label: 'Visa/Mastercard',
    description: 'Credit or debit card',
    enabled: false,
    icon: '💳',
  },
];

export default function CheckoutPage({ cart, user, loading: cartLoading }) {
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux state
  const isAuthenticated = !!user?.id;
  const orderState = useSelector((state) => state.order);

  // Form state for user details
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Form state for address
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
  });

  // Payment state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
  const [orderNotes, setOrderNotes] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    user: {},
    address: {},
    payment: '',
  });

  const existingAddress = user?.address || (Array.isArray(user?.addresses) ? user.addresses[0] : null);

  // Initialize user details and address when user data loads
  useEffect(() => {
    if (user) {
      setUserDetails({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });

      if (existingAddress) {
        setAddress({
          street: existingAddress.street || '',
          city: existingAddress.city || '',
          state: existingAddress.state || '',
          postal_code: existingAddress.postal_code || '',
          country: existingAddress.country || '',
        });
      }
    }
  }, [user, existingAddress]);

  const handleUserDetailsChange = (field, value) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [field]: undefined,
      },
    }));
  };

  const handleAddressChange = (nextAddress) => {
    setAddress(nextAddress);
    setFieldErrors((prev) => ({ ...prev, address: {} }));
  };

  const handlePaymentMethodSelect = (methodId) => {
    const method = PAYMENT_METHODS.find((entry) => entry.id === methodId);

    if (!method) return;

    if (!method.enabled) {
      toast.info(`${method.label} is not available yet`);
      return;
    }

    setSelectedPaymentMethod(methodId);
    setFieldErrors((prev) => ({ ...prev, payment: '' }));
  };

  const validateCheckoutForm = () => {
    const userErrors = {};
    const addressErrors = {};
    let paymentError = '';

    if (!isAuthenticated) {
      if (!userDetails.name?.trim()) userErrors.name = 'Name is required';
      if (!userDetails.email?.trim()) userErrors.email = 'Email is required';
      if (!userDetails.phone?.trim()) userErrors.phone = 'Phone is required';
    }

    if (!address.street?.trim()) addressErrors.street = 'Street is required';
    if (!address.city?.trim()) addressErrors.city = 'City is required';
    if (!address.state?.trim()) addressErrors.state = 'State is required';
    if (!address.postal_code?.trim()) addressErrors.postal_code = 'Postal code is required';
    if (!address.country?.trim()) addressErrors.country = 'Country is required';

    if (!selectedPaymentMethod) paymentError = 'Please select a payment method';

    const hasErrors =
      Object.keys(userErrors).length > 0 ||
      Object.keys(addressErrors).length > 0 ||
      !!paymentError;

    setFieldErrors({
      user: userErrors,
      address: addressErrors,
      payment: paymentError,
    });

    return !hasErrors;
  };

  const normalizeField = (value) => String(value || '').trim();

  const isCurrentAddressSameAsSaved = () => {
    if (!existingAddress?.id) return false;

    const comparableFields = ['street', 'city', 'state', 'postal_code', 'country'];

    return comparableFields.every(
      (field) => normalizeField(existingAddress[field]) === normalizeField(address[field])
    );
  };

  // Submit order
  const handleSubmitOrder = async () => {
    if (!validateCheckoutForm()) {
      toast.error('Please complete all required fields');
      return;
    }

    try {
      const orderPayload = {
        payment_method: selectedPaymentMethod,
      };

      if (orderNotes.trim()) {
        orderPayload.notes = orderNotes.trim();
      }

      const inlineAddressPayload = {
        street: address.street,
        city: address.city,
        state: address.state,
        postal_code: address.postal_code,
        country: address.country,
      };

      if (isAuthenticated) {
        if (isCurrentAddressSameAsSaved()) {
          orderPayload.address_id = existingAddress.id;
        } else {
          orderPayload.address = inlineAddressPayload;
          orderPayload.customer_phone = userDetails.phone;
        }
      } else {
        orderPayload.address = inlineAddressPayload;
        orderPayload.customer_name = userDetails.name;
        orderPayload.customer_phone = userDetails.phone;
        orderPayload.guest_email = userDetails.email;
      }

      const response = await dispatch(createOrder(orderPayload)).unwrap();

      toast.success('Order created successfully!');
      dispatch(clearCart());
      dispatch(clearOrder());

      // Prepare order data for confirmation page (use response.data)
      const orderData = {
        ...response.data,
        isGuest: !isAuthenticated, // Add guest flag
      };
      const encodedOrderData = encodeURIComponent(JSON.stringify(orderData));

      setTimeout(() => {
        router.push(`/order-confirmation?order=${encodedOrderData}`);
      }, 500);
    } catch (error) {
      console.error('Order creation error:', error);

      if (error?.errors) {
        toast.error('Please check all fields and try again');
      } else if (error?.detail) {
        toast.error(error.detail);
      } else if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error('Failed to create order. Please try again.');
      }
    }
  };

  if (cartLoading) {
    return (
      <div className="bg-white min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex items-center justify-center h-64">
            <p style={{ color: 'var(--neutral-gray700)' }}>Loading checkout...</p>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to cart if empty
  if (cart && (!cart.items || cart.items.length === 0)) {
    return (
      <div className="bg-white min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex items-center justify-center h-64 flex-col">
            <p className="mb-4" style={{ color: 'var(--neutral-gray300)' }}>Your cart is empty</p>
            <a
              href="/products"
              className="px-6 py-2 text-white rounded-lg transition"
              style={{ backgroundColor: 'var(--accent-orange)' }}
            >
              Browse Products
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">
            Checkout
          </h1>
          <p style={{ color: 'var(--neutral-gray700)' }}>
            Complete your purchase in one quick flow
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white p-6 rounded-lg" style={{ border: `1px solid var(--neutral-gray400)` }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: 'var(--accent-main)' }}>
                  1
                </span>
                <h2 className="text-xl font-semibold" style={{ color: 'var(--primary-main)' }}>
                  User Details
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--primary-main)' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userDetails.name || ''}
                    onChange={(e) => handleUserDetailsChange('name', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition"
                    style={{
                      borderColor: fieldErrors.user.name ? 'var(--error)' : 'var(--neutral-gray400)',
                      backgroundColor: isAuthenticated ? 'var(--neutral-gray300)' : 'var(--neutral-white)',
                      '--tw-ring-color': 'var(--accent-orange)',
                    }}
                    placeholder="John Doe"
                    disabled={isAuthenticated}
                  />
                  {fieldErrors.user.name && (
                    <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{fieldErrors.user.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--primary-main)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={userDetails.email || ''}
                    onChange={(e) => handleUserDetailsChange('email', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition"
                    style={{
                      borderColor: fieldErrors.user.email ? 'var(--error)' : 'var(--neutral-gray400)',
                      backgroundColor: isAuthenticated ? 'var(--neutral-gray300)' : 'var(--neutral-white)',
                      '--tw-ring-color': 'var(--accent-orange)',
                    }}
                    placeholder="john@example.com"
                    disabled={isAuthenticated}
                  />
                  {fieldErrors.user.email && (
                    <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{fieldErrors.user.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--primary-main)' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={userDetails.phone || ''}
                    onChange={(e) => handleUserDetailsChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition"
                    style={{
                      borderColor: fieldErrors.user.phone ? 'var(--error)' : 'var(--neutral-gray400)',
                      backgroundColor: isAuthenticated ? 'var(--neutral-gray300)' : 'var(--neutral-white)',
                      '--tw-ring-color': 'var(--accent-orange)',
                    }}
                    placeholder="+1 (555) 000-0000"
                    disabled={isAuthenticated}
                  />
                  {fieldErrors.user.phone && (
                    <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{fieldErrors.user.phone}</p>
                  )}
                </div>
              </div>

              {isAuthenticated && (
                <p className="text-xs mt-4" style={{ color: 'var(--neutral-gray700)' }}>
                  Account details are read-only for signed-in users. Edit your profile to update this information.
                </p>
              )}
            </section>

            <section className="bg-white p-6 rounded-lg" style={{ border: `1px solid var(--neutral-gray400)` }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: 'var(--accent-main)' }}>
                  2
                </span>
                <h2 className="text-xl font-semibold" style={{ color: 'var(--primary-main)' }}>
                  Delivery Address
                </h2>
              </div>

              <GuestAddressForm
                addressData={address}
                onAddressChange={handleAddressChange}
                errors={fieldErrors.address}
                title=""
                showTitle={false}
              />
            </section>

            <section className="bg-white p-6 rounded-lg" style={{ border: `1px solid var(--neutral-gray400)` }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: 'var(--accent-main)' }}>
                  3
                </span>
                <h2 className="text-xl font-semibold" style={{ color: 'var(--primary-main)' }}>
                  Payment Details
                </h2>
              </div>

              <div className="space-y-4">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => handlePaymentMethodSelect(method.id)}
                    disabled={!method.enabled}
                    className="w-full p-4 border-2 rounded-lg transition-all text-left"
                    style={{
                      borderColor: selectedPaymentMethod === method.id ? 'var(--accent-orange)' : 'var(--neutral-gray400)',
                      backgroundColor:
                        selectedPaymentMethod === method.id
                          ? 'var(--neutral-gray300)'
                          : method.enabled
                          ? 'var(--neutral-white)'
                          : 'var(--neutral-gray300)',
                      opacity: method.enabled ? 1 : 0.5,
                      cursor: method.enabled ? 'pointer' : 'not-allowed',
                    }}
                  >
                    <div className="flex items-center">
                      <div className="text-3xl mr-4">{method.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold" style={{ color: 'var(--primary-main)' }}>
                          {method.label}
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--neutral-gray700)' }}>
                          {method.description}
                        </p>
                        {!method.enabled && (
                          <p className="text-xs" style={{ color: 'var(--neutral-gray600)' }}>
                            Coming Soon
                          </p>
                        )}
                      </div>
                      {selectedPaymentMethod === method.id && (
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--accent-orange)' }}>
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {fieldErrors.payment && (
                <p className="text-sm mt-4" style={{ color: 'var(--error)' }}>
                  {fieldErrors.payment}
                </p>
              )}

              <div className="mt-6">
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--primary-main)' }}>
                  Order Notes (Optional)
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  rows={3}
                  placeholder="Call before delivery"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition resize-none text-gray-800"
                  style={{
                    borderColor: 'var(--neutral-gray400)',
                    '--tw-ring-color': 'var(--accent-orange)',
                  }}
                />
              </div>

              <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: 'var(--neutral-gray300)', borderLeft: `4px solid var(--accent-orange)` }}>
                <p className="text-sm" style={{ color: 'var(--primary-main)' }}>
                  <span className="font-semibold">Note:</span> We'll use your saved address when unchanged, or send your updated address inline with this order.
                </p>
              </div>
            </section>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmitOrder}
                disabled={orderState.loading || cartLoading || !selectedPaymentMethod}
                className="px-8 py-3 text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                style={{ backgroundColor: 'var(--accent-green)' }}
              >
                {orderState.loading || cartLoading ? (
                  <span className="flex items-center">
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Saving & Creating Order...
                  </span>
                ) : (
                  'Complete Order'
                )}
              </button>
            </div>
          </div>

          <div>
            <CheckoutSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}
