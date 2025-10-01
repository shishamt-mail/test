import { Link } from 'react-router-dom';

const ChineseSection = () => {
  return (
    <section id="chinese" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <img src="https://via.placeholder.com/150x50.png?text=Brand+Logo" alt="Chinese Brand Logo" className="h-12 w-auto max-w-full object-contain mx-auto mb-4" />
          <h2 className="sr-only">Chinese</h2>
          <img src="https://via.placeholder.com/1200x400.png?text=Section+Banner" alt="Chinese Section Banner" className="w-full h-auto object-cover mx-auto mb-6 rounded-lg" loading="lazy" decoding="async" width="1200" height="400" />
          <p className="text-gray-600 text-lg">Sandals & Flip-Flops Collection</p>
        </div>
        <div className="relative">
          <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4 scrollbar-hide smooth-scroll" data-scroller>
            <div className="absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-white/80 to-transparent pointer-events-none transition-opacity duration-300" data-scroll-hint></div>
            <Link to="/product" className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 block group border border-gray-300">
              <div className="h-64 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=Chinese%20brand%20comfortable%20sandals%20in%20brown%20leather%20with%20adjustable%20straps%20and%20cushioned%20sole%20photographed%20on%20clean%20white%20background%20with%20professional%20lighting%20showcasing%20casual%20elegance%20and%20comfort&width=300&height=300&seq=chinese-001&orientation=squarish"
                  alt="Chinese Sandals" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Chinese Comfort Sandals</h3>
                <p className="text-gray-600 mb-4">Comfortable sandals for everyday wear</p>
                <div className="flex justify-end items-center">
                  <span className="!rounded-button whitespace-nowrap bg-primary text-white px-4 py-2 text-sm group-hover:bg-red-700 transition-colors duration-200">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
            <Link to="/product" className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 block group border border-gray-300">
              <div className="h-64 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=Chinese%20brand%20flip%20flops%20in%20blue%20color%20with%20comfortable%20rubber%20sole%20and%20modern%20design%20photographed%20on%20clean%20white%20background%20with%20professional%20studio%20lighting%20showcasing%20casual%20style%20and%20durability&width=300&height=300&seq=chinese-002&orientation=squarish"
                  alt="Chinese Flip-Flops" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Chinese Flip-Flops</h3>
                <p className="text-gray-600 mb-4">Lightweight and durable for beach and casual wear</p>
                <div className="flex justify-end items-center">
                  <span className="!rounded-button whitespace-nowrap bg-primary text-white px-4 py-2 text-sm group-hover:bg-red-700 transition-colors duration-200">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
            <Link to="/product" className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 block group border border-gray-300">
              <div className="h-64 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=Chinese%20brand%20premium%20sandals%20in%20black%20leather%20with%20elegant%20design%20and%20comfortable%20sole%20photographed%20on%20clean%20white%20background%20with%20professional%20lighting%20showcasing%20sophisticated%20style%20and%20quality&width=300&height=300&seq=chinese-003&orientation=squarish"
                  alt="Chinese Premium Sandals" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Chinese Premium Sandals</h3>
                <p className="text-gray-600 mb-4">Premium leather with superior comfort</p>
                <div className="flex justify-end items-center">
                  <span className="!rounded-button whitespace-nowrap bg-primary text-white px-4 py-2 text-sm group-hover:bg-red-700 transition-colors duration-200">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
            <Link to="/product" className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 block group border border-gray-300">
              <div className="h-64 overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=Chinese%20brand%20stylish%20flip%20flops%20in%20green%20color%20with%20comfortable%20design%20and%20durable%20sole%20photographed%20on%20clean%20white%20background%20with%20professional%20studio%20lighting%20showcasing%20modern%20casual%20style&width=300&height=300&seq=chinese-004&orientation=squarish"
                  alt="Chinese Stylish Flip-Flops" className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">Chinese Style Flip-Flops</h3>
                <p className="text-gray-600 mb-4">Trendy design with enhanced comfort</p>
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

export default ChineseSection;