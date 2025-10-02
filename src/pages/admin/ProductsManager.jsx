import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterBrand, setFilterBrand] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'mens',
    description: '',
    images: [''],
    sizes: '',
    status: 'available',
    featured: false
  });

  const fetchData = async () => {
    try {
      const auth = localStorage.getItem('admin_auth');
      const [productsRes, brandsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/products`),
        fetch(`${import.meta.env.VITE_API_URL}/brands/all`, {
          headers: { 'Authorization': `Basic ${auth}` }
        })
      ]);

      const productsData = await productsRes.json();
      const brandsData = await brandsRes.json();

      setProducts(productsData);
      setBrands(brandsData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, images: newImages }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = localStorage.getItem('admin_auth');

    const sizesArray = formData.sizes.split(',').map(s => s.trim()).filter(s => s);
    const imagesArray = formData.images.filter(img => img.trim() !== '');

    try {
      const url = editingProduct
        ? `${import.meta.env.VITE_API_URL}/products/${editingProduct._id}`
        : `${import.meta.env.VITE_API_URL}/products`;

      const response = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        },
        body: JSON.stringify({
          ...formData,
          images: imagesArray,
          sizes: sizesArray
        })
      });

      if (response.ok) {
        alert(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
        setShowModal(false);
        resetForm();
        fetchData();
      } else {
        alert('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      category: product.category,
      description: product.description,
      images: product.images.length > 0 ? product.images : [''],
      sizes: product.sizes.join(', '),
      status: product.status,
      featured: product.featured
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product? This cannot be undone.')) return;

    const auth = localStorage.getItem('admin_auth');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Basic ${auth}` }
      });

      if (response.ok) {
        alert('Product deleted successfully!');
        fetchData();
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: brands[0]?.slug || '',
      category: 'mens',
      description: '',
      images: [''],
      sizes: '',
      status: 'available',
      featured: false
    });
    setEditingProduct(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const filteredProducts = filterBrand === 'all'
    ? products
    : products.filter(p => p.brand === filterBrand);

  const getStatusBadge = (status) => {
    const styles = {
      available: 'bg-green-100 text-green-800',
      coming_soon: 'bg-yellow-100 text-yellow-800',
      hidden: 'bg-red-100 text-red-800'
    };
    const labels = {
      available: 'Available',
      coming_soon: 'Coming Soon',
      hidden: 'Hidden'
    };
    return { style: styles[status], label: labels[status] };
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h2>
            <p className="text-gray-600">Manage your product catalog</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Brands</option>
              {brands.map(brand => (
                <option key={brand._id} value={brand.slug}>{brand.name}</option>
              ))}
            </select>
            <button
              onClick={openAddModal}
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center whitespace-nowrap"
            >
              <i className="ri-add-line text-xl mr-2"></i>
              Add Product
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const badge = getStatusBadge(product.status);
              return (
                <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${badge.style}`}>
                        {badge.label}
                      </span>
                    </div>
                    {product.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-blue-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{brands.find(b => b.slug === product.brand)?.name}</p>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span className="capitalize">{product.category}</span>
                      <span>{product.sizes?.length || 0} sizes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-600">No products found</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full my-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., Premium Running Shoes"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">Select a brand</option>
                    {brands.map(brand => (
                      <option key={brand._id} value={brand.slug}>{brand.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="mens">Men's</option>
                    <option value="womens">Women's</option>
                    <option value="kids">Kids</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="available">Available</option>
                    <option value="coming_soon">Coming Soon</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Brief description of the product"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Images *</label>
                {formData.images.map((img, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={img}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://example.com/product-image.jpg"
                      required
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-sm text-primary hover:text-red-700 font-medium"
                >
                  + Add Another Image
                </button>
                <p className="text-xs text-gray-500 mt-1">Recommended: 600x600px. First image is primary.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes *</label>
                <input
                  type="text"
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., 7, 8, 9, 10, 11"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Separate sizes with commas</p>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">Featured product (highlight on homepage)</span>
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
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ProductsManager;
