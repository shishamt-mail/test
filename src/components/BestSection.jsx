import { Link } from 'react-router-dom';

const BestSection = () => {
  return (
    <section id="best" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <img src="https://via.placeholder.com/150x50.png?text=Brand+Logo" alt="BEST Brand Logo" className="h-12 w-auto max-w-full object-contain mx-auto mb-4" />
          <h2 className="sr-only">BEST</h2>
          <img src="https://via.placeholder.com/1200x400.png?text=Section+Banner" alt="BEST Section Banner" className="w-full h-auto object-cover mx-auto mb-6 rounded-lg" loading="lazy" decoding="async" width="1200" height="400" />
          <p className="text-gray-600 text-lg">Premium PU Slippers Collection</p>
        </div>
        <div className="relative">
          <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4 scrollbar-hide smooth-scroll" data-scroller>
            <div className="absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-white/80 to-transparent pointer-events-none transition-opacity duration-300" data-scroll-hint></div>
            <Link to="/product" className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 block group border border-gray-300">
              <div className="h-64 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=Premium%20PU%20leather%20slippers%20for%20men%20in%20brown%20color%20with%20comfortable%20sole%20and%20modern%20design%20photographed%20on%20clean%20white%20background%20with%20professional%20lighting%20showcasing%20quality%20craftsmanship%20and%20elegant%20finish&width=300&height=300&seq=best-001&orientation=squarish"
                  alt="PU Slipper" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Comfort PU Slippers</h3>
                <p className="text-gray-600 mb-4">Premium quality PU material with enhanced comfort</p>
                <div className="flex justify-end items-center">
                  <span className="!rounded-button whitespace-nowrap bg-primary text-white px-4 py-2 text-sm group-hover:bg-red-700 transition-colors duration-200">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
            <Link to="/product" className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 block group border border-gray-300">
              <div className="h-64 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=Stylish%20PU%20slippers%20for%20women%20in%20black%20color%20with%20comfortable%20padding%20and%20modern%20design%20photographed%20on%20clean%20white%20background%20with%20professional%20studio%20lighting%20showcasing%20premium%20quality%20and%20elegant%20appearance&width=300&height=300&seq=best-002&orientation=squarish"
                  alt="PU Slipper" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Elite PU Slippers</h3>
                <p className="text-gray-600 mb-4">Stylish design with superior comfort technology</p>
                <div className="flex justify-end items-center">
                  <span className="!rounded-button whitespace-nowrap bg-primary text-white px-4 py-2 text-sm group-hover:bg-red-700 transition-colors duration-200">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
            <Link to="/product" className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 block group border border-gray-300">
              <div className="h-64 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=Premium%20PU%20slippers%20in%20navy%20blue%20color%20with%20ergonomic%20design%20and%20comfortable%20sole%20photographed%20on%20clean%20white%20background%20with%20professional%20lighting%20showcasing%20quality%20materials%20and%20modern%20styling&width=300&height=300&seq=best-003&orientation=squarish"
                  alt="PU Slipper" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Classic PU Slippers</h3>
                <p className="text-gray-600 mb-4">Timeless design with modern comfort features</p>
                <div className="flex justify-end items-center">
                  <span className="!rounded-button whitespace-nowrap bg-primary text-white px-4 py-2 text-sm group-hover:bg-red-700 transition-colors duration-200">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
            <Link to="/product" className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 block group border border-gray-300">
              <div className="h-64 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=Luxury%20PU%20slippers%20in%20tan%20color%20with%20premium%20finish%20and%20comfortable%20design%20photographed%20on%20clean%20white%20background%20with%20professional%20studio%20lighting%20showcasing%20high%20quality%20craftsmanship%20and%20elegant%20style&width=300&height=300&seq=best-004&orientation=squarish"
                  alt="PU Slipper" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Luxury PU Slippers</h3>
                <p className="text-gray-600 mb-4">Premium materials with exceptional durability</p>
                <div className="flex justify-end items-center">
                  <span className="!rounded-button whitespace-nowrap bg-primary text-white px-4 py-2 text-sm group-hover:bg-red-700 transition-colors duration-200">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSection;