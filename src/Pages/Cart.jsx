import React from 'react';
import { TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon } from '@heroicons/react/solid';
import { useCart } from '../CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem } = useCart();

  // Calculate subtotal, tax, and total
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3b82f6] to-[#a855f7] p-8">
      <main className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-[#3b82f6] mb-8">Your Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBagIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">Your cart is empty</p>
              <button className="mt-4 bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white px-6 py-2 rounded-full font-semibold hover:from-[#a855f7] hover:to-[#3b82f6] transition duration-300">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-[#a855f7] font-bold">${item.price ? item.price.toFixed(2) : 0}</p>
                        <p className="text-[#a855f7] font-bold">${item.salesPrice ? item.salesPrice.toFixed(1) :0}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="text-gray-500 hover:text-[#3b82f6] transition duration-300"
                        >
                          <MinusIcon className="h-5 w-5" />
                        </button>
                        <span className="font-semibold">{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="text-gray-500 hover:text-[#3b82f6] transition duration-300"
                        >
                          <PlusIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition duration-300"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="mt-8 w-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white py-3 rounded-md font-semibold hover:from-[#a855f7] hover:to-[#3b82f6] transition duration-300 flex items-center justify-center">
                <ShoppingBagIcon className="h-6 w-6 mr-2" />
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
