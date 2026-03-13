"use client";

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, closeCart, increaseQuantity, decreaseQuantity } from '../../store/cartSlice';
import { useState, useEffect }  from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const CartPopup = () => {
  const { items: cartItems, isCartOpen } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [discountCode, setDiscountCode] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else if (mounted) {
      document.body.style.overflow = 'unset';
    }

    return () => {
      if (mounted) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isCartOpen, mounted]);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      {/* Blurred overlay to close cart on click */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-[1px] transition-opacity duration-700 ease-in-out ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleCloseCart}
      ></div>
      <div className={`fixed top-0 right-0 z-50 h-screen w-[95vw] max-w-[400px] bg-white shadow-lg transform transition-transform duration-700 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} ${!isCartOpen ? 'pointer-events-none' : ''}`}>


        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-black">Your Cart</h2>
            <button onClick={handleCloseCart} className="text-gray-900 hover:text-gray-700">
              ✕
            </button>
          </div>
        </div>
        <div className="p-4 flex-1 overflow-y-auto max-h-[60vh]">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button
                onClick={handleCloseCart}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded mr-3"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-gray-600 text-sm">${item.price}</p>
                    <div className="flex items-center mt-1">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 bg-gray-100">{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 border-t flex-shrink-0" >
          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-1">
              Discount Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter discount code"
              />
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Apply
              </button>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-lg font-bold text-black">Total: ${totalPrice.toFixed(2)}</p>
          </div>
          <button
            onClick={() => {
              dispatch(closeCart());
              router.push('/checkout');
            }}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            Checkout
          </button>
          <button
            onClick={() => {
              dispatch(closeCart());
              router.back();
            }}
            className="w-full text-black py-3 rounded-md transition-colors mt-2 hover:text-gray-600 font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPopup;
