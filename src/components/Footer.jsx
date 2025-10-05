const Footer = () => {
  return (
    <footer id="contact" className="bg-secondary text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="font-['Pacifico'] text-2xl mb-4">Daksh FootWear</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for premium wholesale and retail footwear solutions. We offer a comprehensive range of quality footwear from leading brands.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-primary rounded-full hover:bg-red-700 transition-colors duration-200">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-primary rounded-full hover:bg-red-700 transition-colors duration-200">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-primary rounded-full hover:bg-red-700 transition-colors duration-200">
                <i className="ri-twitter-fill"></i>
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">Home</a></li>
              <li><a href="/search" className="text-gray-300 hover:text-white transition-colors duration-200">Products</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">About Us</a></li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="ri-phone-line mr-3 text-primary"></i>
                <div className="text-gray-300 space-y-1">
                  <div>+977 9814242237</div>
                  <div>+977 9807189500</div>
                  <div>+977 9817216878</div>
                </div>
              </div>
              <div className="flex items-center">
                <i className="ri-mail-line mr-3 text-primary"></i>
                <span className="text-gray-300">dakshfootwear06@gmail.com</span>
              </div>
              <div className="flex items-start">
                <i className="ri-map-pin-line mr-3 text-primary mt-1"></i>
                <span className="text-gray-300">Birgunj, Parsa, Nepal</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">© 2025 Daksh FootWear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;