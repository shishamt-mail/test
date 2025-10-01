import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortLabel, setSortLabel] = useState('Default');
  const sortRef = useRef(null);
  const btnRef = useRef(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const handleOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };

    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, []);

  // Sort products by moving DOM nodes (keeps simple static markup without converting to stateful list)
  const sortProducts = (value) => {
    const products = Array.from(document.querySelectorAll('.product-card'));
    const container = document.querySelector('.grid');
    if (!container || !products.length) return;

    // Remove all products
    products.forEach(p => p.remove());

    // Sort products
    let sorted = [...products];
    switch(value) {
      case 'newest':
        sorted.sort((a, b) => parseInt(b.dataset.dateTs) - parseInt(a.dataset.dateTs));
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.querySelector('h3').textContent.localeCompare(a.querySelector('h3').textContent));
        break;
      case 'default':
      default:
        // keep original order - assume markup order is desired
        break;
    }

    // Reattach sorted products
    sorted.forEach(p => container.appendChild(p));
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
    // The dropdown is handled by React state/refs below. Keep this effect for
    // wiring up search only.

  // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const products = document.querySelectorAll('.product-card');
        let visibleCount = 0;

        products.forEach(card => {
          const title = card.querySelector('h3').textContent.toLowerCase();
          const brand = card.dataset.brand.toLowerCase();
          const matches = title.includes(searchTerm) || brand.includes(searchTerm);
          
          if (matches) {
            card.style.display = '';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        // Update count
        const countDisplay = document.getElementById('productCount');
        if (countDisplay) {
          countDisplay.textContent = `Showing ${visibleCount} product${visibleCount !== 1 ? 's' : ''}`;
        }
      });
    }

    // Previously filters were wired via DOM listeners; filtering is handled
    // reactively below when `selectedBrand` or `selectedCategory` change.
  }, []);

  // Apply filters whenever selectedBrand or selectedCategory changes
  useEffect(() => {
    const products = document.querySelectorAll('.product-card');
    let visibleCount = 0;

    products.forEach(card => {
      const matchesBrand = selectedBrand === 'all' || card.dataset.brand === selectedBrand;
      const matchesCategory = selectedCategory === 'all' || card.dataset.category === selectedCategory;

      if (matchesBrand && matchesCategory) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const countDisplay = document.getElementById('productCount');
    if (countDisplay) {
      countDisplay.textContent = `Showing ${visibleCount} product${visibleCount !== 1 ? 's' : ''}`;
    }
  }, [selectedBrand, selectedCategory]);

  // Close filters on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setFiltersOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

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
                id="searchInput" 
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
          {/* Desktop sidebar - hidden on small screens */}
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
                    <label className="flex items-center">
                      <input checked={selectedBrand === 'best'} onChange={() => setSelectedBrand('best')} type="radio" name="brand" value="best" className="text-primary focus:ring-primary" />
                      <span className="ml-3 text-sm text-gray-700">BEST</span>
                    </label>
                    <label className="flex items-center">
                      <input checked={selectedBrand === 'walkaroo'} onChange={() => setSelectedBrand('walkaroo')} type="radio" name="brand" value="walkaroo" className="text-primary focus:ring-primary" />
                      <span className="ml-3 text-sm text-gray-700">Walkaroo</span>
                    </label>
                    <label className="flex items-center">
                      <input checked={selectedBrand === 'action'} onChange={() => setSelectedBrand('action')} type="radio" name="brand" value="action" className="text-primary focus:ring-primary" />
                      <span className="ml-3 text-sm text-gray-700">Action</span>
                    </label>
                    <label className="flex items-center">
                      <input checked={selectedBrand === 'brilliant'} onChange={() => setSelectedBrand('brilliant')} type="radio" name="brand" value="brilliant" className="text-primary focus:ring-primary" />
                      <span className="ml-3 text-sm text-gray-700">Brilliant</span>
                    </label>
                    <label className="flex items-center">
                      <input checked={selectedBrand === 'chinese'} onChange={() => setSelectedBrand('chinese')} type="radio" name="brand" value="chinese" className="text-primary focus:ring-primary" />
                      <span className="ml-3 text-sm text-gray-700">Chinese</span>
                    </label>
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
                {/* Mobile filter button - visible only on small screens */}
                <button onClick={() => setFiltersOpen(true)} className="lg:hidden inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  <i className="ri-filter-line"></i>
                  <span>Filters</span>
                </button>
                <p id="productCount" className="text-gray-600">Showing all products</p>
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
              <Link to="/product" className="product-card bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300" data-brand="best" data-category="mens" data-date="2024-12-15T00:00:00Z" data-date-ts="1734038400000">
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-secondary text-white px-2 py-1 rounded text-xs font-medium">BEST</span>
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <img src="https://readdy.ai/api/search-image?query=Premium%20black%20leather%20comfort%20PU%20slippers%20for%20men%2C%20professional%20footwear%2C%20clean%20white%20background%2C%20product%20photography%2C%20modern%20minimalist%20style%2C%20high%20quality%20materials%2C%20comfortable%20design&width=300&height=300&seq=1&orientation=squarish"
                      alt="Premium Comfort PU Slippers" className="product-image w-full h-full object-cover object-top" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-secondary mb-1">Premium Comfort PU Slippers</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-orange-400">
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/product" className="product-card bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300" data-brand="action" data-category="womens" data-date="2024-12-20T00:00:00Z" data-date-ts="1734470400000">
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">Action</span>
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <img src="https://readdy.ai/api/search-image?query=Womens%20black%20EVA%20casual%20footwear%2C%20lightweight%20comfortable%20shoes%2C%20modern%20design%2C%20clean%20white%20background%2C%20product%20photography%2C%20sleek%20minimalist%20style%2C%20durable%20materials&width=300&height=300&seq=2&orientation=squarish"
                      alt="Women's EVA Casual Footwear" className="product-image w-full h-full object-cover object-top" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-secondary mb-1">Women's EVA Casual Footwear</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-orange-400">
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/product" className="product-card bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300" data-brand="brilliant" data-category="kids" data-date="2024-12-25T00:00:00Z" data-date-ts="1734902400000">
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">Brilliant</span>
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <img src="https://readdy.ai/api/search-image?query=Kids%20premium%20colorful%20sneakers%2C%20childrens%20athletic%20footwear%2C%20vibrant%20colors%2C%20comfortable%20design%2C%20clean%20white%20background%2C%20product%20photography%2C%20modern%20style%2C%20high%20quality%20materials&width=300&height=300&seq=3&orientation=squarish"
                      alt="Kids Premium Sneakers" className="product-image w-full h-full object-cover object-top" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-secondary mb-1">Kids Premium Sneakers</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-orange-400">
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/product" className="product-card bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300" data-brand="chinese" data-category="unisex" data-date="2024-12-10T00:00:00Z" data-date-ts="1733606400000">
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-medium">Chinese</span>
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <img src="https://readdy.ai/api/search-image?query=Summer%20flip-flops%20colorful%20beach%20sandals%2C%20casual%20footwear%2C%20bright%20tropical%20colors%2C%20comfortable%20design%2C%20clean%20white%20background%2C%20product%20photography%2C%20modern%20style%2C%20lightweight%20materials&width=300&height=300&seq=4&orientation=squarish"
                      alt="Summer Flip-Flops" className="product-image w-full h-full object-cover object-top" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-secondary mb-1">Summer Flip-Flops</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-orange-400">
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/product" className="product-card bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300" data-brand="walkaroo" data-category="mens" data-date="2024-12-05T00:00:00Z" data-date-ts="1733174400000">
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">Walkaroo</span>
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <img src="https://readdy.ai/api/search-image?query=Mens%20formal%20leather%20dress%20shoes%2C%20professional%20business%20footwear%2C%20classic%20black%20design%2C%20clean%20white%20background%2C%20product%20photography%2C%20elegant%20style%2C%20premium%20materials%2C%20sophisticated%20look&width=300&height=300&seq=5&orientation=squarish"
                      alt="Men's Formal Leather Shoes" className="product-image w-full h-full object-cover object-top" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-secondary mb-1">Men's Formal Leather Shoes</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-orange-400">
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-line text-sm"></i>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/product" className="product-card bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300" data-brand="best" data-category="womens" data-date="2024-12-28T00:00:00Z" data-date-ts="1735161600000">
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-secondary text-white px-2 py-1 rounded text-xs font-medium">BEST</span>
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <img src="https://readdy.ai/api/search-image?query=Womens%20athletic%20running%20shoes%2C%20sports%20footwear%2C%20modern%20design%2C%20breathable%20materials%2C%20clean%20white%20background%2C%20product%20photography%2C%20performance%20style%2C%20comfortable%20fit&width=300&height=300&seq=6&orientation=squarish"
                      alt="Women's Athletic Running Shoes" className="product-image w-full h-full object-cover object-top" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-secondary mb-1">Women's Athletic Running Shoes</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-orange-400">
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-half-line text-sm"></i>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/product" className="product-card bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300" data-brand="action" data-category="kids" data-date="2024-12-18T00:00:00Z" data-date-ts="1734297600000">
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">Action</span>
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <img src="https://readdy.ai/api/search-image?query=Kids%20school%20shoes%20black%20leather%2C%20childrens%20formal%20footwear%2C%20durable%20construction%2C%20clean%20white%20background%2C%20product%20photography%2C%20classic%20style%2C%20comfortable%20design%20for%20daily%20wear&width=300&height=300&seq=7&orientation=squarish"
                      alt="Kids School Shoes" className="product-image w-full h-full object-cover object-top" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-secondary mb-1">Kids School Shoes</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-orange-400">
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/product" className="product-card bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300" data-brand="brilliant" data-category="mens" data-date="2024-12-22T00:00:00Z" data-date-ts="1734643200000">
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">Brilliant</span>
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <img src="https://readdy.ai/api/search-image?query=Mens%20casual%20canvas%20sneakers%2C%20comfortable%20everyday%20footwear%2C%20modern%20design%2C%20versatile%20style%2C%20clean%20white%20background%2C%20product%20photography%2C%20trendy%20look%2C%20durable%20materials&width=300&height=300&seq=8&orientation=squarish"
                      alt="Men's Casual Canvas Sneakers" className="product-image w-full h-full object-cover object-top" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-secondary mb-1">Men's Casual Canvas Sneakers</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-orange-400">
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-fill text-sm"></i>
                      <i className="ri-star-line text-sm"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {/* Mobile Filters Drawer */}
            <div className={`fixed inset-0 z-40 lg:hidden ${filtersOpen ? '' : 'pointer-events-none'}`} aria-hidden={!filtersOpen}>
              {/* Overlay */}
              <div onClick={() => setFiltersOpen(false)} className={`absolute inset-0 bg-black transition-opacity ${filtersOpen ? 'opacity-40' : 'opacity-0'}`}></div>

              {/* Panel */}
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
                      <label className="flex items-center">
                        <input checked={selectedBrand === 'best'} onChange={() => setSelectedBrand('best')} type="radio" name="brand-mobile" value="best" className="text-primary focus:ring-primary" />
                        <span className="ml-3 text-sm text-gray-700">BEST</span>
                      </label>
                      <label className="flex items-center">
                        <input checked={selectedBrand === 'walkaroo'} onChange={() => setSelectedBrand('walkaroo')} type="radio" name="brand-mobile" value="walkaroo" className="text-primary focus:ring-primary" />
                        <span className="ml-3 text-sm text-gray-700">Walkaroo</span>
                      </label>
                      <label className="flex items-center">
                        <input checked={selectedBrand === 'action'} onChange={() => setSelectedBrand('action')} type="radio" name="brand-mobile" value="action" className="text-primary focus:ring-primary" />
                        <span className="ml-3 text-sm text-gray-700">Action</span>
                      </label>
                      <label className="flex items-center">
                        <input checked={selectedBrand === 'brilliant'} onChange={() => setSelectedBrand('brilliant')} type="radio" name="brand-mobile" value="brilliant" className="text-primary focus:ring-primary" />
                        <span className="ml-3 text-sm text-gray-700">Brilliant</span>
                      </label>
                      <label className="flex items-center">
                        <input checked={selectedBrand === 'chinese'} onChange={() => setSelectedBrand('chinese')} type="radio" name="brand-mobile" value="chinese" className="text-primary focus:ring-primary" />
                        <span className="ml-3 text-sm text-gray-700">Chinese</span>
                      </label>
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