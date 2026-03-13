import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
     <div className="bg-gray-50">

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1491553895911-0055eca6402d')] 
          bg-cover bg-center scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-6">
          <div className="text-white max-w-xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
              Elevate Your Style
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Discover premium fashion for Men, Women & more — designed for modern lifestyles.
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-black px-8 py-4 rounded-full
              font-semibold hover:bg-black hover:text-white transition-all duration-300"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Men */}
          <Link
            href="/men"
            className="group relative h-[ 380px] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1521334884684-d80222895322"
              alt="Men Fashion"
              width={400}
              height={380}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-3xl font-bold tracking-wide">
                Men
              </h3>
            </div>
          </Link>

          {/* Women */}
          <Link
            href="/women"
            className="group relative h-[ 380px] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
              alt="Women Fashion"
              width={400}
              height={380}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-3xl font-bold tracking-wide">
                Women
              </h3>
            </div>
          </Link>

          {/* Categories */}
          <Link
            href="/categories"
            className="group relative h-[ 380px] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
              alt="All Categories"
              width={400}
              height={380}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-3xl font-bold tracking-wide">
                Categories
              </h3>
            </div>
          </Link>

        </div>
      </section>

    </div>

    

    
    
    </>
  );
}

    

