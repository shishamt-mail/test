import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    const user = localStorage.getItem('admin_username');
    if (!auth) {
      navigate('/admin/login');
    } else {
      setUsername(user || 'Admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    localStorage.removeItem('admin_username');
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <i className="ri-menu-line text-xl"></i>
              </button>
              <div className="flex items-center">
                <i className="ri-admin-fill text-2xl text-primary mr-3"></i>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/"
                target="_blank"
                className="hidden sm:flex items-center text-sm text-gray-600 hover:text-primary"
              >
                <i className="ri-external-link-line mr-1"></i>
                View Site
              </Link>
              <div className="flex items-center space-x-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{username}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <i className="ri-logout-box-line text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block fixed lg:sticky top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-y-auto`}>
          <nav className="p-4 space-y-1">
            <Link
              to="/admin/dashboard"
              className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive('/admin/dashboard')
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <i className="ri-dashboard-line text-xl mr-3"></i>
              Dashboard
            </Link>

            <Link
              to="/admin/brands"
              className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive('/admin/brands')
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <i className="ri-bookmark-line text-xl mr-3"></i>
              Brands
            </Link>

            <Link
              to="/admin/products"
              className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive('/admin/products')
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <i className="ri-shopping-bag-line text-xl mr-3"></i>
              Products
            </Link>

            <Link
              to="/admin/messages"
              className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive('/admin/messages')
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <i className="ri-mail-line text-xl mr-3"></i>
              Messages
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0 ml-0">
          {children}
        </main>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;
