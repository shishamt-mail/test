import { useEffect } from 'react';
import { messagesAPI } from '../services/api';

const ContactPage = () => {
  useEffect(() => {
    const form = document.querySelector('form');
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      try {
        await messagesAPI.create(data);
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
      } catch (error) {
        alert('Failed to send message. Please try again.');
        console.error('Failed to send message:', error);
      } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    };

    if (form) {
      form.addEventListener('submit', handleSubmit);
    }

    // Animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, observerOptions);
    document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
      observer.observe(el);
    });

    // Mobile menu is handled in the Navigation component via React state.

    // Scroll animations
    const scrollObserver = new IntersectionObserver(function(entries) {
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
      scrollObserver.observe(el);
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
      if (form) {
        form.removeEventListener('submit', handleSubmit);
      }
      // no cleanup required for mobile menu here
      observer.disconnect();
      scrollObserver.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen">
      <div id="brand-1"></div>
      <div id="brand-2"></div>
      <div id="brand-3"></div>
      <div id="brand-4"></div>
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">We'd love to hear from you. Reach out through any channel below.</p>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 slide-left">
              <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-8">
                <h2 className="text-2xl font-bold text-secondary mb-8">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="contact-item">
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 flex items-center justify-center contact-icon">
                        <i className="ri-building-line text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary mb-1">Company</h3>
                        <p className="text-gray-600">Daksh FootWear</p>
                      </div>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 flex items-center justify-center contact-icon">
                        <i className="ri-map-pin-line text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary mb-1">Address</h3>
                        <p className="text-gray-600">Birgunj, Parsa, Nepal</p>
                      </div>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 flex items-center justify-center contact-icon">
                        <i className="ri-phone-line text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary mb-1">Phone</h3>
                        <div className="space-y-1">
                          <p><a href="tel:+9779814242237" className="text-gray-600 hover:text-primary transition-colors duration-200">+977 9814242237</a></p>
                          <p><a href="tel:+9779807189500" className="text-gray-600 hover:text-primary transition-colors duration-200">+977 9807189500</a></p>
                          <p><a href="tel:+9779817216878" className="text-gray-600 hover:text-primary transition-colors duration-200">+977 9817216878</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 flex items-center justify-center contact-icon">
                        <i className="ri-whatsapp-line text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary mb-1">WhatsApp</h3>
                        <p><a href="https://wa.me/917488977751" className="text-gray-600 hover:text-primary transition-colors duration-200">+91 74889 77751</a></p>
                      </div>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 flex items-center justify-center contact-icon">
                        <i className="ri-mail-line text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary mb-1">Email</h3>
                        <p><a href="mailto:dakshfootwear06@gmail.com" className="text-gray-600 hover:text-primary transition-colors duration-200">dakshfootwear06@gmail.com</a></p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-300">
                    <h3 className="font-semibold text-secondary mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-all duration-200">
                        <i className="ri-instagram-line"></i>
                      </a>
                      <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-all duration-200">
                        <i className="ri-facebook-fill"></i>
                      </a>
                      <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-all duration-200">
                        <i className="ri-twitter-x-line"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 slide-right">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="map-container h-96 lg:h-80">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57258.77832653!2d84.8719!3d27.0119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb5e0c8a8c41%3A0x9bcf0c8c8c8c8c8c!2sBirgunj%2C%20Nepal!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus"
                    width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-secondary mb-6">Send us a Message</h2>
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">Full Name</label>
                      <input type="text" id="name" name="name" className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-sm" placeholder="Enter your full name" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">Email Address</label>
                      <input type="email" id="email" name="email" className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-sm" placeholder="Enter your email address" required />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">Message</label>
                      <textarea id="message" name="message" rows="4" className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-sm resize-none" placeholder="Tell us how we can help you..." required></textarea>
                    </div>
                    <button type="submit" className="!rounded-button whitespace-nowrap w-full bg-primary text-white py-3 px-6 font-medium hover:bg-red-700 transition-colors duration-200">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }

        .slide-left {
          transform: translateX(-30px);
          opacity: 0;
          animation: slideLeft 0.6s ease-out 0.2s forwards;
        }

        .slide-right {
          transform: translateX(30px);
          opacity: 0;
          animation: slideRight 0.6s ease-out 0.4s forwards;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes slideLeft {
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideRight {
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .contact-item {
          transition: all 0.3s ease;
        }

        .contact-item:hover .contact-icon {
          color: #e02f26;
          transform: scale(1.1);
        }

        .contact-icon {
          transition: all 0.2s ease;
        }

        .form-input {
          transition: all 0.3s ease;
        }

        .form-input:focus {
          box-shadow: 0 0 0 3px rgba(224, 47, 38, 0.1);
        }

        .map-container {
          filter: grayscale(0.2);
          transition: filter 0.3s ease;
        }

        .map-container:hover {
          filter: grayscale(0);
        }
      `}</style>
    </main>
  );
};

export default ContactPage;