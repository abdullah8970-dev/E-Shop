import React from 'react'
import Link from "next/link";
import Image from 'next/image';


function Categoriespage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <section className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          All Categories
        </h1>
        <p className="text-gray-600">
          Explore our wide range of fashion categories
        </p>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {[
            { title: "Men", img: "https://images.unsplash.com/photo-1521334884684-d80222895322", link: "/men" },
            { title: "Women", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b", link: "/women" },
            { title: "Accessories", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f", link: "/products" },
            { title: "Shoes", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", link: "/products" },
            { title: "Watches", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", link: "/products" },
            { title: "Bags", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3", link: "/products" },
          ].map((cat, i) => (
            <Link
              key={i}
              href={cat.link}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src={cat.img}
                width={400}
                height={288}
                className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                alt={cat.title}
                unoptimized
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-3xl font-bold">
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}

        </div>
      </section>

    </div>
  )
}

export default Categoriespage
