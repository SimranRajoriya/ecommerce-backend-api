import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import apiClient from '../api/api'
import toast from 'react-hot-toast'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 12,
    totalPages: 1,
  })

  // Filter state
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    categoryId: searchParams.get('categoryId') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'newest',
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [filters, pagination.pageNumber])

  const fetchCategories = async () => {
    try {
      const res = await apiClient.get('/api/categories')
      setCategories(res.data.data || [])
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      params.append('pageNumber', pagination.pageNumber)
      params.append('pageSize', pagination.pageSize)
      params.append('isActive', 'true')

      if (filters.search) params.append('search', filters.search)
      if (filters.categoryId) params.append('categoryId', filters.categoryId)
      if (filters.minPrice) params.append('minPrice', filters.minPrice)
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)

      const res = await apiClient.get(`/api/products?${params.toString()}`)
      setProducts(res.data.data || [])
      setPagination((prev) => ({
        ...prev,
        totalPages: res.data.totalPages || 1,
      }))
    } catch (error) {
      toast.error('Failed to load products')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
    setPagination((prev) => ({
      ...prev,
      pageNumber: 1,
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      categoryId: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'newest',
    })
    setPagination((prev) => ({
      ...prev,
      pageNumber: 1,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block w-64">
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Filters</h3>
              {(filters.search || filters.categoryId || filters.minPrice || filters.maxPrice) && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-primary hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 border rounded outline-none text-sm"
              />
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={filters.categoryId}
                onChange={(e) => handleFilterChange('categoryId', e.target.value)}
                className="w-full px-3 py-2 border rounded outline-none text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Price Range</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-1/2 px-2 py-2 border rounded outline-none text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-1/2 px-2 py-2 border rounded outline-none text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg w-full justify-center border"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden bg-white rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Search */}
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 border rounded outline-none text-sm mb-4"
              />

              {/* Mobile Category */}
              <select
                value={filters.categoryId}
                onChange={(e) => handleFilterChange('categoryId', e.target.value)}
                className="w-full px-3 py-2 border rounded outline-none text-sm mb-4"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Showing {(pagination.pageNumber - 1) * pagination.pageSize + 1} -{' '}
                {Math.min(pagination.pageNumber * pagination.pageSize, products.length * pagination.totalPages)} of{' '}
                {products.length * pagination.totalPages} products
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <button
                    onClick={() =>
                      setPagination((prev) => ({
                        ...prev,
                        pageNumber: Math.max(1, prev.pageNumber - 1),
                      }))
                    }
                    disabled={pagination.pageNumber === 1}
                    className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() =>
                        setPagination((prev) => ({
                          ...prev,
                          pageNumber: i + 1,
                        }))
                      }
                      className={`px-4 py-2 border rounded ${
                        pagination.pageNumber === i + 1
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setPagination((prev) => ({
                        ...prev,
                        pageNumber: Math.min(prev.totalPages, prev.pageNumber + 1),
                      }))
                    }
                    disabled={pagination.pageNumber === pagination.totalPages}
                    className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
