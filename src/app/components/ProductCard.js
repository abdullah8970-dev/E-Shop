"use client";

import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation
    dispatch(addToCart({
      id: product.id || product._id,
      title: product.title,
      price: product.price,
      image: product.img || product.image,
    }));
  };

  return (
    <Link href={`/product/${product.id || product._id}`}>
      <div
        className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src={product.img || product.image}
          alt={product.title}
          className="h-48 sm:h-64 md:h-72 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-base sm:text-lg">{product.title}</h3>
          <p className="text-gray-500 text-xs sm:text-sm">{product.desc || product.description}</p>
          <div className="flex justify-between items-center mt-3 sm:mt-4">
            <span className="font-bold text-sm sm:text-base">${product.price}</span>
            <button
              onClick={handleAddToCart}
              className="bg-gray-800 text-white px-6 py-3 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-700 min-h-[ 44px] transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
