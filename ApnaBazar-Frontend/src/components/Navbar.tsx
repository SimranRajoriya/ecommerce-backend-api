import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Menu,
  X,
  LogOut,
  User,
  Settings,
  Home,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            <span className="text-yellow-400">🛍️</span>
            <span>ApnaBazar</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-yellow-400 transition">
              <Home className="w-5 h-5" />
            </Link>

            {user && isAdmin && (
              <Link to="/admin" className="hover:text-yellow-400 transition">
                <Settings className="w-5 h-5" />
              </Link>
            )}

            {user && (
              <Link to="/my-orders" className="hover:text-yellow-400 transition">
                My Orders
              </Link>
            )}

            <Link
              to="/cart"
              className="relative hover:text-yellow-400 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">{user.fullName}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-1 rounded font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border-2 border-yellow-400 px-4 py-1 rounded hover:bg-yellow-400 hover:text-gray-900 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-2 hover:bg-blue-700 rounded"
            >
              Home
            </Link>
            {user && isAdmin && (
              <Link
                to="/admin"
                className="block px-4 py-2 hover:bg-blue-700 rounded"
              >
                Admin Panel
              </Link>
            )}
            {user && (
              <Link
                to="/my-orders"
                className="block px-4 py-2 hover:bg-blue-700 rounded"
              >
                My Orders
              </Link>
            )}
            <Link
              to="/cart"
              className="block px-4 py-2 hover:bg-blue-700 rounded"
            >
              Cart ({totalItems})
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-blue-700 rounded text-red-400"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-blue-700 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 hover:bg-blue-700 rounded"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
