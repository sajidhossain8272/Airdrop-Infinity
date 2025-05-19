import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth }                     from '../../auth/AuthContext';
import { FaBlog, FaAward }             from 'react-icons/fa';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate   = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white h-screen p-6 shadow-lg border-r border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>

        <nav className="space-y-4">
          <NavLink
            to="blogs"
            className={({ isActive }) =>
              `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <FaBlog className="text-lg" />
            <span>Blogs</span>
          </NavLink>

          <NavLink
            to="airdrops"
            className={({ isActive }) =>
              `w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <FaAward className="text-lg" />
            <span>Airdrops</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* this is where BlogAdmin, AdminAirdropList, Edit/New forms will render */}
        <Outlet />
      </main>
    </div>
  );
}
