"use client";

import { useState } from "react";
import ProductModal from "./ProductModal";

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden group">
        <img
          src={product.image}
          alt={product.title}
          className="h-72 w-full object-cover group-hover:scale-105 transition"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{product.title}</h3>
          <p className="text-gray-500 text-sm">{product.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold">${product.price}</span>
            <button
              onClick={openModal}
              className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800"
            >
              View
            </button>
          </div>
        </div>
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={product}
      />
    </>
  );
};

export default ProductCard;
