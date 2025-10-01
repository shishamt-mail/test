# Daksh FootWear Backend

Flask-based REST API backend for the Daksh FootWear e-commerce platform with MongoDB Atlas integration.

## Features

- RESTful API endpoints for brands, products, and contact messages
- Admin authentication using HTTP Basic Auth
- MongoDB Atlas cloud database integration
- CORS enabled for frontend integration
- Full CRUD operations for all entities

## Admin Credentials

- **Username**: `shishamt`
- **Password**: `Shishamt7894`

## Installation

1. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Seed the database with initial data:
```bash
python seed_data.py
```

3. Run the Flask server:
```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Public Endpoints

#### Health Check
- `GET /api/health` - Check API and database connection status

#### Brands
- `GET /api/brands` - Get all visible brands (sorted by order)

#### Products
- `GET /api/products` - Get all products (with optional filters)
  - Query params: `brand`, `category`, `search`
- `GET /api/products/<id>` - Get a specific product

#### Messages
- `POST /api/messages` - Submit a contact form message
  - Body: `{ "name": "...", "email": "...", "message": "..." }`

#### Settings
- `GET /api/settings` - Get site settings (hero section, contact info, etc.)

### Admin Endpoints (Requires Basic Auth)

#### Brands Management
- `GET /api/brands/all` - Get all brands including hidden ones
- `POST /api/brands` - Create a new brand
  - Body: `{ "name", "slug", "logo_url", "banner_url", "description", "visible", "in_navbar", "order" }`
- `PUT /api/brands/<id>` - Update a brand
- `DELETE /api/brands/<id>` - Delete a brand

#### Products Management
- `POST /api/products` - Create a new product
  - Body: `{ "name", "brand", "category", "description", "images", "sizes", "status", "featured" }`
- `PUT /api/products/<id>` - Update a product
- `DELETE /api/products/<id>` - Delete a product

#### Messages Management
- `GET /api/messages` - Get all contact messages
- `PUT /api/messages/<id>/read` - Mark message as read
- `DELETE /api/messages/<id>` - Delete a message

#### Settings Management
- `PUT /api/settings` - Update site settings

## Authentication

Admin endpoints require HTTP Basic Authentication. Include credentials in request headers:

```javascript
// Using fetch API
fetch('http://localhost:5000/api/brands/all', {
  headers: {
    'Authorization': 'Basic ' + btoa('shishamt:Shishamt7894')
  }
})
```

## Database Schema

### Brands Collection
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String,
  logo_url: String,
  banner_url: String,
  description: String,
  visible: Boolean,
  in_navbar: Boolean,
  order: Number,
  created_at: DateTime,
  updated_at: DateTime
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  brand: String,
  category: String,
  description: String,
  images: [String],
  sizes: [String],
  status: String, // 'available', 'coming_soon', 'hidden'
  featured: Boolean,
  created_at: DateTime,
  updated_at: DateTime
}
```

### Messages Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  message: String,
  read: Boolean,
  created_at: DateTime
}
```

### Settings Collection
```javascript
{
  _id: ObjectId,
  key: 'site_settings',
  hero_title: String,
  hero_description: String,
  hero_image: String,
  logo_url: String,
  contact_info: Object
}
```

## Brand Navbar Logic

- Brands with `in_navbar: true` and `order <= 5` appear directly in the navbar
- Brands with `in_navbar: true` and `order > 5` appear in the "More" dropdown
- Brands are sorted by the `order` field
- Only `visible: true` brands are shown to public users

## Product Status

- `available` - Product is available for purchase
- `coming_soon` - Product is coming soon (shown with overlay)
- `hidden` - Product is not shown to public users

## Notes

- All image URLs should be provided as image links (MongoDB doesn't store binary files)
- Dates are stored in UTC format
- All IDs are MongoDB ObjectIds converted to strings in API responses
- CORS is enabled for all origins (configure appropriately for production)
