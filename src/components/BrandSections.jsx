import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { brandsAPI, productsAPI } from '../services/api';

const BrandSections = () => {
  const [brands, setBrands] = useState([]);
  const [productsByBrand, setProductsByBrand] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsData = await brandsAPI.getAll();
        setBrands(brandsData);

        const productsPromises = brandsData.map(async (brand) => {
          const products = await productsAPI.getAll({ brand: brand.slug });
          return { brandSlug: brand.slug, products };
        });

        const productsResults = await Promise.all(productsPromises);
        const productsMap = {};
        productsResults.forEach(({ brandSlug, products }) => {
          productsMap[brandSlug] = products;
        });
        setProductsByBrand(productsMap);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch brands and products:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="py-16">
      {brands.map((brand, index) => (
        <div key={brand._id}>
          <section id={brand.slug} className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12 opacity-0 animate-fade-in">
                <img src={brand.logo_url} alt={`${brand.name} Logo`} className="h-12 w-auto max-w-full object-contain mx-auto mb-4" />
                <h2 className="sr-only">{brand.name}</h2>
                <img src={brand.banner_url} alt={`${brand.name} Banner`} className="w-full h-auto object-cover mx-auto mb-6 rounded-lg" loading="lazy" decoding="async" width="1200" height="400" />
                <p className="text-gray-600 text-lg">{brand.description}</p>
                {productsByBrand[brand.slug]?.some(p => p.status === 'coming_soon') && (
                  <div className="mt-4 inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    <i className="ri-time-line mr-2"></i> Some Products Coming Soon
                  </div>
                )}
              </div>
              <div className="relative">
                <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4 scrollbar-hide smooth-scroll" data-scroller>
                  <div className="absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-white/80 to-transparent pointer-events-none transition-opacity duration-300" data-scroll-hint></div>
                  {productsByBrand[brand.slug]?.map((product) => (
                    product.status === 'coming_soon' ? (
                      <div key={product._id} className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 opacity-60 border border-gray-300">
                        <div className="h-64 overflow-hidden relative">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-top" />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">Coming Soon</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-secondary mb-2">{product.name}</h3>
                          <p className="text-gray-600 mb-4">{product.description}</p>
                          <div className="flex justify-end items-center">
                            <span className="!rounded-button whitespace-nowrap bg-gray-300 text-gray-500 px-4 py-2 text-sm cursor-not-allowed">
                              Notify Me
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link key={product._id} to={`/product/${product._id}`} className="product-card flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 block group border border-gray-300">
                        <div className="h-64 overflow-hidden">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-top" />
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-secondary mb-2">{product.name}</h3>
                          <p className="text-gray-600 mb-4">{product.description}</p>
                          <div className="flex justify-end items-center">
                            <span className="!rounded-button whitespace-nowrap bg-primary text-white px-4 py-2 text-sm group-hover:bg-red-700 transition-colors duration-200">
                              View Details
                            </span>
                          </div>
                        </div>
                      </Link>
                    )
                  ))}
                </div>
              </div>
            </div>
          </section>
          {index < brands.length - 1 && (
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-6"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BrandSections;