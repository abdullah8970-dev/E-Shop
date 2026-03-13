"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCard from '../components/ProductCard'

function Productspage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/getproducts');
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
     <div className="bg-gray-50 min-h-screen">

      {/* Banner */}
      <section className="relative h-[40vh]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1445205170230-053b83016050')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            Our Products
          </h1>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap gap-4 justify-between items-center">
        <h2 className="text-2xl font-bold">All Products</h2>

        <div className="flex gap-4">
          <select className="px-4 py-2 rounded-lg border bg-white">
            <option>Category</option>
            <option>Men</option>
            <option>Women</option>
            <option>Accessories</option>
          </select>

          <select className="px-4 py-2 rounded-lg border bg-white">
            <option>Sort by</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id || product._id}
              product={product}
            />
          ))}
        </div>
      </section>

    </div>
  )
}

export default Productspage
