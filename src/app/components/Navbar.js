"use client";

import { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { openCart } from '../../store/cartSlice';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = useSelector((state) => state.cart.items.length);
  const dispatch = useDispatch();

  return (
    <nav className="bg-white shadow-md fixed w-full z-60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800">
            E-Shop
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-800 hover:text-gray-600">Home</Link>
            <Link href="/men" className="text-gray-800 hover:text-gray-600">Men</Link>
            <Link href="/women" className="text-gray-800 hover:text-gray-600">Women</Link>
            <Link href="/products" className="text-gray-800 hover:text-gray-600">Products</Link>
            <Link href="/categories" className="text-gray-800 hover:text-gray-600">Categories</Link>
            <Link href="/contact" className="text-gray-800 hover:text-gray-600">Contact</Link>

            <Link href={"/login"}><MdAccountCircle className="text-xl" /></Link>

            {/* Cart Icon */}
            <button onClick={() => dispatch(openCart())} className="relative">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/login">
              <MdAccountCircle className="text-xl text-gray-800" />
            </Link>

            <button onClick={() => dispatch(openCart())} className="relative">
              <FaShoppingCart className="text-xl text-gray-800" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <HiX className="h-6 w-6 text-gray-800" /> : <HiMenu className="h-6 w-6 text-gray-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-2 pt-2 pb-3 space-y-1 shadow-lg">
          <Link href="/" className="block px-3 py-2 text-gray-800 hover:text-gray-600" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/men" className="block px-3 py-2 text-gray-800 hover:text-gray-600" onClick={() => setIsOpen(false)}>Men</Link>
          <Link href="/women" className="block px-3 py-2 text-gray-800 hover:text-gray-600" onClick={() => setIsOpen(false)}>Women</Link>
          <Link href="/products" className="block px-3 py-2 text-gray-800 hover:text-gray-600" onClick={() => setIsOpen(false)}>Products</Link>
          <Link href="/categories" className="block px-3 py-2 text-gray-800 hover:text-gray-600" onClick={() => setIsOpen(false)}>Categories</Link>
          <Link href="/contact" className="block px-3 py-2 text-gray-800 hover:text-gray-600" onClick={() => setIsOpen(false)}>Contact</Link>
          <button onClick={() => { dispatch(openCart()); setIsOpen(false); }} className="block px-3 py-2 font-semibold w-full text-left text-gray-800 hover:text-gray-600">
            Cart ({cartCount})
          </button>
        </div>
      )}
    </nav>
  );
}
