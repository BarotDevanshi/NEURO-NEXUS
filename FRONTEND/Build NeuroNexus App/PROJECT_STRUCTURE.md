# 📂 NeuroNexus - Complete Project Structure

## Directory Tree

```
neuronexus/
│
├── 📄 README.md                    # Main project documentation
├── 📄 API_SETUP.md                 # Backend API integration guide
├── 📄 FEATURES.md                  # Detailed feature documentation
├── 📄 DEPLOYMENT.md                # Deployment and production guide
├── 📄 PROJECT_STRUCTURE.md         # This file
├── 📄 package.json                 # Dependencies and scripts
├── 📄 vite.config.ts              # Vite configuration
├── 📄 postcss.config.mjs          # PostCSS configuration
│
├── 📁 src/
│   │
│   ├── 📁 app/
│   │   │
│   │   ├── 📄 App.tsx             # Root application component
│   │   ├── 📄 routes.tsx          # React Router configuration
│   │   │
│   │   ├── 📁 components/         # Reusable UI components
│   │   │   ├── 📄 MoodTracker.tsx
│   │   │   ├── 📄 TaskDumpyard.tsx
│   │   │   ├── 📄 SleepTracker.tsx
│   │   │   ├── 📄 AIRecommendation.tsx
│   │   │   ├── 📄 BottomNav.tsx
│   │   │   ├── 📄 WelcomeSplash.tsx
│   │   │   │
│   │   │   └── 📁 ui/             # Shadcn UI components
│   │   │       ├── 📄 button.tsx
│   │   │       ├── 📄 card.tsx
│   │   │       ├── 📄 dialog.tsx
│   │   │       └── ... (40+ components)
│   │   │
│   │   ├── 📁 screens/            # Main application screens
│   │   │   ├── 📄 LoginScreen.tsx
│   │   │   ├── 📄 RegisterScreen.tsx
│   │   │   ├── 📄 HomeScreen.tsx
│   │   │   ├── 📄 DashboardScreen.tsx
│   │   │   ├── 📄 AIChatScreen.tsx
│   │   │   ├── 📄 GamesScreen.tsx
│   │   │   └── 📄 ProfileScreen.tsx
│   │   │
│   │   ├── 📁 context/            # React Context providers
│   │   │   ├── 📄 AuthContext.tsx    # Authentication state
│   │   │   └── 📄 ThemeContext.tsx   # Dark mode state
│   │   │
│   │   ├── 📁 services/           # API integration layer
│   │   │   └── 📄 api.ts             # Axios instance + API calls
│   │   │
│   │   └── 📁 layouts/            # Layout components
│   │       ├── 📄 MainLayout.tsx     # Main app layout
│   │       └── 📄 AuthLayout.tsx     # Protected route wrapper
│   │
│   ├── 📁 styles/                 # Global styles
│   │   ├── 📄 index.css          # Main stylesheet
│   │   ├── 📄 theme.css          # Color theme variables
│   │   ├── 📄 tailwind.css       # Tailwind imports
│   │   └── 📄 fonts.css          # Font imports
│   │
│   └── 📁 imports/               # Figma imports
│       └── 📁 pasted_text/
│           └── 📄 neuro-nexus-app.md
│
└── 📁 dist/                      # Production build (generated)
```

## File Purposes

### Root Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts, project metadata |
| `vite.config.ts` | Vite bundler configuration |
| `postcss.config.mjs` | PostCSS and Tailwind setup |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main project overview and quick start |
| `API_SETUP.md` | Backend API endpoints and integration |
| `FEATURES.md` | Detailed feature explanations |
| `DEPLOYMENT.md` | Production deployment guide |
| `PROJECT_STRUCTURE.md` | This file - project organization |

### Source Files (`/src/app/`)

#### Core Files
- **App.tsx**: Root component with providers
- **routes.tsx**: React Router v7 configuration

#### Components (`/app/components/`)

**Home Components:**
- `MoodTracker.tsx` - Mood selection with emoji buttons
- `TaskDumpyard.tsx` - ADHD-friendly task manager
- `SleepTracker.tsx` - Sleep time and quality tracking
- `AIRecommendation.tsx` - AI-powered suggestions card

**Navigation:**
- `BottomNav.tsx` - Mobile bottom tab navigation

**Utility:**
- `WelcomeSplash.tsx` - App launch screen

**UI Components (`/components/ui/`):**
- 40+ Shadcn UI components
- Pre-built, accessible, customizable
- Used throughout the app

#### Screens (`/app/screens/`)

| Screen | Route | Purpose |
|--------|-------|---------|
| LoginScreen | `/login` | User authentication |
| RegisterScreen | `/register` | New user signup |
| HomeScreen | `/` | Main feed with all widgets |
| DashboardScreen | `/dashboard` | Analytics and charts |
| AIChatScreen | `/chat` | AI assistant conversation |
| GamesScreen | `/games` | Relaxation games |
| ProfileScreen | `/profile` | User settings and stats |

#### Context Providers (`/app/context/`)

- **AuthContext.tsx**
  - User authentication state
  - Login/Register/Logout functions
  - Token management
  - Demo account support

- **ThemeContext.tsx**
  - Dark/Light mode toggle
  - Theme persistence (localStorage)
  - CSS class management

#### Services (`/app/services/`)

- **api.ts**
  - Axios instance with interceptors
  - API endpoint functions
  - Mock data fallbacks
  - Auto-authentication headers

#### Layouts (`/app/layouts/`)

- **MainLayout.tsx**
  - Wraps authenticated screens
  - Includes bottom navigation
  - Handles main app structure

- **AuthLayout.tsx**
  - Protected route wrapper
  - Redirects unauthenticated users
  - Loading state handling

### Styles (`/src/styles/`)

- **index.css**
  - Global styles
  - Custom scrollbar
  - Smooth transitions
  - Mobile optimizations

- **theme.css**
  - CSS variables for colors
  - Light/Dark mode themes
  - Tailwind theme integration

- **tailwind.css**
  - Tailwind CSS imports

- **fonts.css**
  - Font family imports

## Key Dependencies

### Production
```json
{
  "react": "18.3.1",
  "react-router": "7.13.0",
  "axios": "^1.13.6",
  "recharts": "2.15.2",
  "lucide-react": "0.487.0",
  "sonner": "2.0.3",
  "tailwindcss": "4.1.12"
}
```

### Development
```json
{
  "@vitejs/plugin-react": "4.7.0",
  "vite": "6.3.5",
  "@tailwindcss/vite": "4.1.12"
}
```

## Component Hierarchy

```
App
├── ThemeProvider
│   └── AuthProvider
│       ├── RouterProvider
│       │   ├── LoginScreen (public)
│       │   ├── RegisterScreen (public)
│       │   └── AuthLayout (protected)
│       │       └── MainLayout
│       │           ├── HomeScreen
│       │           │   ├── AIRecommendation
│       │           │   ├── MoodTracker
│       │           │   ├── TaskDumpyard
│       │           │   └── SleepTracker
│       │           ├── DashboardScreen
│       │           ├── AIChatScreen
│       │           ├── GamesScreen
│       │           ├── ProfileScreen
│       │           └── BottomNav
│       └── Toaster (Sonner)
```

## Data Flow

### Authentication Flow
```
User Input → AuthContext → API Service → Backend
                ↓
         localStorage ← Token
                ↓
         Protected Routes Accessible
```

### Task Management Flow
```
TaskDumpyard Component → API Service → POST /tasks
                                            ↓
                                       Backend
                                            ↓
                                      Response
                                            ↓
                                    Update State
                                            ↓
                                    Re-render UI
```

### Theme Toggle Flow
```
Profile Switch → ThemeContext.toggleTheme()
                        ↓
                document.documentElement.classList
                        ↓
                localStorage.setItem()
                        ↓
                  CSS Variables Apply
```

## API Service Layer

```typescript
// Structure
api.ts
├── axios instance (with BASE_URL)
├── Request interceptor (adds auth token)
├── Response interceptor (handles 401)
└── Service functions:
    ├── moodService
    │   ├── getMoods()
    │   └── saveMood()
    ├── taskService
    │   ├── getTasks()
    │   ├── createTask()
    │   ├── updateTask()
    │   └── deleteTask()
    ├── sleepService
    │   ├── getSleepRecords()
    │   ├── saveSleep()
    │   ├── updateSleep()
    │   └── deleteSleep()
    ├── aiService
    │   ├── getRecommendation()
    │   ├── getChatHistory()
    │   └── sendMessage()
    └── progressService
        └── getProgress()
```

## State Management

### Global State (Context)
- **Authentication**: AuthContext
- **Theme**: ThemeContext

### Local State (useState)
- Component-specific data
- Form inputs
- UI toggles
- Loading states

### Server State (API Calls)
- Tasks
- Moods
- Sleep records
- Chat messages
- Progress stats

## Routing Structure

```
/
├── /login (public)
├── /register (public)
└── / (protected - requires auth)
    ├── / → HomeScreen
    ├── /dashboard → DashboardScreen
    ├── /chat → AIChatScreen
    ├── /games → GamesScreen
    └── /profile → ProfileScreen
```

## Build Output

After `npm run build`:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js      # Main JavaScript bundle
│   ├── index-[hash].css     # Compiled CSS
│   └── [other-chunks].js    # Code-split chunks
└── favicon.ico
```

## Environment Variables

Currently none required for frontend. Backend URL is hardcoded in `api.ts`.

For production, consider:
```env
VITE_API_BASE_URL=https://api.neuronexus.app
VITE_ENABLE_ANALYTICS=true
```

## Code Organization Principles

1. **Separation of Concerns**
   - Components: UI only
   - Context: Global state
   - Services: API calls
   - Screens: Page composition

2. **Reusability**
   - Shared components in `/components`
   - UI primitives in `/components/ui`

3. **Modularity**
   - Each screen is independent
   - Components are self-contained

4. **Type Safety**
   - TypeScript throughout
   - Interface definitions
   - Proper typing

## Next Steps for Development

1. **Add new feature?**
   - Create component in `/components`
   - Add API call in `/services/api.ts`
   - Use in appropriate screen

2. **Add new screen?**
   - Create in `/screens`
   - Add route in `routes.tsx`
   - Add nav item in `BottomNav.tsx`

3. **Modify theme?**
   - Update `/styles/theme.css`
   - Tailwind classes auto-update

4. **Add new API endpoint?**
   - Extend service in `/services/api.ts`
   - Add TypeScript interfaces
   - Handle in components

---

**Well-organized structure for maintainability and scalability! 🎯**
