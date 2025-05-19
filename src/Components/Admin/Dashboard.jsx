import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { FaBlog, FaAward, FaBars, FaTimes } from 'react-icons/fa';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate   = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen">
      {/* Hamburger toggle: fixed top-left, always above overlay */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white rounded-full shadow-lg"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        {open ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
      </button>

      {/* Drawer/Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white p-6 shadow-lg border-r border-gray-200
          transform transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:shadow-none
        `}
      >
        {/* Desktop header */}
        <div className="hidden md:flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>

        <nav className="space-y-1  lg:pt-0 pt-10">
          <NavLink
            to="blogs"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-colors
               ${isActive
                 ? 'bg-blue-100 text-blue-600'
                 : 'text-gray-700 hover:bg-gray-200'}`
            }
          >
            <FaBlog className="text-lg" />
            <span>Blogs</span>
          </NavLink>

          <NavLink
            to="airdrops"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-colors
               ${isActive
                 ? 'bg-blue-100 text-blue-600'
                 : 'text-gray-700 hover:bg-gray-200'}`
            }
          >
            <FaAward className="text-lg" />
            <span>Airdrops</span>
          </NavLink>

          {/* Mobile logout */}
          <button
            onClick={handleLogout}
            className="md:hidden w-full text-left mt-6 text-red-500 hover:underline"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Backdrop behind drawer on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 md:ml-64 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
