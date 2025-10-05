const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: "url('https://readdy.ai/api/search-image?query=Premium%20footwear%20collection%20display%20with%20elegant%20shoes%20sandals%20and%20sneakers%20arranged%20on%20clean%20white%20modern%20shelves%20in%20bright%20minimalist%20showroom%20with%20soft%20lighting%20and%20professional%20photography%20style%20showcasing%20quality%20craftsmanship%20and%20contemporary%20design&width=1920&height=1080&seq=hero-bg-001&orientation=landscape')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15
      }}></div>
      <div className="relative z-10 w-full px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Premium Wholesale & Retail Footwear Collection</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover our extensive range of high-quality footwear from trusted brands. From casual slippers to premium sneakers, we offer wholesale and retail solutions for all your needs.
            </p>
            <a href="/search" className="inline-block !rounded-button whitespace-nowrap bg-primary text-white px-8 py-4 text-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Explore Now
            </a>
          </div>
          {/* Hero Image */}
          <div className="flex-1 relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://readdy.ai/api/search-image?query=Modern%20footwear%20store%20interior%20with%20premium%20shoes%20displayed%20on%20elegant%20wooden%20shelves%20contemporary%20lighting%20design%20clean%20white%20walls%20and%20professional%20retail%20environment%20showcasing%20various%20types%20of%20quality%20footwear%20including%20sneakers%20sandals%20and%20formal%20shoes&width=600&height=500&seq=hero-img-001&orientation=portrait"
                alt="Premium Footwear Collection" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default HeroSection;