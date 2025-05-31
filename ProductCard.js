// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Make sure this path is correct

const ProductCard = ({ product }) => {
  const { addItemToCart } = useCart(); // Get the function from context

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    addItemToCart(product, 1); // Add 1 quantity of the current product
    alert(`${product.name || 'Product'} added to cart!`); // User feedback
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out m-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs xl:max-w-sm">
      {/* Image Container */}
      <div className="aspect-w-3 aspect-h-2 sm:aspect-none sm:h-60 overflow-hidden">
        <img
          src={product.image || 'https://via.placeholder.com/400x300.png?text=No+Image'}
          alt={product.name || 'Product Image'}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col space-y-3 p-6">
        <h3 className="text-lg font-semibold text-text-primary group-hover:text-brand-primary transition-colors duration-300">
          <span aria-hidden="true" className="absolute inset-0" />
          {product.name || 'Unnamed Product'}
        </h3>

        <p className="text-sm text-text-secondary line-clamp-3 flex-grow">
          {product.description || 'No description available.'}
        </p>

        <div className="flex flex-col items-start">
          <p className="text-xs text-gray-500 mb-1">
            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">
              Category: {product.category || 'Uncategorized'}
            </span>
          </p>
          <p className="text-xl font-bold text-brand-primary">
            ${product.price ? product.price.toFixed(2) : '0.00'}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart} // onClick handler is set
          className="mt-auto flex w-full items-center justify-center rounded-md border border-transparent bg-brand-primary px-6 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors duration-300"
          // Ensure 'bg-brand-primary' and 'hover:bg-purple-700' match your tailwind.config.js
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;