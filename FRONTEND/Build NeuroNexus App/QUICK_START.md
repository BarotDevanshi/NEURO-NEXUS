# ⚡ NeuroNexus - Quick Start Guide

## 🚀 Get Running in 60 Seconds

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# http://localhost:5173

# 4. Login with demo account
# Email: demo@neuronexus.app
# Password: demo123
```

**Done! App is running! 🎉**

---

## 📱 What You'll See

### Login Screen
- Beautiful gradient background
- Email/Password fields
- Demo credentials shown

### Home Screen (Main Feed)
1. **Header** - Welcome message with your name
2. **AI Recommendation** - Purple gradient card with tips
3. **Mood Tracker** - Select emoji for your mood
4. **Task Dumpyard** - Add and manage tasks
5. **Sleep Tracker** - Log sleep times

### Bottom Navigation (5 Tabs)
- 🏠 **Home** - Main feed
- 📊 **Dashboard** - Charts and stats
- 💬 **AI Chat** - Talk to AI assistant
- 🎮 **Games** - Mind relaxation games
- 👤 **Profile** - Settings and dark mode

---

## 🎨 Try These Features

### 1. Track Your Mood
1. Go to Home screen
2. Tap a mood emoji (😊 😌 😰 😢)
3. Read the feedback
4. Click "Save Mood"
5. Go to Dashboard to see mood chart

### 2. Add a Task
1. Type task in "What needs to be done?"
2. Select priority (High/Medium/Low)
3. Click "Add" or press Enter
4. Check off when complete
5. See progress in Dashboard

### 3. Try AI Chat
1. Tap "AI Chat" in bottom nav
2. Type a message
3. Get AI response
4. WhatsApp-style interface

### 4. Play a Game
1. Go to Games screen
2. Try "Breathing Exercise" for calm
3. Play "Memory Match" for focus
4. Tap "Focus Clicker" for fun

### 5. Toggle Dark Mode
1. Go to Profile screen
2. Toggle Dark Mode switch 🌙
3. Entire app changes theme
4. Preference is saved

---

## 🔧 Quick Configuration

### Connect Your Backend

**File:** `/src/app/services/api.ts`

```typescript
// Change this line:
const BASE_URL = 'http://YOUR_BACKEND_URL/api';

// To your backend URL:
const BASE_URL = 'https://api.example.com/api';
```

That's it! App will now use your real backend.

---

## 📂 File Locations Cheat Sheet

| What | Where |
|------|-------|
| Add component | `/src/app/components/` |
| Add screen | `/src/app/screens/` |
| API calls | `/src/app/services/api.ts` |
| Auth logic | `/src/app/context/AuthContext.tsx` |
| Theme colors | `/src/styles/theme.css` |
| Routes | `/src/app/routes.tsx` |
| Bottom nav | `/src/app/components/BottomNav.tsx` |

---

## 🎯 Common Tasks

### Add a New Screen

1. **Create screen file:**
```typescript
// /src/app/screens/MyNewScreen.tsx
export const MyNewScreen = () => {
  return (
    <div className="p-4 pb-24">
      <h1>My New Screen</h1>
    </div>
  );
};
```

2. **Add route:**
```typescript
// /src/app/routes.tsx
import { MyNewScreen } from './screens/MyNewScreen';

// In routes array:
{ path: 'mynew', element: <MyNewScreen /> }
```

3. **Add nav item (optional):**
```typescript
// /src/app/components/BottomNav.tsx
{ path: '/mynew', label: 'New', icon: Star }
```

### Add API Endpoint

```typescript
// /src/app/services/api.ts

export const myService = {
  getData: async () => {
    try {
      const response = await api.get('/my-endpoint');
      return response.data;
    } catch (error) {
      // Fallback mock data
      return [];
    }
  },
};
```

### Create a Component

```typescript
// /src/app/components/MyComponent.tsx
import React from 'react';

export const MyComponent: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6">
      <h3>My Component</h3>
    </div>
  );
};
```

Use it:
```typescript
import { MyComponent } from '../components/MyComponent';

// In your screen:
<MyComponent />
```

---

## 🎨 Styling Tips

### Colors
```tsx
// Purple gradient (brand)
className="bg-gradient-to-br from-purple-500 to-pink-500"

// Card background
className="bg-white dark:bg-gray-800"

// Rounded corners
className="rounded-3xl"  // Large
className="rounded-2xl"  // Medium
className="rounded-xl"   // Small
```

### Common Patterns
```tsx
// Card with shadow
<div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">

// Button
<button className="bg-purple-500 text-white px-6 py-3 rounded-2xl">

// Input
<input className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-700" />
```

---

## 🐛 Troubleshooting

### App won't start
```bash
# Clear node_modules
rm -rf node_modules
npm install
npm run dev
```

### Dark mode not working
- Check Profile screen toggle
- Verify theme.css is imported
- Check browser localStorage

### API calls failing
- Check BASE_URL in api.ts
- Open DevTools → Network tab
- Verify backend is running
- Use mock mode (already enabled)

### Charts not showing
- Check recharts is installed
- Verify data format
- Check ResponsiveContainer width

---

## 📚 Documentation Quick Links

- **Full Features**: See `FEATURES.md`
- **API Setup**: See `API_SETUP.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Structure**: See `PROJECT_STRUCTURE.md`

---

## 💡 Pro Tips

1. **Use Mock Mode**
   - App works without backend
   - Perfect for testing UI
   - Demo account: demo@neuronexus.app

2. **Dark Mode Development**
   - Toggle often while building
   - Test all components in both themes
   - Use `dark:` prefix for dark styles

3. **Mobile First**
   - Always test on mobile width
   - Use Chrome DevTools mobile view
   - Bottom nav = thumb friendly

4. **Hot Reload**
   - Vite auto-reloads on save
   - Keeps state between reloads
   - Fast development cycle

5. **Component Reuse**
   - Check `/components/ui` first
   - Lots of pre-built components
   - Customizable with Tailwind

---

## 🎯 Your First Tasks

Try these to get familiar:

- [ ] Login with demo account
- [ ] Add 3 tasks
- [ ] Track your mood
- [ ] Send a chat message to AI
- [ ] Play a game
- [ ] Toggle dark mode
- [ ] Check the Dashboard charts
- [ ] Change your avatar mood
- [ ] Log out and back in

---

## 🚀 Ready to Build!

You now have:
✅ App running locally  
✅ Demo account access  
✅ All features working  
✅ Documentation available  
✅ Development environment set up  

**Start building your wellness journey! 💙**

---

## 📞 Need Help?

- Check documentation files
- Read inline code comments
- Test with demo account
- Review API_SETUP.md for backend

**Happy coding! 🎉**
