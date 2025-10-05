# Admin Panel User Guide

Welcome to the Daksh FootWear Admin Panel! This guide will help you manage your website easily without any coding knowledge.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Managing Brands](#managing-brands)
4. [Managing Products](#managing-products)
5. [Viewing Messages](#viewing-messages)
6. [Tips & Best Practices](#tips-best-practices)

---

## Getting Started

### Step 1: Access the Admin Panel

1. Open your web browser
2. Go to: `http://localhost:5173/admin/login`
3. You'll see the login page

### Step 2: Login

**Default Credentials:**
- Username: `shishamt`
- Password: `Shishamt7894`

**Important:** These credentials are case-sensitive!

### Step 3: After Login

You'll be taken to the Dashboard where you can see an overview of your website.

---

## Dashboard Overview

The Dashboard shows you:
- **Total Brands** - Number of brand sections on your website
- **Total Products** - Number of products in your catalog
- **Total Messages** - Customer inquiries received
- **Unread Messages** - Messages you haven't viewed yet

### Navigation Menu

On the left side, you'll see:
- **Dashboard** - Overview and quick stats
- **Brands** - Manage brand sections
- **Products** - Manage product catalog
- **Messages** - View customer inquiries

Click any menu item to navigate to that section.

---

## Managing Brands

Brands are the sections that appear on your homepage (like BEST, Walkaroo, Action, etc.).

### Viewing All Brands

1. Click **Brands** in the left menu
2. You'll see a table with all your brands
3. Each row shows:
   - **Order** - Position number (1, 2, 3, etc.)
   - **Brand** - Logo and name
   - **Status** - Visible or Hidden
   - **Navbar** - Whether it appears in navigation menu

### Adding a New Brand

1. Click the **Add Brand** button (top right)
2. Fill in the form:

   **Brand Name** (required)
   - Example: "Puma Sports"
   - This is what appears on your website

   **Slug** (auto-generated)
   - Automatically created from brand name
   - Used in the website URL
   - Example: "puma-sports"

   **Logo URL** (required)
   - Upload your logo to ImgBB.com
   - Copy the direct link
   - Paste it here
   - Recommended size: 150x50 pixels

   **Banner URL** (required)
   - Upload your banner image to ImgBB.com
   - Copy the direct link
   - Paste it here
   - Recommended size: 1200x400 pixels

   **Description** (required)
   - Brief text about the brand
   - Example: "Premium Athletic Footwear"
   - Shows below the banner on homepage

   **Display Order** (required)
   - Number from 1 onwards
   - Lower numbers appear first
   - Orders 1-5: Show directly in navbar
   - Orders 6+: Show in "More" dropdown

   **Visible on website** (checkbox)
   - ✓ Checked: Brand appears on website
   - ☐ Unchecked: Brand is hidden

   **Show in navigation** (checkbox)
   - ✓ Checked: Brand appears in top menu
   - ☐ Unchecked: Brand not in menu

3. Click **Create Brand**
4. Success! Your brand now appears on the website

### Editing a Brand

1. Find the brand in the table
2. Click the **pencil icon** (edit button)
3. Update any fields you want
4. Click **Update Brand**
5. Changes appear immediately on website

### Deleting a Brand

1. Find the brand in the table
2. Click the **trash icon** (delete button)
3. Confirm you want to delete
4. Brand is permanently removed

**Warning:** Deleting a brand doesn't delete its products. You'll need to delete those separately or assign them to another brand.

### Understanding Brand Order

**Example Setup:**
- Order 1: BEST Collection → Appears first in navbar
- Order 2: Walkaroo → Appears second in navbar
- Order 3: Action → Appears third in navbar
- Order 4: Brilliant → Appears fourth in navbar
- Order 5: Chinese → Appears fifth in navbar
- Order 6: Puma → Appears in "More" dropdown
- Order 7: Nike → Appears in "More" dropdown

---

## Managing Products

Products are the items you sell (shoes, slippers, etc.).

### Viewing All Products

1. Click **Products** in the left menu
2. You'll see cards showing each product
3. Each card displays:
   - Product image
   - Product name
   - Brand name
   - Description
   - Status badge (Available, Coming Soon, Hidden)
   - Category (Men's, Women's, etc.)

### Filtering Products

Use the dropdown at the top to filter by brand:
- **All Brands** - Shows everything
- **Specific Brand** - Shows only that brand's products

### Adding a New Product

1. Click the **Add Product** button (top right)
2. Fill in the form:

   **Product Name** (required)
   - Example: "Premium Running Shoes"
   - Clear, descriptive name

   **Brand** (required)
   - Select from dropdown
   - Must match an existing brand
   - Product will appear in this brand's section

   **Category** (required)
   - Men's
   - Women's
   - Kids
   - Unisex

   **Status** (required)
   - **Available** - Normal product, fully visible
   - **Coming Soon** - Shows "Coming Soon" overlay
   - **Hidden** - Not visible on website

   **Description** (required)
   - Brief product description
   - Example: "Lightweight running shoes with advanced cushioning"
   - Keep it concise

   **Product Images** (required)
   - Click "+ Add Another Image" for multiple images
   - Upload each image to ImgBB.com
   - Paste the direct link
   - First image is the main thumbnail
   - Recommended: 600x600 pixels (square)
   - You can add up to 10 images

   **Available Sizes** (required)
   - Enter sizes separated by commas
   - Example: "7, 8, 9, 10, 11"
   - Or: "S, M, L, XL"

   **Featured Product** (checkbox)
   - ✓ Checked: Highlights the product
   - ☐ Unchecked: Normal display

3. Click **Create Product**
4. Product now appears on the website!

### Editing a Product

1. Find the product card
2. Click the **Edit** button
3. Update any fields
4. Click **Update Product**
5. Changes are live immediately

### Deleting a Product

1. Find the product card
2. Click the **trash icon** button
3. Confirm deletion
4. Product is removed from website

### Product Status Guide

**Available:**
- Product is active and visible
- Customers can view all details
- Shows up in search and brand sections

**Coming Soon:**
- Shows product with "Coming Soon" badge
- Creates anticipation
- Product details are visible but marked as upcoming
- Good for pre-launch marketing

**Hidden:**
- Product is not visible anywhere on the website
- Useful for:
  - Products you're still setting up
  - Out of stock items you'll restock
  - Seasonal products off-season

---

## Viewing Messages

Customer inquiries from the Contact page appear here.

### Message Inbox

1. Click **Messages** in the left menu
2. Left side shows all messages
3. Right side shows selected message details

### Message List

Each message shows:
- Customer name
- Email address
- Preview of message
- Date received
- Unread indicator (blue dot)

### Viewing a Message

1. Click on any message in the list
2. Full message appears on the right
3. Message is automatically marked as read
4. Blue dot disappears

### Filtering Messages

Use the dropdown to filter:
- **All Messages** - Shows everything
- **Unread** - Only new messages
- **Read** - Messages you've viewed

### Responding to Messages

1. Select a message
2. Click **Reply via Email** button
3. Your email app opens with:
   - Customer's email pre-filled
   - Subject line ready
4. Type your response and send

### Deleting a Message

1. Select a message
2. Click the **trash icon** (top right)
3. Confirm deletion
4. Message is permanently removed

---

## Tips & Best Practices

### Image Management

**Always use image hosting:**
1. Go to https://imgbb.com/
2. Upload your image
3. Copy the direct link (ends with .jpg or .png)
4. Use in admin panel

**Image sizes:**
- Logos: 150x50 pixels
- Banners: 1200x400 pixels
- Products: 600x600 pixels

**Keep images under:**
- Logos: 500KB
- Banners: 2MB
- Products: 1MB each

### Brand Organization

**Good order structure:**
1. Most popular brand first
2. Second most popular
3. Third most popular
4. Others after that
5. New/test brands last

**Naming tips:**
- Use clear, recognizable names
- Keep descriptions short (one line)
- Use high-quality logos

### Product Management

**Quality photos:**
- Use good lighting
- Plain white/light background
- Show product clearly
- Multiple angles (front, side, top)
- Consistent style across all products

**Descriptions:**
- Keep them brief but informative
- Highlight key features
- Use simple language
- Example: "Comfortable PU slippers with cushioned sole"

**Sizes:**
- List all available sizes
- Use consistent format
- Example: 7, 8, 9, 10, 11 (not 7, 8", nine, 10)

### Regular Maintenance

**Weekly tasks:**
- Check new messages
- Reply to customer inquiries
- Update "Coming Soon" products that are now available

**Monthly tasks:**
- Review all products
- Update descriptions if needed
- Add new products
- Check all images still load

**As needed:**
- Add new brands when you get new suppliers
- Mark out-of-stock items as "Hidden"
- Update brand order if priorities change

### Common Workflows

**Adding a new product line:**
1. Add the brand first
2. Upload all product images
3. Add products one by one
4. Review on website
5. Make adjustments as needed

**Seasonal updates:**
1. Mark off-season products as "Hidden"
2. Add new season products
3. Update featured products
4. Update homepage order

**Dealing with stock:**
- Out of stock: Set status to "Hidden"
- Back in stock: Change status to "Available"
- Pre-order: Set status to "Coming Soon"

---

## Troubleshooting

### Can't login
- Check username and password (case-sensitive!)
- Make sure backend is running
- Try refreshing the page

### Images not showing
- Verify the URL is a direct link (ends with .jpg, .png, etc.)
- Check the image hosting service is working
- Try uploading to a different service

### Changes not appearing on website
- Refresh the website (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache
- Wait a few seconds and try again

### Backend not connected
- Make sure Flask backend is running (python app.py)
- Check the terminal for errors
- Restart the backend if needed

---

## Quick Reference

### Access URLs
- **Admin Login:** http://localhost:5173/admin/login
- **Website:** http://localhost:5173/

### Credentials
- **Username:** shishamt
- **Password:** Shishamt7894

### Image Hosting
- **Quick upload:** https://imgbb.com/
- **Professional:** https://cloudinary.com/

### Support Files
- Full image guide: See `IMAGE_UPLOAD_GUIDE.md`
- Backend setup: See `BACKEND_SETUP.md`
- Technical docs: See `IMPLEMENTATION_SUMMARY.md`

---

## Safety Tips

### Before Making Changes:
1. Know what you're changing
2. Have image URLs ready
3. Keep a backup list of important data

### Good Practices:
- Don't delete brands with products
- Test changes by viewing the website
- Keep credentials secure
- Don't share admin password

### If Something Goes Wrong:
1. Don't panic!
2. The backend has all your data
3. Contact technical support
4. Avoid making more changes until issue is fixed

---

## You're All Set!

You now have everything you need to manage your website. Remember:
- Start small - add one brand and one product first
- View changes on the website to see how they look
- Use good quality images
- Keep descriptions clear and simple

Happy managing! 🎉
