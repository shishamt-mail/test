# ⚡ Quick Start Guide

Get your website and admin panel running in 5 minutes!

## 🚀 First Time Setup

### 1. Install Everything

```bash
# Install frontend
npm install

# Install backend
cd backend
pip install -r requirements.txt

# Setup database
python seed_data.py
```

## ▶️ Start Your Website

**Open 2 terminals:**

### Terminal 1: Backend
```bash
cd backend
python app.py
```
Keep this running ✅

### Terminal 2: Frontend
```bash
npm run dev
```
Keep this running ✅

## 🌐 Access Your Website

### Public Website
**http://localhost:5173/**

### Admin Panel
**http://localhost:5173/admin/login**

**Login:**
- Username: `shishamt`
- Password: `Shishamt7894`

## 📝 Quick Tasks

### Add a Product

1. Go to **Admin Panel → Products**
2. Click **"Add Product"**
3. Upload image to https://imgbb.com/
4. Fill form and paste image URL
5. Click **"Create Product"**
6. Done! ✨

### Add a Brand

1. Go to **Admin Panel → Brands**
2. Click **"Add Brand"**
3. Upload logo and banner to https://imgbb.com/
4. Fill form with URLs
5. Click **"Create Brand"**
6. Done! ✨

### View Messages

1. Go to **Admin Panel → Messages**
2. Click any message to view
3. Click **"Reply via Email"** to respond

## 📚 Full Documentation

- **Complete Setup:** `COMPLETE_SETUP_GUIDE.md`
- **Admin Guide:** `ADMIN_PANEL_GUIDE.md`
- **Image Upload:** `IMAGE_UPLOAD_GUIDE.md`
- **Backend Details:** `BACKEND_SETUP.md`

## 🆘 Troubleshooting

### Website not loading?
- Check both terminals are running
- Visit http://localhost:5173/

### Can't login?
- Username: `shishamt` (lowercase)
- Password: `Shishamt7894` (capital S)

### Image not showing?
- Use direct link from https://imgbb.com/
- URL should end with .jpg or .png

## ✅ You're Ready!

Your website is now running with a full admin panel. No coding required! 🎉

For detailed instructions, see `COMPLETE_SETUP_GUIDE.md`
