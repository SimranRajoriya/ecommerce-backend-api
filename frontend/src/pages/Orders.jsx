import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../api/api'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { token } = useAuthStore()

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    fetchOrders()
  }, [token])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const res = await apiClient.get('/api/orders')
      setOrders(res.data.data || [])
    } catch (error) {
      toast.error('Failed to load orders')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Processing':
        return 'bg-blue-100 text-blue-800'
      case 'Shipped':
        return 'bg-purple-100 text-purple-800'
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg h-40 animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
        <p className="text-gray-600 mb-8">Start shopping to place your first order.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg p-6 border">
            {/* Order Header */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
              <div>
                <p className="text-sm text-gray-600 mb-1">Order ID</p>
                <p className="font-bold">#{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Date</p>
                <p className="font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}>
                  {order.orderStatus}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total</p>
                <p className="font-bold text-lg text-primary">₹{order.totalAmount?.toFixed(2)}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Items</h3>
              <div className="space-y-3">
                {order.orderItems?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <div>
                      <p className="font-semibold">{item.product?.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{item.price?.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <p className="text-gray-700">{order.shippingAddress}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
