"use client";
import React from 'react'
import ProductCard from '../components/ProductCard'

function Productspage() {
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

          {[1,2,3,4,5,6,7,8].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group"
            >
              <img
                src={`https://images.unsplash.com/photo-1523275335684-37898b6baf30?sig=${item}`}
                alt="Product"
                className="h-72 w-full object-cover group-hover:scale-105 transition"
              />

              <div className="p-5">
                <h3 className="font-semibold text-lg">
                  Premium Product
                </h3>
                <p className="text-gray-500 text-sm mb-3">
                  High quality material
                </p>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">$79.00</span>
                  <Link
                    href="/product"
                    className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <button
  onClick={() =>
    addToCart({
      id: item, // ya product.id
      title: "Premium Product",
      price: 79,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    })
  }
  className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800"
>
  Add to Cart
</button>


        </div>
      </section>

    </div>
  )
}

export default Productspage
