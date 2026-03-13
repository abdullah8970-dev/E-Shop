"use client";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';

const ProductModal = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const images = product.images || [product.image];

  const getSizesForCategory = (category) => {
    const electronicsCategories = ['electronics', 'phones', 'mobile devices', 'laptops', 'computers', 'headphones', 'headsets', 'watches', 'bags', 'accessories'];
    const clothingCategories = ['clothing', 't-shirts', 'suits', 'men', 'women'];
    const shoesCategories = ['shoes', 'sneakers', 'heels'];
    const pantsCategories = ['pants', 'jeans'];

    if (electronicsCategories.some(cat => category.toLowerCase().includes(cat))) {
      return ['One Size'];
    } else if (shoesCategories.some(cat => category.toLowerCase().includes(cat))) {
      return ['39', '40', '41', '42', '43', '44'];
    } else if (clothingCategories.some(cat => category.toLowerCase().includes(cat))) {
      return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    } else if (pantsCategories.some(cat => category.toLowerCase().includes(cat))) {
      return ['28', '30', '32', '34', '36', '38', '40', '42'];
    } else {
      return ['One Size']; // default
    }
  };

  const sizes = getSizesForCategory(product.category);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size: selectedSize || sizes[0],
    }));
    onClose();
  };

  const nextImage = () => 
    {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

  const prevImage = () =>
    {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

  return (
    <div className="fixed inset-0 backdrop-blur-[0.8px]  flex items-start justify-center mt-2 pt-16 z-50 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-white rounded-3xl p-5 max-w-2xl w-full mx-2 max-h-[ 100vh] overflow-hidden shadow-3xl transform transition-all duration-300 scale-100" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0.5 right-0.5 text-gray-400 hover:text-gray-600 text-2xl font-light transition-colors"
        >
          &times;
        </button>

        <div className="overflow-y-auto max-h-[calc(90vh-5rem)] scrollbar-hide">
          {/* Image Gallery */}
          <div className="relative mb-4">
            <div className="relative h-55  rounded-3xl">
              <img
                src={images[currentImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  >
                    ›
                  </button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">{product.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            <p className="text-xl font-bold text-gray-900">${product.price}</p>

            {/* Sizes */}
            {sizes && sizes.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-gray-900">
                  Available Sizes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-2 border-2 rounded-lg transition-all font-medium text-sm ${
                        selectedSize === size
                          ? 'border-orange-500 bg-orange-50 text-orange-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors text-md font-semibold"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
