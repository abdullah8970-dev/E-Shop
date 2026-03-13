"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart, addToCartForBuyNow } from '../../../store/cartSlice';
import Link from 'next/link';
import Image from 'next/image';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [rating] = useState(0);

  // Get size options based on product category
  const getSizeOptionsForProduct = (category) => {
    const cat = category?.toLowerCase().trim() || '';

    // Electronics and accessories
    if (cat === 'electronics' || cat.includes('phone') || cat.includes('mobile') || cat.includes('laptop') || cat.includes('computer') || cat.includes('headphone') || cat.includes('headset') || cat.includes('watch') || cat.includes('bag') || cat.includes('accessory')) {
      return ['One Size'];
    }
    // Shoes
    else if (cat === 'shoes' || cat.includes('shoe')) {
      return ['39', '40', '41', '42', '43', '44'];
    }
    // T-Shirts and Clothing
    else if (cat === 'clothing' || cat === 't-shirt' || cat === 'shirt' || cat.includes('shirt')) {
      return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    }
    // Suits
    else if (cat === 'suit' || cat.includes('suit')) {
      return ['S', 'M', 'L', 'XL', 'XXL'];
    }
    // Pants/Jeans/Trousers
    else if (cat === 'pants' || cat === 'jeans' || cat === 'trousers' || cat.includes('pant') || cat.includes('jean') || cat.includes('trouser')) {
      return ['28', '30', '32', '34', '36', '38', '40', '42'];
    }
    // Default clothing sizes
    else {
      return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/getproducts/${id}`);
        const data = await response.json();
        if (data.product) {
          setProduct(data.product);
          // Set initial size based on category, not database
          const sizeOptions = getSizeOptionsForProduct(data.product.category);
          setSelectedSize(sizeOptions[0] || '');
          if (data.product.color) {
            setSelectedColor(data.product.color);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  const images = product.images || [product.img];
  
  // Ensure at least 3 thumbnails - duplicate the main image if needed
  const displayImages = () => {
    if (images.length >= 3) {
      return images;
    } else if (images.length === 2) {
      return [...images, images[0]];
    } else {
      // Single image - show it 3 times
      return [images[0], images[0], images[0]];
    }
  };
  
  const thumbnailImages = displayImages();
  
  const discountPercent = 20; // Example discount
  const originalPrice = (product.price / (1 - discountPercent / 100)).toFixed(2);

  // Parse color options - if only one color, create variations, otherwise use as is
  const colorOptions = product.color
    ? product.color.split(',').map(c => c.trim())
    : [];

  // Check if product should display size options
  const shouldShowSize = () => {
    const category = product.category?.toLowerCase().trim() || '';
    
    // Hide size for electronics and accessories that don't have sizes
    const noSizeCategories = ['phone', 'mobile', 'laptop', 'computer', 'headphone', 'headset', 'watch', 'bag', 'accessory', 'electronics'];
    
    for (let noSize of noSizeCategories) {
      if (category.includes(noSize)) {
        return false;
      }
    }
    
    return true;
  };

  // Get size options based on product category
  const getSizeOptions = () => {
    const category = product.category?.toLowerCase().trim() || '';
    
    // Shoes
    if (category === 'shoes' || category.includes('shoe')) {
      return ['39', '40', '41', '42', '43', '44'];
    } 
    // T-Shirts and Clothing
    else if (category === 'clothing' || category === 't-shirt' || category === 'shirt' || category.includes('shirt')) {
      return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    } 
    // Suits
    else if (category === 'suit' || category.includes('suit')) {
      return ['S', 'M', 'L', 'XL', 'XXL'];
    }
    // Pants/Jeans/Trousers
    else if (category === 'pants' || category === 'jeans' || category === 'trousers' || category.includes('pant') || category.includes('jean') || category.includes('trouser')) {
      return ['28', '30', '32', '34', '36', '38', '40', '42'];
    }
    // Default clothing sizes
    else {
      return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    }
  };

  const sizeOptions = getSizeOptions();

  // Get color values for visual display
  const getColorValue = (colorName) => {
    const colorMap = {
      'blue': '#1e40af',
      'red': '#dc2626',
      'black': '#000000',
      'white': '#ffffff',
      'green': '#16a34a',
      'yellow': '#eab308',
      'gray': '#6b7280',
      'navy': '#001f3f',
      'brown': '#92400e',
      'pink': '#ec4899',
    };
    return colorMap[colorName.toLowerCase()] || colorName;
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.img,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    }));
  };

  const handleBuyNow = () => {
    dispatch(addToCartForBuyNow({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.img,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    }));
    router.push('/checkout');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };


  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/products" className="text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-8">
          ← Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Image Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden h-64 md:h-80">
                <img
                  src={images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {thumbnailImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index % images.length);
                      setSelectedThumbnailIndex(index);
                    }}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedThumbnailIndex === index
                        ? 'border-orange-500 border-4'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Details Section */}
            <div className="space-y-6">
              {/* Title */}
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-blue-500 text-sm">No Ratings</span>
              </div>

              {/* Brand */}
              <div className="text-sm">
                <span className="text-gray-600">Brand: </span>
                <span className="text-blue-500 cursor-pointer hover:underline">
                  No Brand
                </span>
                <span className="text-gray-600"> | </span>
                <span className="text-blue-500 cursor-pointer hover:underline">
                  More {product.category}
                </span>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-orange-500">
                    USD.  {product.price}
                  </span>
                  {/* <span className="text-lg text-gray-400 line-through">
                    USD. {originalPrice}
                  </span> */}
                  {/* <span className="text-red-500 font-semibold">
                    -{discountPercent}%
                  </span> */}
                </div>
              </div>

              {/* Color Family */}
              {colorOptions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Color Family</h3>
                  <div className="flex flex-wrap gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedColor === color
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-300 hover:border-gray-900'
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded border border-gray-300"
                          style={{
                            backgroundColor: getColorValue(color),
                          }}
                        />
                        <span className="text-sm text-gray-700">{color}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {shouldShowSize() && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-12 h-10 px-3 py-2 border-2 rounded transition-all font-medium text-sm ${
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

              {/* Quantity */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.availableQty, quantity + 1))
                    }
                    className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.desc}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
