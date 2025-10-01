import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  useEffect(() => {
    // Gallery functionality
    const mainImage = document.getElementById('mainImage');
    const thumbnailBtns = document.querySelectorAll('.thumbnail-btn');
    thumbnailBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const newImageSrc = this.getAttribute('data-image');
        thumbnailBtns.forEach(b => {
          b.classList.remove('active', 'border-primary');
          b.classList.add('border-gray-200');
        });
        this.classList.add('active', 'border-primary');
        this.classList.remove('border-gray-200');
        mainImage.style.opacity = '0';
        setTimeout(() => {
          mainImage.src = newImageSrc;
          mainImage.style.opacity = '1';
        }, 150);
      });
    });

    // Size selection
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        sizeBtns.forEach(b => {
          b.classList.remove('active', 'bg-primary', 'text-white');
          b.classList.add('border-gray-300');
        });
        this.classList.add('active', 'bg-primary', 'text-white');
        this.classList.remove('border-gray-300');
      });
    });

    // Quantity controls
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('quantity');
    decreaseBtn.addEventListener('click', function() {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
    increaseBtn.addEventListener('click', function() {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
      }
    });

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        tabBtns.forEach(b => {
          b.classList.remove('active', 'border-primary', 'text-primary');
          b.classList.add('border-transparent', 'text-gray-500');
        });
        this.classList.add('active', 'border-primary', 'text-primary');
        this.classList.remove('border-transparent', 'text-gray-500');
        tabContents.forEach(content => {
          content.classList.add('hidden');
          content.classList.remove('active');
        });
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
          targetContent.classList.remove('hidden');
          targetContent.classList.add('active');
        }
      });
    });

    // Button animations
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 150);
      });
    });

    // Mobile menu is handled in the Navigation component via React state.

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    document.querySelectorAll('.animate-fade-in').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      const handleAnchorClick = function(e) {
        const href = this.getAttribute('href');
        const isHashLink = href && href.startsWith('#');
        if (!isHashLink) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      // nothing to cleanup for mobile menu here
      observer.disconnect();
    };
  }, []);

  return (
    <main className="pt-16">
      <div id="brand-1"></div>
      <div id="brand-2"></div>
      <div id="brand-3"></div>
      <div id="brand-4"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/search?category=mens" className="hover:text-primary transition-colors">Men's Shoes</Link>
            <span>/</span>
            <span className="text-gray-900">Premium Running Shoes</span>
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
                <img id="mainImage" src="https://readdy.ai/api/search-image?query=premium%20white%20and%20red%20running%20shoes%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20side%20view%2C%20athletic%20footwear%20with%20modern%20design%2C%20minimalist%20studio%20lighting%2C%20high%20quality%20commercial%20photo&width=600&height=600&seq=main1&orientation=squarish"
                  alt="Premium Running Shoes" className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110 cursor-zoom-in" />
              </div>
            </div>
            <div className="thumbnails grid grid-cols-4 gap-3">
              <button className="thumbnail-btn active relative overflow-hidden rounded-lg bg-gray-100 aspect-square border-2 border-primary" data-image="https://readdy.ai/api/search-image?query=premium%20white%20and%20red%20running%20shoes%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20side%20view%2C%20athletic%20footwear%20with%20modern%20design%2C%20minimalist%20studio%20lighting%2C%20high%20quality%20commercial%20photo&width=600&height=600&seq=main1&orientation=squarish">
                <img src="https://readdy.ai/api/search-image?query=premium%20white%20and%20red%20running%20shoes%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20side%20view%2C%20athletic%20footwear%20with%20modern%20design%2C%20minimalist%20studio%20lighting%2C%20high%20quality%20commercial%20photo&width=150&height=150&seq=thumb1&orientation=squarish" alt="Side view" className="w-full h-full object-cover" />
              </button>
              <button className="thumbnail-btn relative overflow-hidden rounded-lg bg-gray-100 aspect-square border-2 border-gray-200 hover:border-primary transition-colors" data-image="https://readdy.ai/api/search-image?query=premium%20white%20and%20red%20running%20shoes%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20front%20view%2C%20athletic%20footwear%20with%20modern%20design%2C%20minimalist%20studio%20lighting%2C%20high%20quality%20commercial%20photo&width=600&height=600&seq=main2&orientation=squarish">
                <img src="https://readdy.ai/api/search-image?query=premium%20white%20and%20red%20running%20shoes%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20front%20view%2C%20athletic%20footwear%20with%20modern%20design%2C%20minimalist%20studio%20lighting%2C%20high%20quality%20commercial%20photo&width=150&height=150&seq=thumb2&orientation=squarish" alt="Front view" className="w-full h-full object-cover" />
              </button>
              <button className="thumbnail-btn relative overflow-hidden rounded-lg bg-gray-100 aspect-square border-2 border-gray-200 hover:border-primary transition-colors" data-image="https://readdy.ai/api/search-image?query=premium%20white%20and%20red%20running%20shoes%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20back%20view%2C%20athletic%20footwear%20with%20modern%20design%2C%20minimalist%20studio%20lighting%2C%20high%20quality%20commercial%20photo&width=600&height=600&seq=main3&orientation=squarish">
                <img src="https://readdy.ai/api/search-image?query=premium%20white%20and%20red%20running%20shoes%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20back%20view%2C%20athletic%20footwear%20with%20modern%20design%2C%20minimalist%20studio%20lighting%2C%20high%20quality%20commercial%20photo&width=150&height=150&seq=thumb3&orientation=squarish" alt="Back view" className="w-full h-full object-cover" />
              </button>
              <button className="thumbnail-btn relative overflow-hidden rounded-lg bg-gray-100 aspect-square border-2 border-gray-200 hover:border-primary transition-colors" data-image="https://readdy.ai/api/search-image?query=premium%20white%20and%20red%20running%20shoes%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20top%20view%2C%20athletic%20footwear%20with%20modern%20design%2C%20minimalist%20studio%20lighting%2C%20high%20quality%20commercial%20photo&width=600&height=600&seq=main4&orientation=squarish">
                <img src="https://readdy.ai/api/search-image?query=premium%20white%20and%20red%20running%20shoes%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20top%20view%2C%20athletic%20footwear%20with%20modern%20design%2C%20minimalist%20studio%20lighting%2C%20high%20quality%20commercial%20photo&width=150&height=150&seq=thumb4&orientation=squarish" alt="Top view" className="w-full h-full object-cover" />
              </button>
            </div>
          </div>
          <div className="product-details">
            <div className="mb-4">
              <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">NIKE</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Premium Air Max Running Shoes</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-3">
                <i className="ri-star-fill text-orange-400 text-sm"></i>
                <i className="ri-star-fill text-orange-400 text-sm"></i>
                <i className="ri-star-fill text-orange-400 text-sm"></i>
                <i className="ri-star-fill text-orange-400 text-sm"></i>
                <i className="ri-star-half-fill text-orange-400 text-sm"></i>
              </div>
              <span className="text-sm text-gray-600">(248 reviews)</span>
            </div>
            <div className="mb-6">
              <div className="flex items-center space-x-3">

                <span className="bg-primary text-white text-sm px-2 py-1 rounded">28% OFF</span>
              </div>
            </div>
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Men's Athletic</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Experience ultimate comfort and performance with these premium running shoes. Featuring advanced cushioning technology, breathable mesh upper, and durable rubber outsole for superior traction on any surface.
            </p>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-5 gap-2">
                <button className="size-btn border border-gray-300 rounded text-sm py-2 px-3 hover:border-primary transition-colors" data-size="7">7</button>
                <button className="size-btn border border-gray-300 rounded text-sm py-2 px-3 hover:border-primary transition-colors" data-size="8">8</button>
                <button className="size-btn border border-gray-300 rounded text-sm py-2 px-3 hover:border-primary transition-colors active bg-primary text-white" data-size="9">9</button>
                <button className="size-btn border border-gray-300 rounded text-sm py-2 px-3 hover:border-primary transition-colors" data-size="10">10</button>
                <button className="size-btn border border-gray-300 rounded text-sm py-2 px-3 hover:border-primary transition-colors" data-size="11">11</button>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center">
                <button id="decreaseQty" className="w-10 h-10 border border-gray-300 rounded-l flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <i className="ri-subtract-line text-sm"></i>
                </button>
                <input id="quantity" type="text" defaultValue="1" className="w-16 h-10 border-t border-b border-gray-300 text-center text-sm focus:outline-none" readOnly />
                <button id="increaseQty" className="w-10 h-10 border border-gray-300 rounded-r flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <i className="ri-add-line text-sm"></i>
                </button>
              </div>
            </div>
            <div className="flex space-x-4 mb-8">
              <button className="flex-1 bg-primary text-white py-3 px-6 rounded-button font-medium hover:bg-red-700 transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                Contact Us
              </button>
              <button className="flex-1 border-2 border-primary text-primary py-3 px-6 rounded-button font-medium hover:bg-primary hover:text-white transition-all duration-300 whitespace-nowrap">
                Explore More
              </button>
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
              <button className="tab-btn py-4 px-1 border-b-2 border-primary text-primary font-medium text-sm active" data-tab="description">
                Description
              </button>
              <button className="tab-btn py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm" data-tab="specifications">
                Specifications
              </button>
              <button className="tab-btn py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm" data-tab="reviews">
                Reviews (248)
              </button>
            </nav>
          </div>
          <div className="py-8">
            <div id="description" className="tab-content active">
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Premium Air Max Running Shoes represent the pinnacle of athletic footwear engineering. Designed for serious runners who demand both performance and style, these shoes feature cutting-edge technology that adapts to your unique running style.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The innovative Air Max cushioning system provides exceptional impact absorption, while the breathable mesh upper ensures optimal airflow during intense workouts. The durable rubber outsole with strategic flex grooves delivers superior traction and flexibility
                  on various surfaces.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Whether you're training for a marathon or enjoying a casual jog, these shoes offer the perfect balance of comfort, support, and durability to help you achieve your fitness goals.
                </p>
              </div>
            </div>
            <div id="specifications" className="tab-content hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Materials</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Upper: Breathable mesh with synthetic overlays</li>
                    <li>• Midsole: Air Max cushioning technology</li>
                    <li>• Outsole: Durable rubber with flex grooves</li>
                    <li>• Lining: Moisture-wicking textile</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Weight: 10.2 oz (size 9)</li>
                    <li>• Drop: 10mm heel-to-toe</li>
                    <li>• Support: Neutral</li>
                    <li>• Terrain: Road running</li>
                  </ul>
                </div>
              </div>
            </div>
            <div id="reviews" className="tab-content hidden">
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">MJ</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-medium text-gray-900">Michael Johnson</h5>
                        <div className="flex">
                          <i className="ri-star-fill text-orange-400 text-xs"></i>
                          <i className="ri-star-fill text-orange-400 text-xs"></i>
                          <i className="ri-star-fill text-orange-400 text-xs"></i>
                          <i className="ri-star-fill text-orange-400 text-xs"></i>
                          <i className="ri-star-fill text-orange-400 text-xs"></i>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        Excellent running shoes! The cushioning is amazing and they're very comfortable for long runs. Highly recommend for serious runners.
                      </p>
                      <span className="text-xs text-gray-500">2 weeks ago</span>
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">SR</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-medium text-gray-900">Sarah Rodriguez</h5>
                        <div className="flex">
                          <i className="ri-star-fill text-orange-400 text-xs"></i>
                          <i className="ri-star-fill text-orange-400 text-xs"></i>
                          <i className="ri-star-fill text-orange-400 text-xs"></i>
                          <i className="ri-star-fill text-orange-400 text-xs"></i>
                          <i className="ri-star-line text-gray-300 text-xs"></i>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        Great quality and style. The fit is perfect and they look amazing. Only wish they came in more color options.
                      </p>
                      <span className="text-xs text-gray-500">1 month ago</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">DL</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-medium text-gray-900">David Lee</h5>
                        <div className="flex">
                          <i className="ri-star-fill text-orange-400 text-xs"></i>
                          <i className="ri-star-fill text-orange-400 text-xs"></i>
                          <i className="ri-star-fill text-orange-400 text-xs"></i>
                          <i className="ri-star-fill text-orange-400 text-xs"></i>
                          <i className="ri-star-half-fill text-orange-400 text-xs"></i>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        Solid shoes with good build quality and comfortable for daily wear. Would buy again.
                      </p>
                      <span className="text-xs text-gray-500">3 weeks ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/product" className="group block">
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
                <img src="https://readdy.ai/api/search-image?query=modern%20athletic%20sneakers%20in%20black%20and%20white%20colorway%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20side%20view%2C%20contemporary%20sports%20footwear%20design%2C%20minimalist%20studio%20lighting&width=300&height=300&seq=related1&orientation=squarish"
                  alt="Athletic Sneakers" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Urban Athletic Sneakers</h3>

            </Link>
            <Link to="/product" className="group block">
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
                <img src="https://readdy.ai/api/search-image?query=casual%20walking%20shoes%20in%20brown%20leather%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20side%20view%2C%20comfortable%20everyday%20footwear%2C%20minimalist%20studio%20lighting&width=300&height=300&seq=related2&orientation=squarish"
                  alt="Casual Walkers" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Comfort Walk Shoes</h3>

            </Link>
            <Link to="/product" className="group block">
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
                <img src="https://readdy.ai/api/search-image?query=high-top%20basketball%20shoes%20in%20red%20and%20black%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20side%20view%2C%20athletic%20performance%20footwear%2C%20minimalist%20studio%20lighting&width=300&height=300&seq=related3&orientation=squarish"
                  alt="Basketball Shoes" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Pro Basketball Shoes</h3>

            </Link>
            <Link to="/product" className="group block">
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
                <img src="https://readdy.ai/api/search-image?query=lightweight%20training%20shoes%20in%20blue%20and%20gray%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20side%20view%2C%20cross-training%20athletic%20footwear%2C%20minimalist%20studio%20lighting&width=300&height=300&seq=related4&orientation=squarish"
                  alt="Training Shoes" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Cross Training Shoes</h3>

            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;