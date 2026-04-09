"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import ImageComponent from "@/components/shared/ImageComponent";
import {
  fetchCart,
  removeFromCart,
  updateCartItem,
} from "@/redux/slices/cartSlice";

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const loading = useSelector((state) => state.cart.loading);
  console.log("Cart data in sidebar:", cart);

  const items = cart?.items || [];
  const summary = cart?.summary || {
    total_items: cart?.total_items || 0,
    subtotal: cart?.subtotal || "0.00",
    total_savings: cart?.total_savings || "0.00",
    tax: cart?.tax || "0.00",
    grand_total: cart?.grand_total || cart?.subtotal || "0.00",
  };

  const totalItems = summary.total_items || 0;
  const subtotal = parseFloat(summary.subtotal || 0);
  const tax = parseFloat(summary.tax || 0);
  const totalSavings = parseFloat(summary.total_savings || 0);
  const grandTotal = parseFloat(summary.grand_total || 0);

  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1 || loading) return;
    await dispatch(updateCartItem({ itemId: item.id, quantity: newQuantity }));
    dispatch(fetchCart());
  };

  const handleRemove = async (itemId) => {
    if (loading) return;
    await dispatch(removeFromCart(itemId));
    dispatch(fetchCart());
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-75 bg-black/40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 right-0 z-80 h-full w-full max-w-[500px] bg-gray-100 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-gray-600 text-white px-5 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-transparent border-none cursor-pointer text-white"
            aria-label="Close cart"
          >
            <ArrowLeft size={20} />
            <span className="text-lg leading-none">Cart</span>
          </button>

          <div className="flex items-center gap-2">
            <p className="text-lg leading-none">{totalItems} items -</p>
            <p className="text-lg font-semibold leading-none">
              Tk. {grandTotal.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <ShoppingCart className="w-14 h-14 text-gray-400 mb-3" />
              <h3 className="text-xl font-semibold text-gray-800">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mt-1">
                Add some products to continue.
              </p>
              <Link
                href="/products"
                onClick={onClose}
                className="mt-5 bg-(--accent-main) text-white px-6 py-2 rounded-lg font-semibold no-underline"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const itemType = item.item_type;
              const isVariantItem = itemType === "variant";
              const itemData = isVariantItem ? item.variant : item.product;
              const productInfo = isVariantItem ? itemData.product : itemData;
              const lineTotal = parseFloat(item.total || 0);
              const unitPrice = parseFloat(item.price_snapshot || 0);
              

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 shrink-0 rounded-md overflow-hidden bg-gray-100">
                      <ImageComponent
                        src={
                          process.env.NEXT_PUBLIC_BASE_URL + productInfo?.images?.[0] || "/placeholder-image.jpg"
                        }
                        alt={productInfo?.title || "Product"}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-gray-900 text-base font-medium leading-tight line-clamp-2">
                            {productInfo?.title}
                          </p>

                          {isVariantItem &&
                            Array.isArray(itemData?.attributes) &&
                            itemData.attributes.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {itemData.attributes.map((attr, index) => (
                                  <span
                                    key={`${item.id}-attr-${index}`}
                                    className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs"
                                  >
                                    {attr.type}: {attr.value}
                                  </span>
                                ))}
                              </div>
                            )}

                          {/* {isVariantItem && itemData?.sku && (
                        <p className="mt-1 text-xs text-gray-500">SKU: {itemData.sku}</p>
                      )} */}

                          {!isVariantItem && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {itemData?.category?.name && (
                                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs">
                                  {itemData.category.name}
                                </span>
                              )}
                              {itemData?.brand?.name && (
                                <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs">
                                  {itemData.brand.name}
                                </span>
                              )}
                            </div>
                          )}

                          {!item.is_available && (
                            <p className="mt-2 text-xs font-medium text-red-600">
                              Out of stock
                            </p>
                          )}

                          <p className="text-sm text-gray-500 mt-2">
                            price - Tk. {unitPrice.toFixed(2)}
                          </p>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          disabled={loading}
                          className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} className="mx-auto" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-md font-semibold text-gray-900 mt-1">
                          Tk. {lineTotal.toFixed(2)}
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() =>
                                handleQuantityChange(item, item.quantity - 1)
                              }
                              disabled={loading || !item.is_available}
                              className="w-8 h-8 rounded-xl border border-gray-400 text-gray-800 hover:bg-gray-100 transition-colors disabled:opacity-50"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} className="mx-auto" />
                            </button>
                            <span className="w-4 text-center font-semibold text-xl text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item, item.quantity + 1)
                              }
                              disabled={loading || !item.is_available}
                              className="w-8 h-8 rounded-xl border border-gray-400 text-gray-800 hover:bg-gray-100 transition-colors disabled:opacity-50"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} className="mx-auto" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="bg-white border-t border-gray-200 p-4 space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">Tk. {subtotal.toFixed(2)}</span>
          </div>
          {totalSavings > 0 && (
            <div className="flex items-center justify-between text-sm text-emerald-700">
              <span>Savings</span>
              <span className="font-medium">
                -Tk. {totalSavings.toFixed(2)}
              </span>
            </div>
          )}
          {tax > 0 && (
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Tax</span>
              <span className="font-medium">Tk. {tax.toFixed(2)}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-lg font-semibold text-gray-900 pt-1">
            <span>Grand Total</span>
            <span>Tk. {grandTotal.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            onClick={onClose}
            className="mt-2 w-full inline-flex items-center justify-center bg-(--accent-main) text-white py-3 rounded-none md:rounded-lg text-xl font-semibold no-underline"
          >
            Checkout
          </Link>
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;
