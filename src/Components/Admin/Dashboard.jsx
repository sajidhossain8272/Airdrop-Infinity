// Dashboard.jsx
import { useState } from 'react';
import { FaBox, FaBlog, FaAward } from 'react-icons/fa';
import BlogAdmin from './BlogAdmin';
import ProductAdmin from './ProductAdmin';
import AdminAirdropList from './AdminAirdropList';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('products');

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white h-screen p-6 shadow-lg border-r border-gray-200">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Admin Dashboard</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveSection('products')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              activeSection === 'products'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaBox className="text-lg" />
            <span>Products</span>
          </button>
          <button
            onClick={() => setActiveSection('blogs')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              activeSection === 'blogs'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaBlog className="text-lg" />
            <span>Blogs</span>
          </button>
          <button
            onClick={() => setActiveSection('airdrops')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              activeSection === 'airdrops'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaAward className="text-lg" />
            <span>Airdrops</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {activeSection === 'products' ? (
          <ProductAdmin />
        ) : activeSection === 'blogs' ? (
          <BlogAdmin />
        ) : activeSection === 'airdrops' ? (
          <AdminAirdropList />
        ) : null}
      </main>
    </div>
  );
};

export default Dashboard;
