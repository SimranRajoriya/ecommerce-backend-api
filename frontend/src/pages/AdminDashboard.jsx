import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Upload } from 'lucide-react'
import apiClient from '../api/api'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    categoryId: '',
    isActive: true,
  })
  const [categoryForm, setCategoryForm] = useState({
    name: '',
  })

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

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
      const res = await apiClient.get('/api/products?pageSize=100')
      setProducts(res.data.data || [])
    } catch (error) {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleCategoryChange = (e) => {
    const { name, value } = e.target
    setCategoryForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmitProduct = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.price || !formData.categoryId || !formData.stockQuantity) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
        categoryId: parseInt(formData.categoryId),
      }

      if (editingId) {
        await apiClient.put(`/api/products/${editingId}`, data)
        toast.success('Product updated successfully!')
      } else {
        await apiClient.post('/api/products', data)
        toast.success('Product created successfully!')
      }

      resetForm()
      fetchProducts()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      await apiClient.delete(`/api/products/${id}`)
      toast.success('Product deleted successfully!')
      fetchProducts()
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
      categoryId: product.categoryId,
      isActive: product.isActive,
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stockQuantity: '',
      categoryId: '',
      isActive: true,
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!categoryForm.name) {
      toast.error('Please enter category name')
      return
    }

    try {
      await apiClient.post('/api/categories', categoryForm)
      toast.success('Category created successfully!')
      setCategoryForm({ name: '' })
      fetchCategories()
    } catch (error) {
      toast.error('Failed to create category')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-semibold border-b-2 transition ${
              activeTab === 'products'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-6 py-3 font-semibold border-b-2 transition ${
              activeTab === 'categories'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Categories
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Products</h2>
              <button
                onClick={() => (showForm ? resetForm() : setShowForm(true))}
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary-dark transition"
              >
                <Plus size={20} />
                {showForm ? 'Cancel' : 'Add Product'}
              </button>
            </div>

            {/* Product Form */}
            {showForm && (
              <div className="bg-white rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                <form onSubmit={handleSubmitProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Product Name"
                      className="px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      className="px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Price"
                      step="0.01"
                      className="px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                    <input
                      type="number"
                      name="stockQuantity"
                      value={formData.stockQuantity}
                      onChange={handleInputChange}
                      placeholder="Stock Quantity"
                      className="px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Product Description"
                    rows="4"
                    className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <label className="text-sm font-semibold">Active</label>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-primary-dark transition disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Product'}
                  </button>
                </form>
              </div>
            )}

            {/* Products List */}
            <div className="bg-white rounded-lg overflow-hidden">
              {loading ? (
                <div className="p-8 text-center">Loading products...</div>
              ) : products.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm">{product.name}</td>
                          <td className="px-6 py-4 text-sm">{product.category?.name}</td>
                          <td className="px-6 py-4 text-sm font-semibold">₹{product.price}</td>
                          <td className="px-6 py-4 text-sm">{product.stockQuantity}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              product.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm space-x-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-primary hover:text-primary-dark inline-flex items-center gap-1"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-danger hover:text-red-600 inline-flex items-center gap-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-600">No products found</div>
              )}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Add Category Form */}
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Add New Category</h3>
                <form onSubmit={handleAddCategory} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={categoryForm.name}
                    onChange={handleCategoryChange}
                    placeholder="Category Name"
                    className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-primary-dark transition"
                  >
                    Add Category
                  </button>
                </form>
              </div>

              {/* Categories List */}
              <div className="lg:col-span-2 bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">All Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-semibold">{cat.name}</span>
                      <span className="text-sm text-gray-600">{cat.products?.length || 0} products</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
