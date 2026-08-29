# Render Deployment Guide

## Prerequisites
- GitHub account with this repository
- Render account (https://render.com)

## Deployment Steps

### 1. Connect GitHub Repository
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub account if not already connected
4. Select this repository: `Raqamli-Beznis-Nazorati-UZ`

### 2. Configure Web Service
- **Name**: `company-app` (or your preferred name)
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Plan**: Choose `Free` or paid tier as needed

### 3. Environment Variables (Optional)
Add any environment variables in the Render dashboard:
- `NODE_ENV`: `production` (recommended)
- `PORT`: Leave blank to use Render's default

### 4. Deploy
1. Click "Create Web Service"
2. Render will automatically:
   - Pull code from GitHub
   - Install dependencies with `npm install`
   - Build the project with `npm run build`
   - Start the server with `npm start`

### 5. View Your App
Once deployed, your app will be available at:
`https://company-app.onrender.com` (or your chosen name)

## Auto-Deploy
The `render.yaml` file is configured for automatic deployment:
- Every push to main branch triggers a new deployment
- Deployment takes ~2-3 minutes

## Monitoring
- View logs in Render dashboard
- Check deployment status and restart if needed
- Monitor resource usage and performance

## Troubleshooting

### Build fails
- Check `npm install` works locally: `npm install`
- Check build works locally: `npm run build`
- Verify all dependencies are in `package.json`

### App doesn't start
- Check server.js is correct
- Verify `npm start` works locally
- Check logs in Render dashboard

### File not found errors
- Ensure `.gitignore` is properly configured
- Verify all source files are committed to Git
- Check dist folder is created during build

## Local Testing

To test locally as Render would run it:

```bash
# Install dependencies
npm install

# Build the app
npm run build

# Start the server
npm start
```

Then visit `http://localhost:3000`
