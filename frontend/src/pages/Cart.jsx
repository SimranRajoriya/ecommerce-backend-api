import { Link } from 'react-router-dom'
import { Trash2, Minus, Plus } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

const Cart = () => {
  const { items, removeItem, updateQuantity } = useCartStore()
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 50
  const tax = subtotal * 0.05
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Add items to your cart to get started.</p>
        <Link
          to="/products"
          className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={`flex gap-4 p-6 ${idx !== items.length - 1 ? 'border-b' : ''}`}
              >
                {/* Image */}
                <div className="w-24 h-24 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                  <img
                    src={item.productImages?.[0]?.imageUrl || 'https://via.placeholder.com/100'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <Link to={`/products/${item.id}`} className="font-semibold hover:text-primary mb-1 inline-block">
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-600 mb-3">{item.category?.name}</p>
                  <div className="text-lg font-bold text-primary">₹{item.price}</div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex flex-col items-end gap-4">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 hover:text-danger transition"
                  >
                    <Trash2 size={20} />
                  </button>

                  <div className="flex items-center gap-2 border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6 pb-6 border-b">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-success' : ''}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-bold text-primary">₹{total.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-primary text-white py-3 rounded-lg font-bold text-center hover:bg-primary-dark transition block mb-3"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/products"
              className="w-full border-2 border-primary text-primary py-3 rounded-lg font-bold text-center hover:bg-gray-50 transition block"
            >
              Continue Shopping
            </Link>

            {shipping === 0 && (
              <p className="text-sm text-success text-center mt-4">✓ Free shipping on this order!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
