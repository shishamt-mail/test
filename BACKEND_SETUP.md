# Backend Setup Guide

This guide will help you set up and run the Flask backend for the Daksh FootWear application.

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- MongoDB Atlas account (already configured)

## Installation Steps

### 1. Install Python Dependencies

Navigate to the backend directory and install required packages:

```bash
cd backend
pip install -r requirements.txt
```

### 2. Seed the Database

Populate the MongoDB database with initial data (brands and products):

```bash
python seed_data.py
```

This will create:
- 5 brand sections (BEST, Walkaroo, Action, Brilliant, Chinese)
- 6 sample products distributed across brands

### 3. Start the Backend Server

Run the Flask development server:

```bash
python app.py
```

The server will start on `http://localhost:5000`

You should see output like:
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

## Verifying the Setup

Test the API by visiting:
- Health check: http://localhost:5000/api/health
- Get brands: http://localhost:5000/api/brands
- Get products: http://localhost:5000/api/products

## Admin Panel Access

The backend uses HTTP Basic Authentication for admin operations.

**Credentials:**
- Username: `shishamt`
- Password: `Shishamt7894`

### Admin Operations

You can manage your data using tools like Postman, Insomnia, or curl:

#### Create a New Brand

```bash
curl -X POST http://localhost:5000/api/brands \
  -u shishamt:Shishamt7894 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Brand",
    "slug": "new-brand",
    "logo_url": "https://example.com/logo.png",
    "banner_url": "https://example.com/banner.png",
    "description": "Description of the brand",
    "visible": true,
    "in_navbar": true,
    "order": 6
  }'
```

#### Create a New Product

```bash
curl -X POST http://localhost:5000/api/products \
  -u shishamt:Shishamt7894 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Name",
    "brand": "best",
    "category": "mens",
    "description": "Product description",
    "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    "sizes": ["7", "8", "9", "10"],
    "status": "available",
    "featured": true
  }'
```

#### Update a Brand

```bash
curl -X PUT http://localhost:5000/api/brands/{brand_id} \
  -u shishamt:Shishamt7894 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Brand Name",
    "slug": "updated-slug",
    "logo_url": "https://example.com/new-logo.png",
    "banner_url": "https://example.com/new-banner.png",
    "description": "Updated description",
    "visible": true,
    "in_navbar": true,
    "order": 1
  }'
```

#### Delete a Brand

```bash
curl -X DELETE http://localhost:5000/api/brands/{brand_id} \
  -u shishamt:Shishamt7894
```

#### View Contact Messages

```bash
curl -X GET http://localhost:5000/api/messages \
  -u shishamt:Shishamt7894
```

## Frontend Integration

The frontend is configured to connect to the backend automatically. Make sure:

1. The backend is running on `http://localhost:5000`
2. The frontend `.env` file has `VITE_API_URL=http://localhost:5000/api`
3. Both servers are running simultaneously

### Running Both Servers

**Terminal 1 (Backend):**
```bash
cd backend
python app.py
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

## Data Management

### Brand Management

Brands control the sections shown on the homepage:
- **visible**: If false, brand won't appear to public users
- **in_navbar**: If true, brand appears in navigation menu
- **order**: Determines position (1-5 = direct navbar, 6+ = "More" dropdown)

### Product Management

Products are linked to brands via the `brand` field (use brand slug):
- **status**:
  - `available` - Normal product display
  - `coming_soon` - Shows "Coming Soon" overlay
  - `hidden` - Not visible to public
- **images**: Array of image URLs
- **sizes**: Array of available sizes

### Navbar Logic

The navigation dynamically updates based on brands:
- Brands with `in_navbar: true` and `order <= 5` appear directly in navbar
- Brands with `in_navbar: true` and `order > 5` appear in "More" dropdown
- When you add/edit/delete brands, the navbar automatically updates

## Image Management

Since MongoDB doesn't store binary files, all images are stored as URLs:

**Option 1: Use Existing Image Services**
- Pexels: Free stock photos
- Unsplash: Free high-quality images
- Your own CDN or hosting

**Option 2: Image Hosting Services**
- Cloudinary (free tier available)
- ImgBB (free)
- Imgur (free)

**Example workflow:**
1. Upload image to hosting service
2. Get the public URL
3. Use that URL in your brand/product data

## Troubleshooting

### Backend won't start
- Check Python version: `python --version` (should be 3.8+)
- Reinstall dependencies: `pip install -r requirements.txt --force-reinstall`
- Check if port 5000 is already in use

### Can't connect to MongoDB
- Verify internet connection
- Check MongoDB Atlas dashboard for cluster status
- Password should be: `Shishamt7894`

### Frontend not loading data
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Verify `.env` file has correct `VITE_API_URL`

### Admin authentication fails
- Username: `shishamt` (all lowercase)
- Password: `Shishamt7894` (exact case)
- Use Basic Auth header format

## Production Deployment

For production deployment:

1. Set `debug=False` in `app.py`
2. Use a production WSGI server (gunicorn):
   ```bash
   pip install gunicorn
   gunicorn app:app
   ```
3. Configure proper CORS settings (restrict origins)
4. Use environment variables for sensitive data
5. Enable HTTPS
6. Consider rate limiting for admin endpoints

## API Documentation

Full API documentation is available in `backend/README.md`

Key endpoints:
- Public: `/api/brands`, `/api/products`, `/api/messages` (POST)
- Admin: All CRUD operations require authentication
- Settings: `/api/settings` for site-wide configuration

## Need Help?

If you encounter issues:
1. Check the backend logs in the terminal
2. Review the API documentation
3. Test endpoints with curl or Postman
4. Verify MongoDB connection in Atlas dashboard
