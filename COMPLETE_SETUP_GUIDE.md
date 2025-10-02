# Complete Setup Guide - Daksh FootWear Website & Admin Panel

This guide walks you through setting up your complete website with the admin panel from scratch.

## What You're Getting

✅ Full e-commerce footwear website
✅ Dynamic brand sections
✅ Product catalog
✅ Contact form with message inbox
✅ Easy-to-use admin panel (NO coding required!)
✅ Backend API with MongoDB cloud database

---

## Part 1: Initial Setup (One-Time Only)

### Prerequisites

Make sure you have these installed:
- Node.js (for frontend)
- Python 3.8+ (for backend)
- A web browser (Chrome, Firefox, etc.)

### Step 1: Install Frontend Dependencies

```bash
npm install
```

This installs all the website dependencies. Wait for it to complete (may take 2-3 minutes).

### Step 2: Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

This installs Flask and MongoDB drivers for the backend.

### Step 3: Setup Database with Initial Data

```bash
python seed_data.py
```

This creates:
- 5 brand sections (BEST, Walkaroo, Action, Brilliant, Chinese)
- 6 sample products
- Database structure

You should see:
```
Starting database seeding...
Inserted 5 brands
Inserted 6 products
Database seeding completed!
```

---

## Part 2: Starting Your Website (Every Time)

You need to run TWO servers - backend and frontend.

### Terminal 1: Start Backend Server

```bash
cd backend
python app.py
```

You should see:
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

**Keep this terminal running!** Don't close it.

### Terminal 2: Start Frontend Server

Open a NEW terminal window:

```bash
npm run dev
```

You should see:
```
  VITE ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

**Keep this terminal running too!**

---

## Part 3: Accessing Your Website

### Public Website
Open browser and go to: **http://localhost:5173/**

You'll see:
- Homepage with hero section
- Brand sections (BEST, Walkaroo, Action, etc.)
- Navigation menu
- Contact page

### Admin Panel
Open browser and go to: **http://localhost:5173/admin/login**

Login with:
- **Username:** shishamt
- **Password:** Shishamt7894

You'll access the admin dashboard where you can:
- Add/edit/delete brands
- Add/edit/delete products
- View customer messages
- Manage everything easily!

---

## Part 4: Using the Admin Panel

### First Time Login

1. Go to http://localhost:5173/admin/login
2. Enter credentials (username: shishamt, password: Shishamt7894)
3. Click "Sign In"
4. You're in the dashboard!

### Dashboard Overview

You'll see 4 boxes showing:
- Total Brands (currently 5)
- Total Products (currently 6)
- Total Messages (currently 0)
- Unread Messages (currently 0)

### Quick Start: Adding Your First Product

1. **Click "Products"** in the left menu

2. **Click "Add Product"** button

3. **Prepare your product image:**
   - Go to https://imgbb.com/
   - Upload your product image
   - Click "Copy link" (the direct link)

4. **Fill the form:**
   - Name: "My New Product"
   - Brand: Select one (e.g., "BEST")
   - Category: Select one (e.g., "Men's")
   - Status: "Available"
   - Description: "Brief description here"
   - Images: Paste the ImgBB link
   - Sizes: "7, 8, 9, 10, 11"

5. **Click "Create Product"**

6. **View on website:**
   - Open http://localhost:5173/
   - Scroll to the brand section you selected
   - Your product is there!

### Adding a New Brand Section

1. **Click "Brands"** in the left menu

2. **Click "Add Brand"** button

3. **Prepare your images:**
   - Logo: 150x50 pixels
   - Banner: 1200x400 pixels
   - Upload both to https://imgbb.com/
   - Copy both direct links

4. **Fill the form:**
   - Name: "New Brand Name"
   - Logo URL: Paste link
   - Banner URL: Paste link
   - Description: "Brief description"
   - Display Order: 6 (or next number)
   - Check both checkboxes (Visible, In navbar)

5. **Click "Create Brand"**

6. **Check website:**
   - Refresh homepage
   - New brand section appears!
   - Check navigation menu

### Viewing Customer Messages

1. **Click "Messages"** in left menu

2. **Test it:**
   - Go to http://localhost:5173/contact
   - Fill and submit the form
   - Go back to admin Messages section
   - You'll see the new message!

3. **Click on message** to view details

4. **Click "Reply via Email"** to respond

---

## Part 5: Image Management Made Easy

Since MongoDB can't store image files, you need to use image hosting.

### Recommended: ImgBB (Easiest!)

**Why ImgBB:**
- Free forever
- No account needed
- Fast uploads
- Instant direct links

**How to use:**

1. **Go to https://imgbb.com/**

2. **Drag and drop your image** or click to browse

3. **Wait for upload** (few seconds)

4. **Copy the direct link:**
   - Look for "Direct link" option
   - Click "Copy"
   - Or right-click image and "Copy image address"

5. **Paste in admin panel:**
   - In any URL field
   - Logo URL, Banner URL, or Product Image URL

6. **Done!** Image is now on your website

### Alternative: Cloudinary (Professional)

If you want more control:

1. **Create account:** https://cloudinary.com/users/register/free

2. **Upload images** to Media Library

3. **Copy secure URL** for each image

4. **Use in admin panel**

**Benefits:**
- Image optimization
- Automatic resizing
- CDN delivery
- Free tier: 25GB storage

See `IMAGE_UPLOAD_GUIDE.md` for detailed instructions.

---

## Part 6: Common Tasks

### Adding Multiple Products

**Efficient workflow:**

1. Prepare all product images first
2. Upload all to ImgBB in one session
3. Keep a notepad with all URLs
4. Add products one by one using your URL list
5. Much faster than doing one at a time!

### Changing Navbar Order

Want to reorder brands in the navigation?

1. Go to **Brands** section
2. Click **Edit** on a brand
3. Change the **Display Order** number
4. Lower numbers appear first
5. Save changes
6. Refresh website to see new order

### Marking Products as "Coming Soon"

1. Go to **Products** section
2. Click **Edit** on product
3. Change **Status** to "Coming Soon"
4. Save
5. Product now shows "Coming Soon" badge on website

### Hiding Out-of-Stock Items

1. Go to **Products** section
2. Click **Edit** on product
3. Change **Status** to "Hidden"
4. Save
5. Product disappears from website (but stays in database)

When back in stock:
1. Edit again
2. Change **Status** to "Available"
3. Save
4. Product reappears!

---

## Part 7: Maintenance & Best Practices

### Daily Tasks

✅ Check Messages section for new inquiries
✅ Respond to customer questions

### Weekly Tasks

✅ Review product inventory
✅ Update "Coming Soon" products when available
✅ Check all images are loading correctly

### Monthly Tasks

✅ Review brand order (is it still optimal?)
✅ Update product descriptions if needed
✅ Add new products
✅ Archive old messages

### Before Adding Content

Always prepare:
1. ✅ Images uploaded to ImgBB
2. ✅ URLs copied and ready
3. ✅ Product names and descriptions written
4. ✅ Size information ready

This makes adding content much faster!

---

## Part 8: Troubleshooting

### Website Not Loading

**Problem:** Page shows error or won't load

**Solution:**
1. Check both terminals are running
2. Backend should show: "Running on http://0.0.0.0:5000"
3. Frontend should show: "Local: http://localhost:5173/"
4. If not, restart both servers

### Can't Login to Admin

**Problem:** Invalid username or password

**Solution:**
1. Check spelling: `shishamt` (all lowercase)
2. Check spelling: `Shishamt7894` (capital S)
3. Make sure backend is running
4. Clear browser cookies and try again

### Images Not Showing

**Problem:** Broken image icon on website

**Solution:**
1. Check URL is a direct link (ends with .jpg, .png, .gif)
2. Open URL in new browser tab - does it work?
3. Re-upload image to ImgBB
4. Copy new URL and update in admin panel

### Changes Not Appearing

**Problem:** Made changes but website looks the same

**Solution:**
1. Hard refresh browser: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
2. Wait 2-3 seconds and refresh again
3. Check you saved changes in admin panel
4. Check backend terminal for errors

### Backend Connection Failed

**Problem:** Admin panel shows "Connection error"

**Solution:**
1. Check backend terminal - is it running?
2. Look for errors in backend terminal
3. Restart backend: Press `Ctrl+C`, then run `python app.py` again
4. Check MongoDB Atlas is accessible (internet connection)

---

## Part 9: File Structure Overview

Understanding where everything is:

```
project/
├── backend/                    # Backend server files
│   ├── app.py                 # Main backend server
│   ├── seed_data.py          # Database setup script
│   └── requirements.txt       # Python dependencies
│
├── src/                       # Frontend source code
│   ├── pages/
│   │   ├── admin/            # Admin panel pages
│   │   │   ├── AdminLogin.jsx      # Login page
│   │   │   ├── Dashboard.jsx       # Admin dashboard
│   │   │   ├── BrandsManager.jsx   # Brand management
│   │   │   ├── ProductsManager.jsx # Product management
│   │   │   └── MessagesInbox.jsx   # Message inbox
│   │   ├── ContactPage.jsx    # Public contact page
│   │   └── ProductPage.jsx    # Public product page
│   │
│   └── components/            # Reusable components
│       ├── Navigation.jsx     # Top menu
│       └── BrandSections.jsx  # Homepage sections
│
├── .env                       # Configuration file
└── Documentation files:
    ├── ADMIN_PANEL_GUIDE.md        # You are here!
    ├── IMAGE_UPLOAD_GUIDE.md       # Image hosting help
    ├── BACKEND_SETUP.md            # Backend details
    └── IMPLEMENTATION_SUMMARY.md   # Technical overview
```

---

## Part 10: Important Notes

### About the Database

- Your database is hosted on MongoDB Atlas (cloud)
- It's already configured and working
- Data persists even if you close the servers
- Accessible from anywhere with internet

### About Images

- MongoDB doesn't store actual image files
- Images must be hosted externally (ImgBB, Cloudinary, etc.)
- You store the URL in the database
- Images load directly from the hosting service

### About Admin Access

- Only accessible at `/admin/login`
- Protected by username/password
- Sessions stored in browser
- Logout clears the session

### Security Notes

- Backend uses Basic Authentication
- Credentials are checked on every admin request
- Not visible to website visitors
- Admin panel only accessible with correct login

---

## Part 11: Next Steps

### Now that everything is set up:

1. ✅ **Customize Content:**
   - Replace sample brands with your actual brands
   - Add your real products
   - Upload your brand logos and banners

2. ✅ **Test Everything:**
   - Add a test product
   - View it on the website
   - Submit a contact form
   - Check message in admin panel

3. ✅ **Organize Your Images:**
   - Set up a Cloudinary account
   - Upload all your images there
   - Keep them organized in folders

4. ✅ **Regular Updates:**
   - Add new products as you get them
   - Update "Coming Soon" items
   - Respond to customer messages

### Going Live (Future)

When ready to deploy to a real website:
1. Get web hosting
2. Deploy backend to server (Heroku, DigitalOcean, etc.)
3. Deploy frontend to Netlify or Vercel
4. Update environment variables
5. Point your domain to the servers

(You'll need technical help for this part)

---

## Quick Reference Card

### Starting Servers

```bash
# Terminal 1 - Backend
cd backend
python app.py

# Terminal 2 - Frontend
npm run dev
```

### Important URLs

- **Website:** http://localhost:5173/
- **Admin Login:** http://localhost:5173/admin/login
- **Image Upload:** https://imgbb.com/

### Admin Credentials

- **Username:** shishamt
- **Password:** Shishamt7894

### Quick Actions

| Task | Location | Button |
|------|----------|--------|
| Add Brand | Brands → Add Brand | Top right |
| Add Product | Products → Add Product | Top right |
| View Messages | Messages | Left menu |
| Edit Item | Any list | Pencil icon |
| Delete Item | Any list | Trash icon |

---

## Getting Help

### Documentation Files

- **This guide:** `COMPLETE_SETUP_GUIDE.md`
- **Admin usage:** `ADMIN_PANEL_GUIDE.md`
- **Image help:** `IMAGE_UPLOAD_GUIDE.md`
- **Backend details:** `BACKEND_SETUP.md`
- **Technical info:** `IMPLEMENTATION_SUMMARY.md`

### Common Questions

**Q: Do I need to code?**
A: No! The admin panel is completely visual. Just fill forms and upload images.

**Q: Where do I upload images?**
A: Use https://imgbb.com/ - it's free and easy. See `IMAGE_UPLOAD_GUIDE.md`.

**Q: Can I change the password?**
A: Yes, but you'll need to edit the `backend/app.py` file (technical).

**Q: How do I backup my data?**
A: Your data is in MongoDB Atlas cloud. It's automatically backed up.

**Q: Can multiple people use the admin panel?**
A: Yes, but they'll all use the same login. Only one admin account exists.

---

## Success Checklist

Before you start using the system, make sure:

- ✅ Both servers start without errors
- ✅ Website opens at http://localhost:5173/
- ✅ Can login to admin panel
- ✅ Dashboard shows stats
- ✅ Can view existing brands and products
- ✅ Understand how to upload images
- ✅ Have ImgBB bookmarked

If all checks pass - **you're ready to go!** 🎉

---

## Support

If something doesn't work:
1. Check this guide thoroughly
2. Review the troubleshooting section
3. Check terminal windows for error messages
4. Try restarting both servers
5. Read relevant documentation file

Remember: Most issues are solved by:
- Restarting the servers
- Hard refreshing the browser
- Checking image URLs are direct links
- Verifying both servers are running

---

**You're all set! Start managing your website with confidence.** 🚀
