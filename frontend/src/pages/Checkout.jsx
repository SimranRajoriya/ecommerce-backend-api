import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import apiClient from '../api/api'
import toast from 'react-hot-toast'

const Checkout = () => {
  const navigate = useNavigate()
  const { items, clearCart, getTotalPrice } = useCartStore()
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    shippingAddress: '',
    phoneNumber: '',
    paymentMethod: 'cod',
  })

  const subtotal = getTotalPrice()
  const shipping = subtotal > 500 ? 0 : 50
  const tax = subtotal * 0.05
  const total = subtotal + shipping + tax

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.shippingAddress || !formData.phoneNumber) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      const orderData = {
        shippingAddress: formData.shippingAddress,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      }

      const res = await apiClient.post('/api/orders', orderData)
      toast.success('Order placed successfully!')
      clearCart()
      setTimeout(() => navigate('/orders'), 1500)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8">
            {/* Delivery Address */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Delivery Address</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    value={user?.fullName || ''}
                    disabled
                    className="w-full px-4 py-2 border rounded bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-2 border rounded bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    required
                    className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Shipping Address</label>
                  <textarea
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    rows="4"
                    required
                    className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <div>
                    <div className="font-semibold">Cash on Delivery</div>
                    <div className="text-sm text-gray-600">Pay when you receive your order</div>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>

            <div className="space-y-3 mb-6 pb-6 border-b max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} <span className="text-gray-600">x{item.quantity}</span>
                  </span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-success' : ''}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold">Total</span>
              <span className="text-2xl font-bold text-primary">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
