import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

const Dashboard = () => {
  const [stats, setStats] = useState({
    brands: 0,
    products: 0,
    messages: 0,
    unreadMessages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const auth = localStorage.getItem('admin_auth');
        const headers = {
          'Authorization': `Basic ${auth}`
        };

        const [brandsRes, productsRes, messagesRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/brands/all`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL}/products`),
          fetch(`${import.meta.env.VITE_API_URL}/messages`, { headers })
        ]);

        const brands = await brandsRes.json();
        const products = await productsRes.json();
        const messages = await messagesRes.json();

        setStats({
          brands: brands.length,
          products: products.length,
          messages: messages.length,
          unreadMessages: messages.filter(m => !m.read).length
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ icon, title, value, color, link }) => (
    <Link to={link} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`w-14 h-14 ${color} rounded-full flex items-center justify-center`}>
          <i className={`${icon} text-2xl text-white`}></i>
        </div>
      </div>
    </Link>
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Welcome back! Here's an overview of your website.</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon="ri-bookmark-line"
                title="Total Brands"
                value={stats.brands}
                color="bg-blue-500"
                link="/admin/brands"
              />
              <StatCard
                icon="ri-shopping-bag-line"
                title="Total Products"
                value={stats.products}
                color="bg-green-500"
                link="/admin/products"
              />
              <StatCard
                icon="ri-mail-line"
                title="Total Messages"
                value={stats.messages}
                color="bg-purple-500"
                link="/admin/messages"
              />
              <StatCard
                icon="ri-notification-line"
                title="Unread Messages"
                value={stats.unreadMessages}
                color="bg-red-500"
                link="/admin/messages"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <i className="ri-lightbulb-line text-xl mr-2 text-primary"></i>
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link
                    to="/admin/brands"
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <i className="ri-add-circle-line text-xl text-primary mr-3"></i>
                      <span className="font-medium text-gray-900">Add New Brand</span>
                    </div>
                    <i className="ri-arrow-right-line text-gray-400"></i>
                  </Link>
                  <Link
                    to="/admin/products"
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <i className="ri-add-circle-line text-xl text-primary mr-3"></i>
                      <span className="font-medium text-gray-900">Add New Product</span>
                    </div>
                    <i className="ri-arrow-right-line text-gray-400"></i>
                  </Link>
                  <Link
                    to="/admin/messages"
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <i className="ri-mail-open-line text-xl text-primary mr-3"></i>
                      <span className="font-medium text-gray-900">View Messages</span>
                    </div>
                    <i className="ri-arrow-right-line text-gray-400"></i>
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <i className="ri-information-line text-xl mr-2 text-primary"></i>
                  System Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Backend Status</span>
                    <span className="flex items-center text-green-600 font-medium">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Database</span>
                    <span className="text-gray-900 font-medium">MongoDB Atlas</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Last Login</span>
                    <span className="text-gray-900 font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start">
                <i className="ri-information-fill text-2xl text-blue-600 mr-4 mt-1"></i>
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">Getting Started Guide</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Manage your brand sections from the Brands page</li>
                    <li>• Add products and link them to brands from the Products page</li>
                    <li>• View customer inquiries in the Messages section</li>
                    <li>• Changes appear on the website immediately after saving</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
