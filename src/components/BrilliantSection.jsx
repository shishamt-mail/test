import { Link } from 'react-router-dom';

const BrilliantSection = () => {
  return (
    <section id="brilliant" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <img src="https://via.placeholder.com/150x50.png?text=Brand+Logo" alt="Brilliant Brand Logo" className="h-12 w-auto max-w-full object-contain mx-auto mb-4" />
          <h2 className="sr-only">Brilliant</h2>
          <img src="https://via.placeholder.com/1200x400.png?text=Section+Banner" alt="Brilliant Section Banner" className="w-full h-auto object-cover mx-auto mb-6 rounded-lg shadow-md" loading="lazy" decoding="async" width="1200" height="400" />
          <p className="text-gray-600 text-lg">Premium Sneakers Collection</p>
        </div>
        <div className="relative">
          <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4 scrollbar-hide smooth-scroll" data-scroller>
            <div className="absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-white/80 to-transparent pointer-events-none transition-opacity duration-300" data-scroll-hint></div>
            <Link to="/product" className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 block group border border-gray-300">
              <div className="h-64 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=Brilliant%20brand%20premium%20sneakers%20in%20white%20and%20red%20color%20with%20modern%20athletic%20design%20and%20comfortable%20sole%20photographed%20on%20clean%20white%20background%20with%20professional%20lighting%20showcasing%20sporty%20elegance%20and%20quality&width=300&height=300&seq=brilliant-001&orientation=squarish"
                  alt="Brilliant Sneakers" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Brilliant Sport</h3>
                <p className="text-gray-600 mb-4">Athletic performance meets street style</p>
                <div className="flex justify-end items-center">
                  <span className="!rounded-button whitespace-nowrap bg-primary text-white px-4 py-2 text-sm group-hover:bg-red-700 transition-colors duration-200">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
            <Link to="/product" className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 block group border border-gray-300">
              <div className="h-64 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=Brilliant%20brand%20sneakers%20in%20black%20and%20grey%20color%20with%20premium%20design%20and%20comfortable%20athletic%20sole%20photographed%20on%20clean%20white%20background%20with%20professional%20studio%20lighting%20showcasing%20modern%20style%20and%20quality&width=300&height=300&seq=brilliant-002&orientation=squarish"
                  alt="Brilliant Sneakers" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Brilliant Classic</h3>
                <p className="text-gray-600 mb-4">Timeless design with modern comfort</p>
                <div className="flex justify-end items-center">
                  <span className="!rounded-button whitespace-nowrap bg-primary text-white px-4 py-2 text-sm group-hover:bg-red-700 transition-colors duration-200">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
            <Link to="/product" className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 block group border border-gray-300">
              <div className="h-64 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=Brilliant%20brand%20premium%20sneakers%20in%20navy%20blue%20and%20white%20color%20with%20athletic%20design%20and%20comfortable%20sole%20photographed%20on%20clean%20white%20background%20with%20professional%20lighting%20showcasing%20sporty%20sophistication&width=300&height=300&seq=brilliant-003&orientation=squarish"
                  alt="Brilliant Sneakers" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Brilliant Elite</h3>
                <p className="text-gray-600 mb-4">Premium materials for superior performance</p>
                <div className="flex justify-end items-center">
                  <span className="!rounded-button whitespace-nowrap bg-primary text-white px-4 py-2 text-sm group-hover:bg-red-700 transition-colors duration-200">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
            <Link to="/product" className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 block group border border-gray-300">
              <div className="h-64 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=Brilliant%20brand%20luxury%20sneakers%20in%20burgundy%20and%20gold%20color%20with%20premium%20athletic%20design%20and%20comfortable%20sole%20photographed%20on%20clean%20white%20background%20with%20professional%20studio%20lighting%20showcasing%20elegance%20and%20quality&width=300&height=300&seq=brilliant-004&orientation=squarish"
                  alt="Brilliant Sneakers" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Brilliant Luxury</h3>
                <p className="text-gray-600 mb-4">Luxury comfort for the discerning athlete</p>
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

export default BrilliantSection;