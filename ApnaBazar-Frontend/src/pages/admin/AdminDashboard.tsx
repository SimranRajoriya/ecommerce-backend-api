import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Package, Tag, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const stats = [
    { label: 'Total Products', value: '1,234', icon: Package, color: 'bg-blue-100 text-blue-600' },
    { label: 'Total Categories', value: '15', icon: Tag, color: 'bg-green-100 text-green-600' },
    { label: 'Total Orders', value: '567', icon: ShoppingBag, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Revenue', value: '₹45.2L', icon: BarChart3, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b flex">
            {['overview', 'products', 'categories', 'orders'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold transition ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6 min-h-96">
            {activeTab === 'overview' && (
              <div>
                <h3 className="font-bold text-lg mb-4">Dashboard Overview</h3>
                <p className="text-gray-600">Click on the tabs to manage products, categories, and orders.</p>
              </div>
            )}
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Products Management</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                    Add Product
                  </button>
                </div>
                <p className="text-gray-600">Product management interface coming soon...</p>
              </div>
            )}
            {activeTab === 'categories' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Categories Management</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                    Add Category
                  </button>
                </div>
                <p className="text-gray-600">Category management interface coming soon...</p>
              </div>
            )}
            {activeTab === 'orders' && (
              <div>
                <h3 className="font-bold text-lg mb-4">Orders Management</h3>
                <p className="text-gray-600">Orders management interface coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
