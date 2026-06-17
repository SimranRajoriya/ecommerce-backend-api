import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const { addItem } = useCartStore()
  const imageUrl = product.productImages?.[0]?.imageUrl || 'https://via.placeholder.com/200x200?text=Product'

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(product)
    toast.success('Added to cart!')
  }

  return (
    <Link to={`/products/${product.id}`}>
      <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer fade-in">
        {/* Image */}
        <div className="w-full h-48 bg-gray-200 overflow-hidden flex items-center justify-center">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-gray-500 mb-2">{product.category?.name}</p>

          {/* Name */}
          <h3 className="font-semibold text-sm line-clamp-2 mb-2">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-yellow-400" />
              ))}
            </div>
            <span className="text-xs text-gray-600">(248)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-primary">₹{product.price}</span>
            <span className="text-sm text-gray-400 line-through">₹{Math.round(product.price * 1.3)}</span>
            <span className="text-xs bg-secondary text-primary px-2 py-1 rounded">-23%</span>
          </div>

          {/* Stock */}
          <p className="text-xs text-gray-600 mb-3">
            {product.stockQuantity > 0 ? (
              <span className="text-success">In Stock ({product.stockQuantity})</span>
            ) : (
              <span className="text-danger">Out of Stock</span>
            )}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
            className="w-full bg-secondary text-primary py-2 rounded font-semibold flex items-center justify-center gap-2 hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
