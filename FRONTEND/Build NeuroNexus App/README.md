# 🧠 NeuroNexus

A beautiful, calming productivity and mental wellness web application designed specifically for ADHD and neurodivergent users.

![NeuroNexus Banner](https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop)

## ✨ Features

### 🎯 Core Modules

#### 1. **Mood Tracker** 😊
- Track your emotional state with simple emoji selections
- Get instant feedback and validation
- Visual mood trends over time
- Helps identify patterns in your mental wellness journey

#### 2. **Task Dumpyard** 📝
- Brain dump all your tasks without overthinking
- Priority-based organization (High/Medium/Low)
- Visual completion tracking
- Dimmed completed tasks for reduced clutter
- Subtask support for breaking down complex tasks

#### 3. **Sleep Tracker** 🌙
- Log sleep and wake times
- Automatic duration calculation
- Sleep quality tracking (Good/Average/Poor)
- Visualize sleep patterns with charts

#### 4. **AI Assistant** 🤖
- WhatsApp-style chat interface
- Smart recommendations based on your activity
- Personalized productivity tips
- Always available mental wellness companion

#### 5. **Dashboard** 📊
- Beautiful data visualizations using Recharts
- Track completion rates and streaks 🔥
- Dopamine level metrics
- Mood and sleep trend charts
- Task distribution pie charts

#### 6. **Mind Games** 🎮
- **Breathing Exercise:** Guided breathing for stress relief
- **Memory Match:** Improve focus and concentration
- **Focus Clicker:** Hand-eye coordination game
- **Calm Patterns:** Visual meditation aid

#### 7. **Profile & Settings** 👤
- Customizable mood-based avatar
- Dark mode toggle 🌙
- User statistics
- Account management

## 🎨 Design Principles

- **Calm & Minimal UI:** Low clutter, distraction-free layout
- **Soft Colors:** Purple and pink gradients for a soothing experience
- **Large Touch Targets:** Mobile-friendly, easy to interact with
- **Smooth Animations:** Gentle transitions that don't overwhelm
- **Clear Focus Sections:** One thing at a time approach
- **Dark Mode Support:** Reduce eye strain and improve focus

## 🛠️ Tech Stack

- **React 18.3.1** - Modern React with hooks
- **TypeScript** - Type-safe code
- **Tailwind CSS v4** - Utility-first styling
- **React Router 7** - Client-side routing
- **Recharts** - Beautiful, responsive charts
- **Axios** - HTTP client with interceptors
- **Lucide React** - Beautiful, consistent icons
- **Sonner** - Elegant toast notifications
- **Motion** - Smooth animations

## 📁 Project Structure

```
/src
  /app
    /components       # Reusable UI components
      - MoodTracker.tsx
      - TaskDumpyard.tsx
      - SleepTracker.tsx
      - AIRecommendation.tsx
      - BottomNav.tsx
    /screens          # Main app screens
      - HomeScreen.tsx
      - DashboardScreen.tsx
      - AIChatScreen.tsx
      - GamesScreen.tsx
      - ProfileScreen.tsx
      - LoginScreen.tsx
      - RegisterScreen.tsx
    /context          # Global state management
      - AuthContext.tsx
      - ThemeContext.tsx
    /services         # API integration
      - api.ts
    /layouts          # Layout components
      - MainLayout.tsx
      - AuthLayout.tsx
    - routes.tsx
    - App.tsx
  /styles             # Global styles
    - theme.css
    - index.css
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd neuronexus
```

2. Install dependencies
```bash
npm install
# or
pnpm install
```

3. Configure your backend URL
Edit `/src/app/services/api.ts` and update:
```typescript
const BASE_URL = 'http://YOUR_BACKEND_URL/api';
```

4. Start the development server
```bash
npm run dev
# or
pnpm dev
```

5. Open your browser to `http://localhost:5173`

## 🔐 Authentication

The app uses JWT-based authentication with localStorage for token persistence.

### Demo Account (Mock Mode)
- **Email:** demo@neuronexus.app
- **Password:** demo123

## 🌐 API Integration

See [API_SETUP.md](./API_SETUP.md) for complete API documentation including:
- All endpoint specifications
- Request/Response formats
- Authorization headers
- Error handling

## 📱 Mobile-First Design

NeuroNexus is designed with a mobile-first approach:
- Responsive layouts for all screen sizes
- Touch-friendly interface elements
- Bottom navigation for easy thumb access
- Optimized for iOS and Android browsers
- PWA-ready (can be installed to home screen)

## 🎯 ADHD-Friendly Features

- **Visual Hierarchy:** Clear sections and cards
- **Instant Feedback:** Immediate responses to actions
- **Progress Visualization:** See your achievements
- **Gentle Reminders:** AI suggestions without being pushy
- **Flexible Organization:** No rigid structure
- **Gamification:** Streaks and dopamine metrics
- **Quick Access:** Bottom navigation for fast switching
- **Minimal Text:** Icons and emojis for quick scanning

## 🌙 Dark Mode

Toggle between light and dark themes for comfortable use at any time:
- Reduces eye strain
- Better focus in low-light conditions
- Saves battery on OLED screens
- Preference saved to localStorage

## 📊 Data Privacy

- All data stored locally in development mode
- When connected to backend, ensure HTTPS
- JWT tokens for secure authentication
- No third-party tracking

## 🤝 Contributing

This is a productivity wellness app built with care for the neurodivergent community. Contributions are welcome!

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- Built with ❤️ for the ADHD and neurodivergent community
- Inspired by modern, calm productivity tools
- Icons by Lucide React
- Charts by Recharts

## 📞 Support

For issues or questions, please open an issue on the repository.

---

**Remember:** You're doing amazing! One task at a time. 💙
