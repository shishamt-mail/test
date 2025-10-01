from pymongo import MongoClient
from datetime import datetime

MONGO_URI = "mongodb+srv://Daksh:Shishamt7894@cluster0.avgzcuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client['daksh_footwear']

brands_collection = db['brands']
products_collection = db['products']

def seed_brands():
    existing_count = brands_collection.count_documents({})
    if existing_count > 0:
        print(f"Brands collection already has {existing_count} documents. Skipping seed.")
        return

    brands = [
        {
            'name': 'BEST',
            'slug': 'best',
            'logo_url': 'https://via.placeholder.com/150x50.png?text=BEST+Logo',
            'banner_url': 'https://via.placeholder.com/1200x400.png?text=BEST+Banner',
            'description': 'Premium PU Slippers Collection',
            'visible': True,
            'in_navbar': True,
            'order': 1,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        },
        {
            'name': 'Walkaroo',
            'slug': 'walkaroo',
            'logo_url': 'https://via.placeholder.com/150x50.png?text=Walkaroo+Logo',
            'banner_url': 'https://via.placeholder.com/1200x400.png?text=Walkaroo+Banner',
            'description': 'Comfortable PU Slippers for Every Occasion',
            'visible': True,
            'in_navbar': True,
            'order': 2,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        },
        {
            'name': 'Action',
            'slug': 'action',
            'logo_url': 'https://via.placeholder.com/150x50.png?text=Action+Logo',
            'banner_url': 'https://via.placeholder.com/1200x400.png?text=Action+Banner',
            'description': 'EVA Footwear, School Shoes & Sneakers',
            'visible': True,
            'in_navbar': True,
            'order': 3,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        },
        {
            'name': 'Brilliant',
            'slug': 'brilliant',
            'logo_url': 'https://via.placeholder.com/150x50.png?text=Brilliant+Logo',
            'banner_url': 'https://via.placeholder.com/1200x400.png?text=Brilliant+Banner',
            'description': 'Quality Footwear for Everyone',
            'visible': True,
            'in_navbar': True,
            'order': 4,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        },
        {
            'name': 'Chinese',
            'slug': 'chinese',
            'logo_url': 'https://via.placeholder.com/150x50.png?text=Chinese+Logo',
            'banner_url': 'https://via.placeholder.com/1200x400.png?text=Chinese+Banner',
            'description': 'Affordable and Stylish Footwear',
            'visible': True,
            'in_navbar': True,
            'order': 5,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
    ]

    result = brands_collection.insert_many(brands)
    print(f"Inserted {len(result.inserted_ids)} brands")

def seed_products():
    existing_count = products_collection.count_documents({})
    if existing_count > 0:
        print(f"Products collection already has {existing_count} documents. Skipping seed.")
        return

    products = [
        {
            'name': 'Comfort PU Slippers',
            'brand': 'best',
            'category': 'mens',
            'description': 'Premium quality PU material with enhanced comfort',
            'images': [
                'https://readdy.ai/api/search-image?query=Premium%20PU%20leather%20slippers%20for%20men%20in%20brown%20color&width=600&height=600&seq=best-001&orientation=squarish'
            ],
            'sizes': ['7', '8', '9', '10', '11'],
            'status': 'available',
            'featured': True,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        },
        {
            'name': 'Elite PU Slippers',
            'brand': 'best',
            'category': 'womens',
            'description': 'Stylish design with superior comfort technology',
            'images': [
                'https://readdy.ai/api/search-image?query=Stylish%20PU%20slippers%20for%20women%20in%20black%20color&width=600&height=600&seq=best-002&orientation=squarish'
            ],
            'sizes': ['6', '7', '8', '9', '10'],
            'status': 'available',
            'featured': True,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        },
        {
            'name': 'Walkaroo Comfort',
            'brand': 'walkaroo',
            'category': 'mens',
            'description': 'Enhanced comfort with premium PU construction',
            'images': [
                'https://readdy.ai/api/search-image?query=Walkaroo%20brand%20PU%20slippers%20in%20maroon%20color&width=600&height=600&seq=walkaroo-001&orientation=squarish'
            ],
            'sizes': ['7', '8', '9', '10', '11'],
            'status': 'available',
            'featured': True,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        },
        {
            'name': 'Action EVA Sports',
            'brand': 'action',
            'category': 'mens',
            'description': 'Lightweight EVA material for active lifestyle',
            'images': [
                'https://readdy.ai/api/search-image?query=Action%20brand%20EVA%20footwear%20in%20black%20color&width=600&height=600&seq=action-001&orientation=squarish'
            ],
            'sizes': ['7', '8', '9', '10', '11'],
            'status': 'available',
            'featured': True,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        },
        {
            'name': 'Action School Shoes',
            'brand': 'action',
            'category': 'kids',
            'description': 'Durable and comfortable for daily school wear',
            'images': [
                'https://readdy.ai/api/search-image?query=Action%20brand%20school%20shoes%20in%20black%20leather&width=600&height=600&seq=action-002&orientation=squarish'
            ],
            'sizes': ['1', '2', '3', '4', '5', '6'],
            'status': 'available',
            'featured': True,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        },
        {
            'name': 'Action Sneakers',
            'brand': 'action',
            'category': 'unisex',
            'description': 'Premium sneakers launching soon',
            'images': [
                'https://readdy.ai/api/search-image?query=Action%20brand%20sneakers%20in%20white%20and%20blue%20color&width=600&height=600&seq=action-003&orientation=squarish'
            ],
            'sizes': ['7', '8', '9', '10', '11'],
            'status': 'coming_soon',
            'featured': True,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
    ]

    result = products_collection.insert_many(products)
    print(f"Inserted {len(result.inserted_ids)} products")

if __name__ == '__main__':
    print("Starting database seeding...")
    seed_brands()
    seed_products()
    print("Database seeding completed!")
