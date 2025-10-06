import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI, brandsAPI } from '../services/api';

const SearchPage = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortLabel, setSortLabel] = useState('Default');
  const sortRef = useRef(null);
  const btnRef = useRef(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, brandsData] = await Promise.all([
          productsAPI.getAll(),
          brandsAPI.getAll()
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setBrands(brandsData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };

    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedBrand !== 'all') {
      filtered = filtered.filter(p => p.brand === selectedBrand);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedBrand, selectedCategory, searchTerm, products]);

  const sortProducts = (value) => {
    let sorted = [...filteredProducts];
    switch(value) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'default':
      default:
        break;
    }
    setFilteredProducts(sorted);
  };

  const handleToggleSort = (e) => {
    e.stopPropagation();
    setSortOpen(v => !v);
  };

  const handleSortOption = (value, text) => {
    setSortLabel(text);
    setSortOpen(false);
    sortProducts(value);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setFiltersOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const getBrandColor = (brandSlug) => {
    const brand = brands.find(b => b.slug === brandSlug);
    const colors = {
      'best': 'bg-secondary',
      'walkaroo': 'bg-purple-600',
      'action': 'bg-blue-600',
      'brilliant': 'bg-green-600',
      'chinese': 'bg-orange-600'
    };
    return colors[brandSlug] || 'bg-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our complete collection of premium footwear from all brands</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Search products, brands..."
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-full lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Brand</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input checked={selectedBrand === 'all'} onChange={() => setSelectedBrand('all')} type="radio" name="brand" value="all" className="text-primary focus:ring-primary" />
                      <span className="ml-3 text-sm text-gray-700">All</span>
                    </label>
                    {brands.map((brand) => (
                      <label key={brand._id} className="flex items-center">
                        <input checked={selectedBrand === brand.slug} onChange={() => setSelectedBrand(brand.slug)} type="radio" name="brand" value={brand.slug} className="text-primary focus:ring-primary" />
                        <span className="ml-3 text-sm text-gray-700">{brand.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Category</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input checked={selectedCategory === 'all'} onChange={() => setSelectedCategory('all')} type="radio" name="category" value="all" className="text-primary focus:ring-primary" />
                      <span className="ml-3 text-sm text-gray-700">All</span>
                    </label>
                    <label className="flex items-center">
                      <input checked={selectedCategory === 'kids'} onChange={() => setSelectedCategory('kids')} type="radio" name="category" value="kids" className="text-primary focus:ring-primary" />
                      <span className="ml-3 text-sm text-gray-700">Kids</span>
                    </label>
                    <label className="flex items-center">
                      <input checked={selectedCategory === 'mens'} onChange={() => setSelectedCategory('mens')} type="radio" name="category" value="mens" className="text-primary focus:ring-primary" />
                      <span className="ml-3 text-sm text-gray-700">Men's</span>
                    </label>
                    <label className="flex items-center">
                      <input checked={selectedCategory === 'womens'} onChange={() => setSelectedCategory('womens')} type="radio" name="category" value="womens" className="text-primary focus:ring-primary" />
                      <span className="ml-3 text-sm text-gray-700">Women's</span>
                    </label>
                    <label className="flex items-center">
                      <input checked={selectedCategory === 'unisex'} onChange={() => setSelectedCategory('unisex')} type="radio" name="category" value="unisex" className="text-primary focus:ring-primary" />
                      <span className="ml-3 text-sm text-gray-700">Unisex</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <button onClick={() => setFiltersOpen(true)} className="lg:hidden inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  <i className="ri-filter-line"></i>
                  <span>Filters</span>
                </button>
                <p className="text-gray-600">
                  {loading ? 'Loading...' : `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
                </p>
              </div>
              <div className="relative">
                <button ref={btnRef} onClick={handleToggleSort} className="sort-dropdown-btn px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary inline-flex items-center gap-2">
                  <span className="sort-text">{sortLabel}</span>
                  <i className="ri-arrow-down-s-line"></i>
                </button>
                <div ref={sortRef} className={`sort-dropdown transition-all duration-150 absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 ${sortOpen ? 'block opacity-100' : 'invisible opacity-0 pointer-events-none'}`}>
                  <button onClick={() => handleSortOption('default', 'Default')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Default</button>
                  <button onClick={() => handleSortOption('newest', 'Newest First')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Newest First</button>
                  <button onClick={() => handleSortOption('name-asc', 'Name (A to Z)')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Name (A to Z)</button>
                  <button onClick={() => handleSortOption('name-desc', 'Name (Z to A)')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Name (Z to A)</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600">Loading products...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600">No products found</p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <Link key={product._id} to={`/product/${product._id}`} className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300">
                    <div className="relative">
                      <div className="absolute top-3 left-3 z-10">
                        <span className={`${getBrandColor(product.brand)} text-white px-2 py-1 rounded text-xs font-medium`}>
                          {brands.find(b => b.slug === product.brand)?.name || product.brand}
                        </span>
                      </div>
                      <div className="aspect-square overflow-hidden">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-top" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-secondary mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>

            <div className={`fixed inset-0 z-40 lg:hidden ${filtersOpen ? '' : 'pointer-events-none'}`} aria-hidden={!filtersOpen}>
              <div onClick={() => setFiltersOpen(false)} className={`absolute inset-0 bg-black transition-opacity ${filtersOpen ? 'opacity-40' : 'opacity-0'}`}></div>

              <div className={`absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl transform transition-transform ${filtersOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex items-center justify-between border-b">
                  <h3 className="text-lg font-medium">Filters</h3>
                  <button onClick={() => setFiltersOpen(false)} className="p-2 rounded-md hover:bg-gray-100">
                    <i className="ri-close-line"></i>
                  </button>
                </div>
                <div className="p-4 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Brand</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input checked={selectedBrand === 'all'} onChange={() => setSelectedBrand('all')} type="radio" name="brand-mobile" value="all" className="text-primary focus:ring-primary" />
                        <span className="ml-3 text-sm text-gray-700">All</span>
                      </label>
                      {brands.map((brand) => (
                        <label key={brand._id} className="flex items-center">
                          <input checked={selectedBrand === brand.slug} onChange={() => setSelectedBrand(brand.slug)} type="radio" name="brand-mobile" value={brand.slug} className="text-primary focus:ring-primary" />
                          <span className="ml-3 text-sm text-gray-700">{brand.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Category</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input checked={selectedCategory === 'all'} onChange={() => setSelectedCategory('all')} type="radio" name="category-mobile" value="all" className="text-primary focus:ring-primary" />
                        <span className="ml-3 text-sm text-gray-700">All</span>
                      </label>
                      <label className="flex items-center">
                        <input checked={selectedCategory === 'kids'} onChange={() => setSelectedCategory('kids')} type="radio" name="category-mobile" value="kids" className="text-primary focus:ring-primary" />
                        <span className="ml-3 text-sm text-gray-700">Kids</span>
                      </label>
                      <label className="flex items-center">
                        <input checked={selectedCategory === 'mens'} onChange={() => setSelectedCategory('mens')} type="radio" name="category-mobile" value="mens" className="text-primary focus:ring-primary" />
                        <span className="ml-3 text-sm text-gray-700">Men's</span>
                      </label>
                      <label className="flex items-center">
                        <input checked={selectedCategory === 'womens'} onChange={() => setSelectedCategory('womens')} type="radio" name="category-mobile" value="womens" className="text-primary focus:ring-primary" />
                        <span className="ml-3 text-sm text-gray-700">Women's</span>
                      </label>
                      <label className="flex items-center">
                        <input checked={selectedCategory === 'unisex'} onChange={() => setSelectedCategory('unisex')} type="radio" name="category-mobile" value="unisex" className="text-primary focus:ring-primary" />
                        <span className="ml-3 text-sm text-gray-700">Unisex</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
