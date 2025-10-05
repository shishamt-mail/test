import { Link } from 'react-router-dom';

const ActionSection = () => {
  return (
    <section id="action" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <img src="https://via.placeholder.com/150x50.png?text=Brand+Logo" alt="Action Brand Logo" className="h-12 w-auto max-w-full object-contain mx-auto mb-4" />
          <h2 className="sr-only">Action</h2>
          <img src="https://via.placeholder.com/1200x400.png?text=Section+Banner" alt="Action Section Banner" className="w-full h-auto object-cover mx-auto mb-6 rounded-lg" loading="lazy" decoding="async" width="1200" height="400" />
          <p className="text-gray-600 text-lg">EVA Footwear, School Shoes & Sneakers</p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <i className="ri-time-line mr-2"></i> Sneakers Coming Soon
          </div>
        </div>
        <div className="relative">
          <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4 scrollbar-hide smooth-scroll" data-scroller>
            <div className="absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-white/80 to-transparent pointer-events-none transition-opacity duration-300" data-scroll-hint></div>
            <Link to="/product" className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 block group border border-gray-300">
              <div className="h-64 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=Action%20brand%20EVA%20footwear%20in%20black%20color%20with%20comfortable%20sole%20and%20modern%20athletic%20design%20photographed%20on%20clean%20white%20background%20with%20professional%20lighting%20showcasing%20durability%20and%20comfort%20features&width=300&height=300&seq=action-001&orientation=squarish"
                  alt="EVA Footwear" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Action EVA Sports</h3>
                <p className="text-gray-600 mb-4">Lightweight EVA material for active lifestyle</p>
                <div className="flex justify-end items-center">
                  <span className="!rounded-button whitespace-nowrap bg-primary text-white px-4 py-2 text-sm group-hover:bg-red-700 transition-colors duration-200">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
            <Link to="/product" className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 block group border border-gray-300">
              <div className="h-64 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=Action%20brand%20school%20shoes%20in%20black%20leather%20with%20comfortable%20sole%20and%20formal%20design%20photographed%20on%20clean%20white%20background%20with%20professional%20studio%20lighting%20showcasing%20quality%20craftsmanship%20and%20durability&width=300&height=300&seq=action-002&orientation=squarish"
                  alt="School Shoes" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Action School Shoes</h3>
                <p className="text-gray-600 mb-4">Durable and comfortable for daily school wear</p>
                <div className="flex justify-end items-center">
                  <span className="!rounded-button whitespace-nowrap bg-primary text-white px-4 py-2 text-sm group-hover:bg-red-700 transition-colors duration-200">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
            <div className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 opacity-60 border border-gray-300">
              <div className="h-64 overflow-hidden relative">
                <img src="https://readdy.ai/api/search-image?query=Action%20brand%20sneakers%20in%20white%20and%20blue%20color%20with%20modern%20athletic%20design%20and%20comfortable%20sole%20photographed%20on%20clean%20white%20background%20with%20professional%20lighting%20showcasing%20sporty%20style%20and%20quality&width=300&height=300&seq=action-003&orientation=squarish"
                  alt="Sneakers Coming Soon" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">Coming Soon</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Action Sneakers</h3>
                <p className="text-gray-600 mb-4">Premium sneakers launching soon</p>
                <div className="flex justify-end items-center">
                  <span className="!rounded-button whitespace-nowrap bg-gray-300 text-gray-500 px-4 py-2 text-sm cursor-not-allowed">
                    Notify Me
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionSection;