import React from 'react'

function Contactpage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Banner */}
      <section className="relative h-[35vh]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492724441997-5dc865305da7')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-4xl md:text-5xl font-bold">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-10">
            We’d love to hear from you. Reach out for any questions or support.
          </p>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="font-semibold">📍 Address</h4>
              <p className="text-gray-600">
                123 Fashion Street, New York, USA
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="font-semibold">📧 Email</h4>
              <p className="text-gray-600">
                support@brandstore.com
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="font-semibold">📞 Phone</h4>
              <p className="text-gray-600">
                +1 234 567 890
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-10 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold mb-6">
            Send a Message
          </h3>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border px-4 py-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border px-4 py-3 rounded-lg"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border px-4 py-3 rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800"
            >
              Send Message
            </button>
          </form>
        </div>

      </section>

    </div>
  )
}

export default Contactpage
