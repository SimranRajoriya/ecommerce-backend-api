import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import apiClient from '../api/api'
import toast from 'react-hot-toast'

const Home = () => {
  const [categories, setCategories] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [categoriesRes, productsRes] = await Promise.all([
          apiClient.get('/api/categories'),
          apiClient.get('/api/products?pageSize=12&isActive=true'),
        ])
        setCategories(categoriesRes.data.data || [])
        setFeaturedProducts(productsRes.data.data || [])
      } catch (error) {
        toast.error('Failed to load content')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Apna Bazar</h1>
          <p className="text-lg md:text-xl mb-6">Discover amazing products at unbeatable prices</p>
          <Link
            to="/products"
            className="bg-secondary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition inline-block"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.id}
              to={`/products?categoryId=${category.id}`}
              className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition"
            >
              <div className="w-full h-24 bg-gray-200 rounded mb-3 flex items-center justify-center">
                <span className="text-3xl">🏷️</span>
              </div>
              <h3 className="font-semibold text-sm line-clamp-2 text-gray-800">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="flex items-center gap-2 text-primary hover:text-primary-dark">
            View All <ChevronRight size={20} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Promo Banner */}
      <div className="bg-secondary text-primary py-8 md:py-12 my-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Special Offer!</h2>
          <p className="text-lg mb-6">Get up to 50% off on selected items. Limited time offer!</p>
          <Link
            to="/products"
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition inline-block"
          >
            Shop Sale Items
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
