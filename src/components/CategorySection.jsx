import React from 'react'
import { Link } from 'react-router-dom'

const CategorySection = () => {
  const items = [
    { name: 'Mens', slug: 'mens', img: 'https://via.placeholder.com/400x500?text=Mens' },
    { name: 'Womens', slug: 'womens', img: 'https://via.placeholder.com/400x500?text=Womens' },
    { name: 'Kids', slug: 'kids', img: 'https://via.placeholder.com/400x500?text=Kids' }
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>

        <div className="relative">
          <div className="overflow-x-auto" data-scroller>
            <div className="flex gap-6" style={{ paddingBottom: '1rem' }}>
              {items.map(item => (
                <Link key={item.slug} to={`/search?category=${item.slug}`} className="block w-[400px] h-[600px] flex-shrink-0 rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-all duration-200">
                  <div className="w-full h-[500px] bg-gray-100 overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="w-full h-[100px] px-4 flex items-center justify-between border-t">
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">Shop the latest {item.name} collection</p>
                    </div>
                    <div className="text-primary text-2xl">
                      <i className="ri-arrow-right-line"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* small scroll hint used by existing app logic (will be hidden when scroller is at end) */}
          <div data-scroll-hint className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity">
            <div className="bg-white/80 backdrop-blur px-2 py-1 rounded-full shadow">
              <i className="ri-arrow-right-line text-gray-600"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategorySection
