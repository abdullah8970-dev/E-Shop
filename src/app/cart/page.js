"use client";

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../store/cartSlice';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Cart.module.css';
import { FaTrash } from 'react-icons/fa';

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRemoveFromCart = (id) =>
    {
    dispatch(removeFromCart(id));
    };

  const handleIncreaseQuantity = (id) =>
    {
    dispatch(increaseQuantity(id));
    };

  const handleDecreaseQuantity = (id) =>
    {
    dispatch(decreaseQuantity(id));
    };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={` max-w-screen-xl mx-auto px-4 h-full flex flex-col ${styles.cartContainer}`}>
      <h1 className="text-3xl font-bold mb-8 text-black">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500 flex-1">Your cart is empty.</p>
      ) : (
        <>
          <div className={`flex-1 overflow-y-auto ${styles.scrollHide}`}>
            <div className="grid gap-6">
              {cartItems.map((item, index) => (
                <div key={item.id} className={`flex items-center bg-white p-4 rounded-lg shadow ${styles.slideIn}`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600">${item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="bg-gray-300 text-gray-700 px-3 py-2 rounded-l hover:bg-gray-400 min-h-[44px ] min-w-[44px ]"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 bg-gray-100 min-h-[44px ] flex items-center justify-center">{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className="bg-gray-300 text-gray-700 px-3 py-2 rounded-r hover:bg-gray-400 min-h-[44px ] min-w-[44px ]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    aria-label="Remove item"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 text-right">
            <p className="text-xl font-bold text-black">Total: ${totalPrice.toFixed(2)}</p>
            <Link href="/checkout">
              <button className="bg-blue-500 text-white px-6 py-3 rounded mt-4 hover:bg-blue-600">
                Proceed to Checkout
              </button>
            </Link>
            <button onClick={() => router.back()} className="bg-gray-500 text-white px-6 py-3 rounded mt-4 hover:bg-gray-600">
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
}
