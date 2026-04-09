'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import AddressModal from './AddressModal';
import { fetchUserData } from '@/redux/slices/userSlice';
import { axiosInstance } from '@/utils/axiosInstance';

export default function AddressSection() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  
  const [address, setAddress] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize single address from user data
  useEffect(() => {
    const rawAddress = user?.address || (Array.isArray(user?.addresses) ? user.addresses[0] : null);

    if (rawAddress) {
      setAddress({
        id: rawAddress.id,
        street: rawAddress.street || '',
        city: rawAddress.city || '',
        state: rawAddress.state || '',
        postalCode: rawAddress.postal_code || '',
        country: rawAddress.country || '',
      });
    } else {
      setAddress(null);
    }
  }, [user]);

  const handleSaveAddress = async (newAddress) => {
    setIsLoading(true);

    try {
      const payload = {
        street: newAddress.street,
        city: newAddress.city,
        state: newAddress.state,
        postal_code: newAddress.postalCode,
        country: newAddress.country,
      };

      if (address?.id) {
        const response = await axiosInstance.patch(
          `/auth/addresses/${address.id}/`,
          payload
        );

        if (response.data.status) {
          await dispatch(fetchUserData());
          setShowModal(false);
          toast.success(response.data.message || 'Address updated successfully!');
        }
      } else {
        const response = await axiosInstance.post(
          '/auth/addresses/',
          payload
        );

        if (response.data.status) {
          await dispatch(fetchUserData());
          setShowModal(false);
          toast.success(response.data.message || 'Address added successfully!');
        }
      }
    } catch (error) {
      if (error.response?.data) {
        const { message } = error.response.data;
        toast.error(message || `Failed to ${address?.id ? 'update' : 'add'} address`);
      } else {
        toast.error('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAddress = () => {
    setShowModal(true);
  };

  const handleDeleteAddress = async (id) => {
    if (!confirm('Are you sure you want to delete this address?')) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.delete(`/auth/addresses/${id}/`);

      if (response.data.status) {
        await dispatch(fetchUserData());
        toast.success(response.data.message || 'Address deleted successfully!');
      }
    } catch (error) {
      if (error.response?.data) {
        const { message } = error.response.data;
        toast.error(message || 'Failed to delete address');
      } else {
        toast.error('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Addresses</h1>
          <p className="text-gray-600 mt-2">Manage your address</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-2 hover:opacity-90 text-white font-medium rounded-lg transition-colors w-fit"
          style={{ backgroundColor: 'var(--accent-main)' }}
        >
          <Plus className="w-5 h-5" />
          {address ? 'Edit Address' : 'Add Address'}
        </button>
      </div>

      {/* Address Card */}
      {address ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Address</h3>

          <div className="space-y-2 mb-6 text-gray-700">
            <p>{address.street}</p>
            <p>
              {address.city}, {address.state} {address.postalCode}
            </p>
            <p>{address.country}</p>
          </div>

          <div className="border-t border-gray-200 my-4" />

          <div className="flex gap-2">
            <button
              onClick={handleEditAddress}
              disabled={isLoading}
              className="flex items-center gap-1 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Edit2 className="w-4 h-4" />
              <span className="text-sm">Edit</span>
            </button>
            <button
              onClick={() => handleDeleteAddress(address.id)}
              disabled={isLoading}
              className="flex items-center gap-1 px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">{isLoading ? 'Deleting...' : 'Delete'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
          <p className="text-gray-600 mb-4">No addresses yet</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 hover:opacity-90 text-white font-medium rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--accent-main)' }}
          >
            Add Your First Address
          </button>
        </div>
      )}

      {/* Modal */}
      <AddressModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={handleSaveAddress}
        initialData={address}
      />
    </div>
  );
}
