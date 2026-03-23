# 🚀 NeuroNexus - Deployment Guide

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager
- Git (optional)

### Local Development

1. **Install dependencies:**
```bash
npm install
# or
pnpm install
```

2. **Configure Backend URL:**
Edit `/src/app/services/api.ts`:
```typescript
const BASE_URL = 'http://YOUR_BACKEND_URL/api';
```

3. **Start development server:**
```bash
npm run dev
# or
pnpm dev
```

4. **Open in browser:**
```
http://localhost:5173
```

## 🔧 Environment Configuration

### Backend URL
The base API URL is configured in `/src/app/services/api.ts`:
```typescript
const BASE_URL = 'http://YOUR_BACKEND_URL/api';
```

For development, you might use:
- Local: `http://localhost:3000/api`
- Staging: `https://staging-api.neuronexus.app/api`
- Production: `https://api.neuronexus.app/api`

### Mock Mode
The app currently works in mock mode without a backend:
- Demo login: `demo@neuronexus.app` / `demo123`
- All API calls have fallback mock responses
- Perfect for testing and development

## 📦 Production Build

### Build for Production
```bash
npm run build
# or
pnpm build
```

This creates an optimized production build in the `/dist` directory.

### Preview Production Build
```bash
npm run preview
# or
pnpm preview
```

## 🌐 Deployment Options

### 1. Vercel (Recommended)
Perfect for React applications:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

**vercel.json:**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### 2. Netlify
1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add redirect rules in `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. GitHub Pages
```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

### 4. AWS S3 + CloudFront
1. Build the app: `npm run build`
2. Upload `dist/` to S3 bucket
3. Enable static website hosting
4. Create CloudFront distribution
5. Point domain to CloudFront

### 5. Docker
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    index index.html;
    try_files $uri $uri/ /index.html;
  }
}
```

Build and run:
```bash
docker build -t neuronexus .
docker run -p 80:80 neuronexus
```

## 🔒 Production Checklist

### Security
- [ ] Update API base URL to production backend
- [ ] Enable HTTPS for all API calls
- [ ] Implement rate limiting on backend
- [ ] Add CORS configuration on backend
- [ ] Secure JWT token storage
- [ ] Add CSP (Content Security Policy) headers

### Performance
- [ ] Enable gzip/brotli compression
- [ ] Add CDN for static assets
- [ ] Implement service worker for caching
- [ ] Optimize images and assets
- [ ] Enable HTTP/2

### SEO & Meta
- [ ] Add meta tags for social sharing
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Configure analytics (Google Analytics, etc.)
- [ ] Add favicon and app icons

### Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure analytics
- [ ] Add performance monitoring
- [ ] Set up uptime monitoring
- [ ] Configure logging

## 🧪 Testing Before Deployment

### Pre-deployment Tests
```bash
# Build check
npm run build

# Preview build
npm run preview

# Test in production mode
# Open http://localhost:4173
```

### Manual Testing Checklist
- [ ] Login/Register works
- [ ] All screens load correctly
- [ ] Dark mode toggle works
- [ ] API calls succeed (or fallback to mock)
- [ ] Mobile responsive
- [ ] Charts render properly
- [ ] Navigation works
- [ ] Toast notifications appear

## 📱 PWA Setup (Progressive Web App)

To make NeuroNexus installable on mobile:

1. **Install vite-plugin-pwa:**
```bash
npm install -D vite-plugin-pwa
```

2. **Update vite.config.ts:**
```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'NeuroNexus',
        short_name: 'NeuroNexus',
        description: 'ADHD-friendly productivity app',
        theme_color: '#a855f7',
        background_color: '#fafafa',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

3. **Create icons:**
- 192x192 icon at `/public/icon-192.png`
- 512x512 icon at `/public/icon-512.png`

## 🌍 Domain Configuration

### Custom Domain Setup

1. **Purchase domain** (namecheap, godaddy, etc.)

2. **DNS Configuration:**
```
Type    Name    Value
A       @       your-server-ip
CNAME   www     your-domain.com
```

3. **SSL Certificate** (Let's Encrypt):
```bash
# For nginx
sudo certbot --nginx -d neuronexus.app -d www.neuronexus.app
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 📊 Analytics Setup

### Google Analytics
Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Error Tracking

### Sentry Setup
```bash
npm install @sentry/react
```

In `App.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

## 📈 Performance Optimization

### Build Optimization
Already included in vite:
- Tree shaking
- Code splitting
- Minification
- CSS optimization

### Runtime Optimization
- Lazy load routes: ✅ (React Router)
- Image optimization: Use WebP format
- Font optimization: System fonts used
- Bundle size: Monitor with `npm run build`

## 🚨 Troubleshooting

### Common Issues

**1. Blank page after deployment:**
- Check browser console for errors
- Verify base URL in vite.config.ts
- Check routing configuration

**2. API calls failing:**
- Update BASE_URL in api.ts
- Check CORS settings on backend
- Verify network requests in DevTools

**3. Dark mode not persisting:**
- Check localStorage is enabled
- Verify theme persistence logic

**4. Charts not rendering:**
- Ensure recharts is installed
- Check responsive container sizing

## 📝 Post-Deployment

### After going live:
1. Share demo credentials if needed
2. Monitor error logs
3. Check analytics
4. Gather user feedback
5. Plan v2 features

## 🎉 Launch Checklist

- [ ] Production build successful
- [ ] All features tested
- [ ] Backend API connected
- [ ] SSL certificate active
- [ ] Analytics configured
- [ ] Error tracking setup
- [ ] PWA manifest configured
- [ ] Meta tags added
- [ ] Performance tested
- [ ] Mobile tested
- [ ] Documentation updated
- [ ] Backup plan ready

---

**Ready to launch NeuroNexus! 🚀**

For support, refer to README.md and FEATURES.md
