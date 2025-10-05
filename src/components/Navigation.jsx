import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { brandsAPI } from '../services/api';

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleMobile = () => setMobileOpen(v => !v);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await brandsAPI.getAll();
        setBrands(data.filter(b => b.in_navbar));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch brands:', error);
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const navbarBrands = brands.filter(b => b.order <= 5);
  const moreBrands = brands.filter(b => b.order > 5);

  return (
    <nav className="sticky top-0 z-50 bg-[#fafafa] border-b border-gray-300 transition-all duration-300">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src="https://via.placeholder.com/150x50.png?text=Company+Logo" alt="Daksh FootWear Logo" className="h-12 w-auto" />
          </div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-12">
            <Link to="/" className="relative text-primary font-medium group">
              <span className="block py-2 px-1 transition-colors duration-300">Home</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            {!loading && navbarBrands.map((brand) => (
              <a key={brand._id} href={`/#${brand.slug}`} className="relative text-secondary hover:text-primary group">
                <span className="block py-2 px-1 transition-colors duration-300">{brand.name}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
            ))}
            {moreBrands.length > 0 && (
              <div className="relative group">
                <Link to="/search" className="relative text-secondary hover:text-primary inline-block">
                  <span className="block py-2 px-1 transition-colors duration-300">More</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block z-10">
                  {moreBrands.map((brand) => (
                    <a key={brand._id} href={`/#${brand.slug}`} className="block px-4 py-2 text-sm text-secondary hover:bg-gray-50 hover:text-primary transition-colors duration-200">
                      {brand.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
            <Link to="/contact" className="relative text-secondary hover:text-primary group">
              <span className="block py-2 px-1 transition-colors duration-300">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          </div>
          <div className="hidden lg:flex items-center ml-8">
            <Link to="/search" className="w-10 h-10 flex items-center justify-center text-secondary hover:text-primary transition-colors duration-300">
              <i className="ri-search-line text-xl"></i>
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Link to="/search" className="lg:hidden w-8 h-8 flex items-center justify-center text-secondary hover:text-primary transition-colors duration-300">
              <i className="ri-search-line text-xl"></i>
            </Link>
            <button
              id="mobile-menu-btn"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={toggleMobile}
              className="lg:hidden w-8 h-8 flex items-center justify-center"
            >
              <i className="ri-menu-line text-xl"></i>
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        <div id="mobile-menu" className={`lg:hidden ${mobileOpen ? '' : 'hidden'} mt-4 pb-4 border-t border-gray-300`}>
          <div className="flex flex-col space-y-3 pt-4">
            <Link to="/" className="text-primary font-medium">Home</Link>
            {!loading && brands.map((brand) => (
              <a key={brand._id} href={`/#${brand.slug}`} className="text-secondary hover:text-primary transition-colors duration-200">
                {brand.name}
              </a>
            ))}
            <Link to="/search" className="text-secondary hover:text-primary transition-colors duration-200">More</Link>
            <Link to="/contact" className="text-secondary hover:text-primary transition-colors duration-200">Contact Us</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;