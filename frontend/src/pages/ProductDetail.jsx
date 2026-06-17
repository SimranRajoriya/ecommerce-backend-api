import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import apiClient from '../api/api'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addItem } = useCartStore()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const res = await apiClient.get(`/api/products/${id}`)
      setProduct(res.data.data)
    } catch (error) {
      toast.error('Product not found')
      navigate('/products')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    )
  }

  if (!product) return null

  const images = product.productImages || []
  const currentImage = images[currentImageIndex]?.imageUrl || 'https://via.placeholder.com/500x500?text=No+Image'

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success(`Added ${quantity} item(s) to cart!`)
    setQuantity(1)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (images.length || 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (images.length || 1)) % (images.length || 1))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-primary hover:underline flex items-center gap-2"
      >
        <ChevronLeft size={20} />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-96 object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x500?text=No+Image'
              }}
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-100"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    idx === currentImageIndex ? 'border-primary' : 'border-gray-300'
                  }`}
                >
                  <img src={img.imageUrl} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {/* Category */}
          <p className="text-sm text-gray-500 mb-2">{product.category?.name}</p>

          {/* Name */}
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600">(248 reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-primary">₹{product.price}</span>
              <span className="text-xl text-gray-400 line-through">₹{Math.round(product.price * 1.3)}</span>
              <span className="text-lg bg-secondary text-primary px-3 py-1 rounded">-23% off</span>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.stockQuantity > 0 ? (
              <p className="text-lg text-success font-semibold">✓ In Stock ({product.stockQuantity} available)</p>
            ) : (
              <p className="text-lg text-danger font-semibold">✗ Out of Stock</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                −
              </button>
              <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0}
              className="flex-1 bg-secondary text-primary py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={24} />
              Add to Cart
            </button>
            <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <Heart size={24} />
              Save
            </button>
          </div>

          {/* Delivery Info */}
          <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold mb-2">📦 Delivery Info</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Free delivery on orders above ₹500</li>
              <li>✓ Delivered in 2-3 business days</li>
              <li>✓ 7-day return policy</li>
              <li>✓ Cash on delivery available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
