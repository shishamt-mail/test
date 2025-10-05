# Admin Quick Reference Guide

Quick reference for common administrative tasks using the Daksh FootWear backend API.

## Admin Credentials
- **Username:** `shishamt`
- **Password:** `Shishamt7894`

## Base URL
```
http://localhost:5000/api
```

---

## Brand Management

### View All Brands (Including Hidden)
```bash
curl -u shishamt:Shishamt7894 http://localhost:5000/api/brands/all
```

### Add New Brand
```bash
curl -X POST http://localhost:5000/api/brands \
  -u shishamt:Shishamt7894 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Puma",
    "slug": "puma",
    "logo_url": "https://example.com/puma-logo.png",
    "banner_url": "https://example.com/puma-banner.jpg",
    "description": "Premium Sports Footwear",
    "visible": true,
    "in_navbar": true,
    "order": 6
  }'
```

**Fields Explained:**
- `name`: Brand display name
- `slug`: URL-friendly identifier (lowercase, no spaces)
- `logo_url`: Brand logo image URL
- `banner_url`: Section banner image URL
- `description`: Text shown below banner
- `visible`: true = show to public, false = hide
- `in_navbar`: true = appears in navigation menu
- `order`: Position (1-5 = direct navbar, 6+ = "More" dropdown)

### Update Existing Brand
```bash
# Replace {brand_id} with actual MongoDB _id
curl -X PUT http://localhost:5000/api/brands/{brand_id} \
  -u shishamt:Shishamt7894 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "BEST Collection",
    "slug": "best",
    "logo_url": "https://example.com/new-logo.png",
    "banner_url": "https://example.com/new-banner.jpg",
    "description": "Updated description",
    "visible": true,
    "in_navbar": true,
    "order": 1
  }'
```

### Delete Brand
```bash
# Replace {brand_id} with actual MongoDB _id
curl -X DELETE http://localhost:5000/api/brands/{brand_id} \
  -u shishamt:Shishamt7894
```

---

## Product Management

### View All Products
```bash
# All products
curl http://localhost:5000/api/products

# Products by brand
curl http://localhost:5000/api/products?brand=best

# Products by category
curl http://localhost:5000/api/products?category=mens

# Search products
curl http://localhost:5000/api/products?search=slipper
```

### Add New Product
```bash
curl -X POST http://localhost:5000/api/products \
  -u shishamt:Shishamt7894 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Running Shoes",
    "brand": "best",
    "category": "mens",
    "description": "High-quality running shoes with advanced cushioning",
    "images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    "sizes": ["7", "8", "9", "10", "11"],
    "status": "available",
    "featured": true
  }'
```

**Fields Explained:**
- `name`: Product name
- `brand`: Brand slug (must match existing brand)
- `category`: mens | womens | kids | unisex
- `description`: Product description text
- `images`: Array of image URLs (first image is primary)
- `sizes`: Array of available sizes as strings
- `status`: available | coming_soon | hidden
- `featured`: true = highlight product, false = normal

### Update Product
```bash
# Replace {product_id} with actual MongoDB _id
curl -X PUT http://localhost:5000/api/products/{product_id} \
  -u shishamt:Shishamt7894 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product Name",
    "brand": "walkaroo",
    "category": "womens",
    "description": "Updated description",
    "images": ["https://example.com/new-image.jpg"],
    "sizes": ["6", "7", "8", "9"],
    "status": "available",
    "featured": false
  }'
```

### Mark Product as Coming Soon
```bash
curl -X PUT http://localhost:5000/api/products/{product_id} \
  -u shishamt:Shishamt7894 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Sneaker Line",
    "brand": "action",
    "category": "unisex",
    "description": "Launching next month!",
    "images": ["https://example.com/preview.jpg"],
    "sizes": ["7", "8", "9", "10", "11", "12"],
    "status": "coming_soon",
    "featured": true
  }'
```

### Delete Product
```bash
# Replace {product_id} with actual MongoDB _id
curl -X DELETE http://localhost:5000/api/products/{product_id} \
  -u shishamt:Shishamt7894
```

---

## Message Management

### View All Contact Messages
```bash
curl -u shishamt:Shishamt7894 http://localhost:5000/api/messages
```

### Mark Message as Read
```bash
# Replace {message_id} with actual MongoDB _id
curl -X PUT http://localhost:5000/api/messages/{message_id}/read \
  -u shishamt:Shishamt7894
```

### Delete Message
```bash
# Replace {message_id} with actual MongoDB _id
curl -X DELETE http://localhost:5000/api/messages/{message_id} \
  -u shishamt:Shishamt7894
```

---

## Common Workflows

### Adding a New Brand Section

1. **Upload brand images** (logo and banner) to image hosting
2. **Create brand** using POST /api/brands
3. **Add products** to the brand using POST /api/products
4. **Verify** by visiting the homepage - new section appears automatically

### Hiding a Brand Temporarily

```bash
curl -X PUT http://localhost:5000/api/brands/{brand_id} \
  -u shishamt:Shishamt7894 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Brand Name",
    "slug": "brand-slug",
    "logo_url": "...",
    "banner_url": "...",
    "description": "...",
    "visible": false,
    "in_navbar": false,
    "order": 1
  }'
```

### Reordering Navbar Items

Update the `order` field for each brand:
- Order 1 = First in navbar
- Order 2 = Second in navbar
- ...and so on

Brands with same order are sorted alphabetically.

### Moving Brand to "More" Dropdown

Set `order` to 6 or higher:
```json
{
  "order": 6,
  "in_navbar": true
}
```

---

## Tips & Best Practices

### Image URLs
- Use reliable image hosting (Cloudinary, ImgBB, etc.)
- Ensure images are publicly accessible
- Use appropriate image sizes (logos: ~150x50px, banners: ~1200x400px, products: ~600x600px)
- Test URL in browser before using in API

### Brand Slugs
- Use lowercase
- Replace spaces with hyphens
- No special characters
- Example: "Action Shoes" → "action-shoes"

### Product Status
- `available`: Normal products, fully visible and clickable
- `coming_soon`: Shows overlay, not clickable, creates anticipation
- `hidden`: Completely hidden from public, useful for drafts

### Getting MongoDB _id
When you create a brand or product, the response includes the `_id`:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "...",
  ...
}
```

Use this ID for updates and deletes.

### Testing Changes
After making changes:
1. Refresh the frontend
2. Check that changes appear correctly
3. Test navigation updates
4. Verify product displays

---

## Error Codes

- **200**: Success
- **201**: Created successfully
- **401**: Authentication failed (check credentials)
- **404**: Item not found (check ID)
- **500**: Server error (check backend logs)

---

## Using Postman (Recommended for Non-Technical Users)

1. **Download Postman**: https://www.postman.com/downloads/
2. **Create new request**
3. **Set up authentication**:
   - Go to "Authorization" tab
   - Type: "Basic Auth"
   - Username: `shishamt`
   - Password: `Shishamt7894`
4. **Set URL**: `http://localhost:5000/api/brands`
5. **Set method**: GET, POST, PUT, or DELETE
6. **For POST/PUT**:
   - Go to "Body" tab
   - Select "raw" and "JSON"
   - Paste JSON data
7. **Click Send**

Postman provides a graphical interface and is much easier than using cURL commands.

---

## Quick Checklist for Going Live

- [ ] Seed database with real data
- [ ] Upload real brand logos and banners
- [ ] Add real product images
- [ ] Set correct brand order for navbar
- [ ] Test all products link correctly
- [ ] Verify contact form works
- [ ] Remove test/demo data
- [ ] Test on mobile devices
- [ ] Backup database before major changes

---

## Support Resources

- Full API Docs: `backend/README.md`
- Setup Guide: `BACKEND_SETUP.md`
- Implementation Details: `IMPLEMENTATION_SUMMARY.md`
- Backend Code: `backend/app.py`
