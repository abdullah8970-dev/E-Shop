// src/app/men/page.js
import React from 'react'
import ProductCard from '../components/ProductCard'

const MenPage = () => {
  const products = [
    { id: 1, title: "Men Fashion Item 1", description: "Premium Quality", price: 49.00, image: "https://images.unsplash.com/photo-1521334884684-d80222895322?sig=1" },
    { id: 2, title: "Men Fashion Item 2", description: "Premium Quality", price: 49.00, image: "https://images.unsplash.com/photo-1521334884684-d80222895322?sig=2" },
    { id: 3, title: "Men Fashion Item 3", description: "Premium Quality", price: 49.00, image: "https://images.unsplash.com/photo-1521334884684-d80222895322?sig=3" },
    { id: 4, title: "Men Fashion Item 4", description: "Premium Quality", price: 49.00, image: "https://images.unsplash.com/photo-1521334884684-d80222895322?sig=4" },
    { id: 5, title: "Men Fashion Item 5", description: "Premium Quality", price: 49.00, image: "https://images.unsplash.com/photo-1521334884684-d80222895322?sig=5" },
    { id: 6, title: "Men Fashion Item 6", description: "Premium Quality", price: 49.00, image: "https://images.unsplash.com/photo-1521334884684-d80222895322?sig=6" },
    { id: 7, title: "Men Fashion Item 7", description: "Premium Quality", price: 49.00, image: "https://images.unsplash.com/photo-1521334884684-d80222895322?sig=7" },
    { id: 8, title: "Men Fashion Item 8", description: "Premium Quality", price: 49.00, image: "https://images.unsplash.com/photo-1521334884684-d80222895322?sig=8" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Banner */}
      <section className="relative h-[45vh]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516826957135-700dedea698c')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            Men Collection
          </h1>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10">Trending for Men</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  )
}

export default MenPage
