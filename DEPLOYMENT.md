# 🚀 Deployment Guide - Organ Hospital

Complete guide to deploy your Organ Hospital application on production servers.

---

## **Part 1: Backend Deployment (Node.js + Express)**

### Option 1: Deploy on Heroku (Easiest - Free tier removed but affordable)

1. **Create Heroku Account**: https://www.heroku.com/
2. **Install Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli

3. **Deploy Commands**:
```bash
cd Organ-Backend

# Login to Heroku
heroku login

# Create new app
heroku create organ-hospital-backend

# Set environment variables
heroku config:set MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/organDB
heroku config:set JWT_SECRET=your-secret-key-here
heroku config:set PORT=5000

# Deploy
git push heroku main
```

4. **View Live**:
```bash
heroku open
```

Backend URL: `https://organ-hospital-backend.herokuapp.com`

---

### Option 2: Deploy on Railway (Modern Alternative)

1. **Create Railway Account**: https://railway.app/

2. **Create New Project**:
   - Connect GitHub repo
   - Select `Organ-Backend` folder
   - Add MongoDB plugin
   - Set environment variables

3. **Environment Variables in Railway**:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/organDB
JWT_SECRET=your-secret-key-here
PORT=5000
```

Backend URL will be auto-generated! 🎉

---

### Option 3: Deploy on Render

1. **Create Render Account**: https://render.com/

2. **Create New Web Service**:
   - Connect GitHub
   - Select repository
   - Build command: `npm install`
   - Start command: `node server/server.js`
   - Add environment variables

3. **Environment Variables**:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/organDB
JWT_SECRET=your-secret-key-here
```

---

### Option 4: Deploy on AWS (Scalable)

1. **Using Elastic Beanstalk**:
```bash
# Install EB CLI
pip install awsebcli

cd Organ-Backend

# Initialize
eb init -p node.js-18 organ-hospital

# Create environment
eb create organ-hospital-env

# Deploy
eb deploy

# Open in browser
eb open
```

---

## **Part 2: Frontend Deployment (React + Vite)**

### Option 1: Deploy on Vercel (Recommended - Free)

1. **Create Vercel Account**: https://vercel.com/

2. **Select "Import Git Repository"**
   - Choose your OrganHospital repo
   - Select Organ-Frontend folder
   - Build settings:
     - Framework: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Add Environment Variable**:
   - Go to Settings → Environment Variables
   - Add: `VITE_API_URL=https://your-backend-url.com/api`

4. **Deploy** - Automatic! 🎉

Frontend URL: `https://organ-hospital.vercel.app`

---

### Option 2: Deploy on Netlify (Free)

1. **Create Netlify Account**: https://www.netlify.com/

2. **Connect Git Repository**:
   - Connect GitHub
   - Select repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Environment Variables**:
```
VITE_API_URL=https://your-backend-url.com/api
```

4. **Deploy** - Done! 🚀

---

### Option 3: Deploy on GitHub Pages

1. **Update vite.config.js**:
```javascript
export default {
  base: '/OrganHospital/',  // Your repo name
  plugins: [react()],
}
```

2. **Build**:
```bash
npm run build
```

3. **Deploy** - Push to GitHub:
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

4. **Enable GitHub Pages**:
   - Settings → Pages
   - Select `main` branch, `/root` folder

URL: `https://username.github.io/OrganHospital`

---

### Option 4: Deploy on AWS S3 + CloudFront

```bash
cd Organ-Frontend

# Build
npm run build

# Create S3 bucket
# Upload dist folder to S3
# Create CloudFront distribution
# Update API endpoint to backend
```

---

## **Part 3: Complete Deployment Strategy**

### Best Setup:

```
Frontend: Vercel (Automatic, Free)
    ↓
Backend: Railway or Render (Easy setup, affordable)
    ↓
Database: MongoDB Atlas (Cloud, Free tier available)
```

---

## **Step-by-Step for Beginners**

### **Step 1: Prepare Backend**

1. Update `Organ-Backend/package.json`:
```json
{
  "engines": {
    "node": "18.x"
  }
}
```

2. Create `Procfile` in Organ-Backend:
```
web: node server/server.js
```

### **Step 2: Prepare Frontend**

1. Create `Organ-Frontend/.env.production`:
```
VITE_API_URL=https://your-deployed-backend-url/api
```

2. Update `Organ-Frontend/src/services/api.js`:
```javascript
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});
```

### **Step 3: Deploy Backend First**

Choose one:
- **Railway**: Easiest for beginners
- **Heroku**: If you have account
- **Render**: Good free tier

### **Step 4: Deploy Frontend**

1. **For Vercel**:
   - Push to GitHub
   - Import at vercel.com
   - Select Organ-Frontend folder
   - Set VITE_API_URL in environment

2. **For Netlify**:
   - Push to GitHub
   - Connect at netlify.com
   - Set VITE_API_URL

---

## **Environment Variables Checklist**

### **Backend Requirements**:
```
✅ MONGO_URI = Your MongoDB connection string
✅ JWT_SECRET = Secret key for JWT
✅ PORT = 5000 (or auto)
```

### **Frontend Requirements**:
```
✅ VITE_API_URL = Your backend deployed URL
```

---

## **MongoDB Atlas Setup** (Free)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create account
3. Create new cluster (free tier)
4. Get connection string
5. Replace username/password
6. Use connection string as MONGO_URI

---

## **Testing After Deployment**

```bash
# Test backend
curl https://your-backend-url/api/donor

# Test frontend
# Open https://your-frontend-url in browser
# Try register/login
# Check console for API calls
```

---

## **Troubleshooting**

### **Backend not responding**:
- Check environment variables
- Verify MongoDB connection
- Check logs: `heroku logs --tail`

### **Frontend showing CORS errors**:
- Backend must have CORS enabled
- Update backend CORS settings:
```javascript
app.use(cors({
  origin: "https://your-frontend-url.com", 
  credentials: true
}));
```

### **Frontend not connecting to backend**:
- Check VITE_API_URL is set correctly
- Check browser console for errors
- Verify backend is accessible

---

## **Cost Breakdown (Approximate)**

| Service | Free Tier | Paid Starting |
|---------|-----------|---------------|
| Vercel (Frontend) | ✅ Yes | $20/month |
| Railway (Backend) | ✅ $5 credit | $5+/month |
| MongoDB Atlas | ✅ Yes (512MB) | $57/month |
| **Total** | **~$5-10/month** | **$82+/month** |

---

## **Quick Deploy Checklist**

- [ ] Remove localhost URLs from code
- [ ] Set all environment variables
- [ ] Build locally and test: `npm run build`
- [ ] Push latest code to GitHub
- [ ] Deploy backend first
- [ ] Get backend URL
- [ ] Set VITE_API_URL in frontend
- [ ] Deploy frontend
- [ ] Test all features:
  - [ ] Register
  - [ ] Login
  - [ ] Add Donor
  - [ ] Request Organ
  - [ ] View Videos

---

## **Recommended For You**

**Best setup for Beginners**:
1. **Backend**: Railway.app (5 min)
2. **Frontend**: Vercel (2 min)
3. **Database**: MongoDB Atlas (Free)

**Total Setup Time**: ~30 minutes
**Monthly Cost**: ~$5-10

---

## **Useful Links**

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- Heroku Docs: https://devcenter.heroku.com

---

**Ready to deploy? Start with Railway + Vercel! 🚀**
