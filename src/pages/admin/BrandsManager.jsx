import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const BrandsManager = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    logo_url: '',
    banner_url: '',
    description: '',
    visible: true,
    in_navbar: true,
    order: 1
  });

  const fetchBrands = async () => {
    try {
      const auth = localStorage.getItem('admin_auth');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/brands/all`, {
        headers: { 'Authorization': `Basic ${auth}` }
      });
      const data = await response.json();
      setBrands(data.sort((a, b) => a.order - b.order));
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch brands:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setFormData(prev => ({ ...prev, name, slug }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = localStorage.getItem('admin_auth');

    try {
      const url = editingBrand
        ? `${import.meta.env.VITE_API_URL}/brands/${editingBrand._id}`
        : `${import.meta.env.VITE_API_URL}/brands`;

      const response = await fetch(url, {
        method: editingBrand ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        },
        body: JSON.stringify({
          ...formData,
          order: parseInt(formData.order)
        })
      });

      if (response.ok) {
        alert(editingBrand ? 'Brand updated successfully!' : 'Brand created successfully!');
        setShowModal(false);
        resetForm();
        fetchBrands();
      } else {
        const errorData = await response.json();
        console.error('Failed to save brand:', response.status, errorData);
        alert(`Failed to save brand: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving brand:', error);
      alert(`Error saving brand: ${error.message}`);
    }
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      slug: brand.slug,
      logo_url: brand.logo_url,
      banner_url: brand.banner_url,
      description: brand.description,
      visible: brand.visible,
      in_navbar: brand.in_navbar,
      order: brand.order
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this brand? This cannot be undone.')) return;

    const auth = localStorage.getItem('admin_auth');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/brands/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Basic ${auth}` }
      });

      if (response.ok) {
        alert('Brand deleted successfully!');
        fetchBrands();
      } else {
        alert('Failed to delete brand');
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
      alert('Error deleting brand');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      logo_url: '',
      banner_url: '',
      description: '',
      visible: true,
      in_navbar: true,
      order: brands.length + 1
    });
    setEditingBrand(null);
  };

  const openAddModal = () => {
    resetForm();
    setFormData(prev => ({ ...prev, order: brands.length + 1 }));
    setShowModal(true);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Brand Management</h2>
            <p className="text-gray-600">Manage your brand sections and navbar items</p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center"
          >
            <i className="ri-add-line text-xl mr-2"></i>
            Add Brand
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Navbar</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {brands.map((brand) => (
                    <tr key={brand._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium">
                          {brand.order}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img src={brand.logo_url} alt={brand.name} className="w-12 h-8 object-contain mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">{brand.name}</div>
                            <div className="text-sm text-gray-500">{brand.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          brand.visible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {brand.visible ? 'Visible' : 'Hidden'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          brand.in_navbar ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {brand.in_navbar ? (brand.order <= 5 ? 'Direct' : 'More') : 'Not in Navbar'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEdit(brand)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <i className="ri-edit-line text-lg"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(brand._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <i className="ri-delete-bin-line text-lg"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingBrand ? 'Edit Brand' : 'Add New Brand'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., BEST Collection"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug (auto-generated)</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="best-collection"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL *</label>
                <input
                  type="url"
                  name="logo_url"
                  value={formData.logo_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/logo.png"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 150x50px</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Banner URL *</label>
                <input
                  type="url"
                  name="banner_url"
                  value={formData.banner_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/banner.jpg"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 1200x400px</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Brief description of the brand"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Display Order *</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Order 1-5 appear directly in navbar, 6+ in "More" dropdown</p>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="visible"
                    checked={formData.visible}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">Visible on website</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="in_navbar"
                    checked={formData.in_navbar}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">Show in navigation</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-700"
                >
                  {editingBrand ? 'Update Brand' : 'Create Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default BrandsManager;
