# Admin Panel Troubleshooting Guide

## "Failed to save brand" Error

If you see this error when trying to add a brand, follow these steps:

### Step 1: Check Backend is Running

Make sure the backend terminal shows:
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

If not, restart it:
```bash
cd backend
python app.py
```

### Step 2: Check Browser Console

1. Open browser Developer Tools (F12 or Right-click → Inspect)
2. Go to "Console" tab
3. Try adding a brand again
4. Look for error messages (in red)

**Common errors and solutions:**

#### Error: "Failed to fetch" or "Network error"
**Cause:** Backend not running or wrong URL

**Solution:**
- Check backend is running on port 5000
- Verify `.env` has: `VITE_API_URL=http://localhost:5000/api`
- Restart both servers

#### Error: "401 Unauthorized"
**Cause:** Authentication issue

**Solution:**
- Logout and login again
- Clear browser localStorage
- Check credentials are correct

#### Error: "500 Internal Server Error"
**Cause:** Backend error (check backend terminal)

**Solution:**
- Look at backend terminal for Python errors
- Most common: Missing required field
- Check all form fields are filled

### Step 3: Check Backend Terminal

Look at the backend terminal for error messages like:
```
Error creating brand: KeyError: 'name'
```

This means a required field is missing.

### Step 4: Verify Form Data

Make sure you filled all required fields marked with `*`:
- ✅ Brand Name
- ✅ Slug (auto-filled)
- ✅ Logo URL
- ✅ Banner URL
- ✅ Description
- ✅ Display Order

### Step 5: Check Image URLs

Make sure your image URLs are:
- ✅ Direct links (end with .jpg, .png, .gif)
- ✅ Publicly accessible
- ✅ From reliable hosting (imgbb.com)

**Test your URL:**
- Copy the URL
- Open new browser tab
- Paste and visit the URL
- You should see just the image

**Bad URL examples:**
```
https://imgbb.com/album/xyz (album page)
C:\Users\Desktop\image.jpg (local file)
```

**Good URL examples:**
```
https://i.ibb.co/xYzAbcd/brand-logo.png
https://i.imgur.com/AbCd123.jpg
```

## Other Common Issues

### Can't Login to Admin

**Symptoms:** "Invalid username or password"

**Solutions:**
1. Check spelling: `shishamt` (all lowercase)
2. Check spelling: `Shishamt7894` (capital S)
3. Clear browser cache
4. Use incognito/private window

### Dashboard Shows "Backend Not Connected"

**Symptoms:** Stats show 0 or error message

**Solutions:**
1. Restart backend server
2. Check MongoDB Atlas is accessible
3. Check internet connection
4. Wait a few seconds and refresh

### Changes Not Appearing on Website

**Symptoms:** Added brand/product but not visible

**Solutions:**
1. Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
2. Check brand visibility is set to "true"
3. Check product status is "Available"
4. Clear browser cache

### Images Not Loading

**Symptoms:** Broken image icons

**Solutions:**
1. Check URL is direct link
2. Re-upload to imgbb.com
3. Get new direct link
4. Update in admin panel

## Debug Mode - Getting More Info

To see detailed error messages:

### In Browser:
1. Press F12 to open Developer Tools
2. Go to "Console" tab
3. Try the action again
4. Screenshot any errors in red
5. Check "Network" tab for failed requests

### In Backend:
The backend now logs detailed info:
```
Received brand data: {...}
Inserting brand: {...}
Brand created successfully with ID: ...
```

Or if there's an error:
```
Error creating brand: ...
```

Watch the backend terminal when you try to add a brand.

## Quick Fixes

### Fix 1: Restart Everything
```bash
# Stop both servers (Ctrl+C in each terminal)

# Terminal 1 - Backend
cd backend
python app.py

# Terminal 2 - Frontend
npm run dev
```

### Fix 2: Clear Browser Data
1. Open Developer Tools (F12)
2. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Clear all data
4. Refresh page
5. Login again

### Fix 3: Reset Authentication
```javascript
// In browser console (F12 → Console), type:
localStorage.clear()
// Then refresh page and login again
```

## Testing the Connection

### Test 1: Health Check
Open in browser: http://localhost:5000/api/health

Should show:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

### Test 2: Get Brands
Open in browser: http://localhost:5000/api/brands

Should show:
```json
[
  {
    "_id": "...",
    "name": "BEST",
    ...
  },
  ...
]
```

### Test 3: Admin Endpoint
Use curl or Postman:
```bash
curl -u shishamt:Shishamt7894 http://localhost:5000/api/brands/all
```

Should return list of all brands.

## Still Not Working?

### Collect This Information:

1. **Error message shown in browser**
2. **Browser console errors** (F12 → Console)
3. **Backend terminal output**
4. **Network tab errors** (F12 → Network → Failed requests)

### Check:
- ✅ Both servers running?
- ✅ Correct URLs in .env file?
- ✅ Internet connection working?
- ✅ MongoDB Atlas accessible?
- ✅ Using correct credentials?

### Common Final Solutions:

**If nothing else works:**

1. **Restart computer** (seriously, sometimes helps!)

2. **Re-clone/download project** (if files corrupted)

3. **Check firewall** (might be blocking port 5000 or 5173)

4. **Try different browser** (Chrome, Firefox, Edge)

5. **Check Python/Node versions:**
   ```bash
   python --version  # Should be 3.8+
   node --version    # Should be 14+
   ```

## Getting Help

When asking for help, provide:

1. What you were trying to do
2. Error message you saw
3. Browser console errors
4. Backend terminal output
5. Screenshots if possible

## Prevention Tips

To avoid issues in the future:

1. ✅ Always fill all required fields
2. ✅ Use direct image links from imgbb.com
3. ✅ Test image URLs before using them
4. ✅ Keep both servers running
5. ✅ Don't close terminal windows
6. ✅ Save work regularly
7. ✅ Hard refresh after changes

## Success Checklist

Before reporting an issue, verify:

- [ ] Backend shows "Running on http://0.0.0.0:5000"
- [ ] Frontend shows "Local: http://localhost:5173/"
- [ ] Can access http://localhost:5173/
- [ ] Can login to admin panel
- [ ] Dashboard loads without errors
- [ ] All form fields are filled correctly
- [ ] Image URLs are direct links
- [ ] Checked browser console for errors
- [ ] Checked backend terminal for errors

If all boxes checked and still failing, the issue is likely:
- Network/firewall problem
- MongoDB Atlas connection issue
- Corrupted installation

## Emergency Reset

If everything is broken:

```bash
# Stop all servers
# Close all terminals

# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Restart backend
cd backend
python app.py

# Restart frontend (new terminal)
npm run dev

# Clear browser completely
# Login again
```

This fresh start fixes 90% of persistent issues!
