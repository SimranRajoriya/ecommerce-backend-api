import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Show toast notification
    alert(`${product.name} added to cart!`);
    setQuantity(1);
  };

  const imageUrl = product.images?.[0]?.imageUrl || '/placeholder.png';
  const discount = Math.floor(Math.random() * 30) + 10; // Random discount 10-40%
  const originalPrice = Math.floor(product.price / (1 - discount / 100));

  return (
    <div className="card overflow-hidden group">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 h-64">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
          -{discount}%
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <p className="text-xs text-gray-500 font-semibold">
          {product.category?.name || 'Category'}
        </p>

        {/* Title */}
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400"
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">(2.5k reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
          <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>
        </div>

        {/* Stock Info */}
        <p className="text-xs text-green-600 font-semibold">
          {product.stockQuantity > 0 ? (
            <>✓ {product.stockQuantity} in stock</>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stockQuantity === 0}
          className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <ShoppingCart className="w-4 h-4" />
          {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
