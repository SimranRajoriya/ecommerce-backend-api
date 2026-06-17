import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, User, LogOut, Menu, X, Home } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { user, token, logout } = useAuthStore()
  const { items } = useCartStore()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
      setSearchTerm('')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:text-secondary transition">
            <Home size={24} />
            <span>Apna Bazar</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-6">
            <div className="w-full flex">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 rounded-l text-black outline-none"
              />
              <button
                type="submit"
                className="bg-secondary px-6 py-2 rounded-r hover:bg-yellow-600 transition"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {token ? (
              <>
                <div className="flex items-center gap-2">
                  <User size={20} />
                  <span className="text-sm">{user?.fullName}</span>
                </div>
                {user?.role === 'Admin' && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 bg-secondary text-primary rounded hover:bg-yellow-600 transition"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:text-secondary transition"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-secondary transition">
                  Login
                </Link>
                <Link to="/register" className="hover:text-secondary transition">
                  Register
                </Link>
              </>
            )}
            <Link to="/cart" className="relative hover:text-secondary transition">
              <ShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {items.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-3 py-2 rounded text-black outline-none text-sm"
                />
                <button type="submit" className="bg-secondary px-4 py-2 rounded hover:bg-yellow-600 transition">
                  <Search size={18} />
                </button>
              </div>
            </form>

            <div className="space-y-2">
              {token ? (
                <>
                  <div className="px-4 py-2 text-sm">{user?.fullName}</div>
                  {user?.role === 'Admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 bg-secondary text-primary rounded hover:bg-yellow-600 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-primary-dark transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-primary-dark transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-primary-dark transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
              <Link
                to="/cart"
                className="block px-4 py-2 hover:bg-primary-dark transition"
                onClick={() => setIsOpen(false)}
              >
                Cart ({items.length})
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
