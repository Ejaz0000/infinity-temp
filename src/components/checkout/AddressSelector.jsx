import React, { useState } from 'react';

export default function AddressSelector({ 
  addresses = [], 
  selectedAddressId, 
  onSelectAddress, 
  onUseNewAddress,
  isNew,
  title = "Select Address"
}) {
  const [isNewAddressSelected, setIsNewAddressSelected] = useState(isNew || false);

  const handleSelectExisting = (addressId) => {
    setIsNewAddressSelected(false);
    onSelectAddress(addressId);
  };

  const handleNewAddress = () => {
    setIsNewAddressSelected(true);
    onUseNewAddress?.();
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      
      {/* Existing Addresses */}
      {addresses.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Saved Addresses</h4>
          <div className="space-y-3">
            {addresses.map((address) => (
              <label key={address.id} className="flex items-start p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name={`address-${title}`}
                  checked={!isNewAddressSelected && selectedAddressId === address.id}
                  onChange={() => handleSelectExisting(address.id)}
                  className="mt-1 mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900">{address.label || 'Address'}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {address.street || address.address_line1}
                  </p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state} {address.postal_code}
                  </p>
                  <p className="text-sm text-gray-600">{address.country}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* New Address Option */}
      <div className="pt-4 border-t border-gray-200">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name={`address-${title}`}
            checked={isNewAddressSelected}
            onChange={handleNewAddress}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">
            {addresses.length > 0 ? 'Use a different address' : 'Enter new address'}
          </span>
        </label>
      </div>
    </div>
  );
}
