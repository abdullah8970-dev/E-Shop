"use client";

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { openCart } from '../../store/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    newsletter: false,
    country: 'United States',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    phoneDelivery: '',
    saveInfo: false,
    paymentMethod: 'cod',
    billingSame: true,
    discountCode: '',
  });

  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleApplyDiscount = () => {
    if (formData.discountCode.toLowerCase() === 'discount10') {
      setAppliedDiscount(0.1); // 10% discount
    } else {
      setAppliedDiscount(0);
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 10; // Fixed shipping
  const discountAmount = subtotal * appliedDiscount;
  const total = subtotal + shipping - discountAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle checkout logic here
    alert('Checkout submitted!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <button onClick={() => { dispatch(openCart()); router.back(); }} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Side - Checkout Form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Contact Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Contact</h2>
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email or mobile phone number"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Email me with news and offers
                </label>
              </div>
            </div>

            {/* Delivery Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Delivery</h2>
              <div className="space-y-4">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name (optional)"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="apartment"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal code (optional)"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    name="phoneDelivery"
                    placeholder="Phone"
                    value={formData.phoneDelivery}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Save this information for next time
                </label>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
              <div className="border border-gray-300 rounded p-4">
                <div className="flex justify-between items-center">
                  <span>Standard Shipping</span>
                  <span className="font-semibold">$10.00</span>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Payment</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span>Cash on Delivery (COD)</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === 'bank'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span>Bank Deposit</span>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="billingSame"
                    value={true}
                    checked={formData.billingSame === true}
                    onChange={() => setFormData(prev => ({ ...prev, billingSame: true }))}
                    className="mr-2"
                  />
                  <span>Same as shipping address</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="billingSame"
                    value={false}
                    checked={formData.billingSame === false}
                    onChange={() => setFormData(prev => ({ ...prev, billingSame: false }))}
                    className="mr-2"
                  />
                  <span>Use a different billing address</span>
                </div>
              </div>
            </div>

            {/* Pay Now Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
            >
              Pay Now
            </button>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Product List */}
              <div className={`max-h-[300px] overflow-y-auto mb-6 ${styles.scrollHide}`}>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discount Code */}
              <div className="border-t pt-4 mb-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    name="discountCode"
                    placeholder="Discount code"
                    value={formData.discountCode}
                    onChange={handleInputChange}
                    className="flex-1 p-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount > 0 && (
                  <p className="text-green-600 text-sm mt-2">Discount applied: {appliedDiscount * 100}% off</p>
                )}
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
