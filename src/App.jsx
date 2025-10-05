import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import BrandSections from './components/BrandSections'
import Footer from './components/Footer'
import ContactPage from './pages/ContactPage'
import ProductPage from './pages/ProductPage'
import SearchPage from './pages/SearchPage'
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import BrandsManager from './pages/admin/BrandsManager'
import ProductsManager from './pages/admin/ProductsManager'
import MessagesInbox from './pages/admin/MessagesInbox'
import './App.css'

function HomePage() {
  useEffect(() => {
    // Note: mobile menu is handled within the Navigation component via React state.

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

    // Product interactions
    document.querySelectorAll('.product-card').forEach(card => {
      const handleCardClick = function(e) {
        if (!e.target.closest('button')) {
          this.style.transform = 'scale(0.98)';
          setTimeout(() => {
            this.style.transform = '';
          }, 150);
        }
      };
      card.addEventListener('click', handleCardClick);
    });

    // Smooth scroll for anchor links
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

    // Scroll hint functionality
    const scrollers = document.querySelectorAll('[data-scroller]');
    
    scrollers.forEach(scroller => {
      const scrollHint = scroller.querySelector('[data-scroll-hint]');
      
      const updateScrollHint = () => {
        const isAtEnd = Math.abs(
          scroller.scrollWidth - scroller.clientWidth - scroller.scrollLeft
        ) < 1;
        if (scrollHint) {
          scrollHint.style.opacity = isAtEnd ? '0' : '1';
        }
      };
      
      scroller.addEventListener('scroll', updateScrollHint);
      updateScrollHint();
      
      window.addEventListener('resize', updateScrollHint);
      
      scroller.addEventListener('focusin', (e) => {
        const productCard = e.target.closest('.product-card');
        if (productCard) {
          productCard.scrollIntoView({
            inline: 'nearest',
            block: 'nearest',
            behavior: 'smooth'
          });
        }
      });
    });

    // Cleanup function
    return () => {
      // nothing to cleanup for mobile-menu here
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <HeroSection />
      <BrandSections />
    </>
  );
}

// Listens for URL hash changes and scrolls smoothly to the element with that id
function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace('#', '');
    let attempts = 0;
    const maxAttempts = 20; // retry for ~1s (20 * 50ms)

    const tryScroll = () => {
      const target = document.getElementById(id) || document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        setTimeout(tryScroll, 50);
      }
    };

    // start after a short delay to allow React to render the target
    setTimeout(tryScroll, 50);
  }, [hash]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="bg-white text-secondary font-sans overflow-x-hidden">
        <Navigation />
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/brands" element={<BrandsManager />} />
          <Route path="/admin/products" element={<ProductsManager />} />
          <Route path="/admin/messages" element={<MessagesInbox />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App