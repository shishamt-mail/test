import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productsAPI, brandsAPI } from '../services/api';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const productData = await productsAPI.getById(id);
        setProduct(productData);

        const brandsData = await brandsAPI.getAll();
        const productBrand = brandsData.find(b => b.slug === productData.brand);
        setBrand(productBrand);

        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <Link to="/search" className="text-primary hover:text-red-700">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQty = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const getCategoryDisplay = (category) => {
    const categories = {
      mens: "Men's",
      womens: "Women's",
      kids: "Kids",
      unisex: "Unisex"
    };
    return categories[category] || category;
  };

  return (
    <main className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/search" className="hover:text-primary transition-colors">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
          <Link to="/search" className="inline-flex items-center text-sm text-primary hover:text-red-700 font-medium transition-colors duration-200">
            <i className="ri-arrow-left-line mr-2"></i>
            Back to All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="product-gallery">
            <div className="main-image-container mb-4">
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110 cursor-zoom-in"
                />
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="thumbnails grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-lg bg-gray-100 aspect-square border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-gray-200 hover:border-primary'
                    }`}
                  >
                    <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-details">
            {brand && (
              <div className="mb-4">
                <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                  {brand.name}
                </span>
              </div>
            )}

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <div className="mb-6">
              <span className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${
                product.category === 'mens' ? 'bg-blue-100 text-blue-800' :
                product.category === 'womens' ? 'bg-pink-100 text-pink-800' :
                product.category === 'kids' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {getCategoryDisplay(product.category)}
              </span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`border rounded text-sm py-2 px-3 transition-colors ${
                        selectedSize === size
                          ? 'bg-primary text-white border-primary'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={decreaseQty}
                  className="w-10 h-10 border border-gray-300 rounded-l flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <i className="ri-subtract-line text-sm"></i>
                </button>
                <input
                  type="text"
                  value={quantity}
                  className="w-16 h-10 border-t border-b border-gray-300 text-center text-sm focus:outline-none"
                  readOnly
                />
                <button
                  onClick={increaseQty}
                  className="w-10 h-10 border border-gray-300 rounded-r flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <i className="ri-add-line text-sm"></i>
                </button>
              </div>
            </div>

            <div className="flex space-x-4 mb-8">
              <Link
                to="/contact"
                className="flex-1 bg-primary text-white py-3 px-6 rounded-button font-medium hover:bg-red-700 transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-center"
              >
                Contact Us
              </Link>
              <Link
                to="/search"
                className="flex-1 border-2 border-primary text-primary py-3 px-6 rounded-button font-medium hover:bg-primary hover:text-white transition-all duration-300 whitespace-nowrap text-center"
              >
                Explore More
              </Link>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-truck-line"></i>
                  </div>
                  <span>Free shipping available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-arrow-go-back-line"></i>
                  </div>
                  <span>30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Description
              </button>
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
