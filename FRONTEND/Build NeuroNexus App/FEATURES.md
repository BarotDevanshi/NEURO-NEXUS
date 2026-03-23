# 🎯 NeuroNexus - Complete Feature Documentation

## 📱 Navigation Structure

### Bottom Tab Navigation (Mobile-First)
The app uses a WhatsApp-style bottom navigation with 5 main tabs:

1. **Home** 🏠 - Main feed with all productivity widgets
2. **Dashboard** 📊 - Analytics and progress visualization
3. **AI Chat** 💬 - Personal AI wellness assistant
4. **Games** 🎮 - Mind relaxation and focus activities
5. **Profile** 👤 - User settings and account management

## 🏠 Home Screen Features

### 1. AI Recommendation Card
- **Location:** Top of home screen
- **Purpose:** Provides contextual wellness suggestions
- **Features:**
  - Dynamic recommendations based on user patterns
  - Refresh button for new suggestions
  - Beautiful gradient background
  - Examples:
    - "Take a 5-minute breathing break"
    - "Stay hydrated! Time for a water break"
    - "Break down your biggest task into smaller steps"

### 2. Mood Tracker
- **Purpose:** Track emotional state throughout the day
- **Features:**
  - 4 mood options: Happy 😊, Calm 😌, Stressed 😰, Sad 😢
  - Visual emoji buttons for quick selection
  - Instant feedback messages
  - Color-coded mood indicators
  - Save mood with timestamp
  - Data sent to backend for trend analysis

**How to Use:**
1. Tap your current mood emoji
2. Read the feedback message
3. Click "Save Mood"
4. View mood trends in Dashboard

### 3. Task Dumpyard
- **Purpose:** Brain dump for ADHD-friendly task management
- **Features:**
  - Quick task input field
  - Priority selection (High/Medium/Low)
  - Color-coded priority borders:
    - Red border → High priority
    - Yellow border → Medium priority
    - Green border → Low priority
  - Checkbox to mark complete
  - Completed tasks are dimmed but visible
  - Delete individual tasks
  - Subtask support (expandable)

**ADHD-Friendly Design:**
- No rigid structure
- Dump tasks without overthinking
- Visual priority system
- Keep completed tasks visible for dopamine boost

**How to Use:**
1. Type task in input field
2. Select priority level
3. Click "Add" or press Enter
4. Check off when complete
5. Delete if no longer needed

### 4. Sleep Tracker
- **Purpose:** Monitor sleep patterns for better wellness
- **Features:**
  - Time pickers for bedtime and wake time
  - Automatic duration calculation
  - Sleep quality selector (Good/Average/Poor)
  - Visual duration display
  - Color-coded quality indicators

**How to Use:**
1. Set your bedtime (e.g., 22:00)
2. Set your wake time (e.g., 07:00)
3. Select sleep quality
4. Click "Save Sleep Data"
5. View patterns in Dashboard charts

## 📊 Dashboard Screen Features

### Visual Analytics
The dashboard provides beautiful data visualizations to track progress:

#### 1. Stats Cards (Top Grid)
- **Completion Rate:** Percentage of tasks completed
- **Streak:** Days of continuous productivity 🔥
- **Dopamine Level:** Gamified motivation metric
- **Tasks Done:** Completed vs Total tasks

#### 2. Mood Trend Chart
- **Type:** Line chart
- **Data:** Last 7 days of mood tracking
- **Purpose:** Identify emotional patterns
- **Features:**
  - Smooth line visualization
  - Hover tooltips
  - Purple gradient colors

#### 3. Sleep Pattern Chart
- **Type:** Bar chart
- **Data:** Sleep hours for last 7 days
- **Purpose:** Monitor sleep consistency
- **Features:**
  - Rounded bar tops
  - Indigo color scheme
  - Hours on Y-axis

#### 4. Task Distribution Chart
- **Type:** Pie/Donut chart
- **Data:** Completed vs Pending tasks
- **Colors:**
  - Green → Completed
  - Yellow → Pending
- **Purpose:** Quick visual of task status

### Progress Metrics
- Total tasks created
- Completion percentage
- Active streak counter
- Dopamine level indicator

## 💬 AI Chat Screen Features

### WhatsApp-Style Chat Interface
- **Design Philosophy:** Familiar, comfortable messaging experience

#### Features:
1. **Message Bubbles:**
   - User messages: Purple/pink gradient, right-aligned
   - AI messages: White/gray cards, left-aligned
   - Rounded corners with "tail" effect

2. **Typing Indicator:**
   - Three bouncing dots when AI is responding
   - Smooth animation

3. **Auto-scroll:**
   - Always scrolls to latest message
   - Smooth scroll behavior

4. **Timestamps:**
   - Each message shows time sent
   - Format: "10:30 AM"

5. **Message Input:**
   - Fixed bottom input bar
   - Send button (disabled when empty)
   - Enter key to send
   - Auto-focus after sending

#### AI Capabilities:
- Personalized wellness suggestions
- Task management advice
- Emotional support
- ADHD-specific strategies
- Productivity tips
- Gentle reminders

**Example Interactions:**
- "I'm feeling overwhelmed"
  → AI: "Let's break this down. What's one small thing you can do right now?"
- "Can't focus today"
  → AI: "That's okay! How about trying the breathing exercise in Games?"

## 🎮 Games Screen Features

### 1. Breathing Exercise 🧘‍♀️
- **Purpose:** Reduce stress and anxiety
- **Mechanics:**
  - Visual breathing guide (expanding circle)
  - 5 breath cycles
  - 4-second intervals
  - Calming blue/purple colors
  - Counter display

**How to Use:**
1. Click "Start Breathing"
2. Watch the circle expand (breathe in)
3. Watch the circle contract (breathe out)
4. Complete 5 cycles
5. Feel calmer!

### 2. Memory Match 🎯
- **Purpose:** Improve focus and working memory
- **Mechanics:**
  - 12 cards (6 pairs)
  - Click to flip cards
  - Match pairs of emojis
  - Cards: 🌟 🌈 🦋 🌸 🍀 💫
  - Reset button for new game

**How to Play:**
1. Click "Start Game"
2. Click a card to flip it
3. Click another card to find its match
4. Matched pairs stay revealed
5. Complete all pairs to win

### 3. Focus Clicker ⚡
- **Purpose:** Hand-eye coordination and rapid focus
- **Mechanics:**
  - Large tap button
  - Click counter
  - Random score addition
  - Visual feedback
  - Reset option

**How to Play:**
1. Tap the large button repeatedly
2. Watch your click count increase
3. Score accumulates randomly
4. Try to beat your high score

### 4. Calm Patterns 🌈
- **Purpose:** Visual meditation and stress relief
- **Mechanics:**
  - 16 colored squares
  - Gentle pulse animation
  - Staggered animation delays
  - Soft pastel colors
  - No interaction needed

**How to Use:**
1. Just watch the patterns
2. Let your mind relax
3. Focus on the gentle movements
4. Breathe slowly

## 👤 Profile Screen Features

### Avatar System
- **Customizable Mood Avatars:**
  - Happy 😊
  - Calm 😌
  - Focused 🎯
  - Relaxed 😴
  - Energetic ⚡

**Feature:** Avatar reflects your current state and can be changed anytime

### User Information
- Display name
- Email address
- Account type

### Statistics Panel
Four key metrics displayed in colorful cards:
1. **Total Tasks:** All tasks ever created
2. **Completed:** Successfully finished tasks
3. **Streak:** Consecutive productive days 🔥
4. **Completion Rate:** Success percentage

### Settings
1. **Dark Mode Toggle** 🌙
   - Switch between light and dark themes
   - Smooth transition
   - Saves preference to localStorage
   - Reduces eye strain

2. **Notifications** (UI placeholder)
   - Future: Push notification settings

3. **Privacy** (UI placeholder)
   - Future: Data management options

4. **Preferences** (UI placeholder)
   - Future: Customization options

5. **Sign Out**
   - Logs out user
   - Clears stored data
   - Returns to login screen

### App Information
- NeuroNexus logo
- Version number
- App tagline

## 🎨 Design System

### Color Palette

#### Light Mode:
- **Background:** Soft gray (#fafafa)
- **Cards:** Pure white (#ffffff)
- **Primary:** Purple (#a855f7)
- **Accent:** Pink (#ec4899)
- **Text:** Dark gray
- **Borders:** Subtle gray

#### Dark Mode:
- **Background:** Deep gray (#111827)
- **Cards:** Charcoal (#1f2937)
- **Primary:** Purple (#a855f7)
- **Accent:** Pink (#ec4899)
- **Text:** Light gray
- **Borders:** Subtle white

### Border Radius
- **Cards:** 24px (rounded-3xl)
- **Buttons:** 16px (rounded-2xl)
- **Inputs:** 16px (rounded-2xl)
- **Avatars:** Full circle (rounded-full)

### Shadows
- **Cards:** Soft drop shadow
- **Buttons:** Medium shadow
- **Active elements:** Larger shadow for depth

### Spacing
- **Card padding:** 24px
- **Section gaps:** 16px
- **Button padding:** 12px vertical, 24px horizontal

### Typography
- **Headings:** Medium weight (500)
- **Body:** Normal weight (400)
- **Font:** System fonts for best performance

## 🔔 Notifications

### Toast Messages (Sonner)
Elegant notifications for user feedback:

**Success:**
- "Mood saved! 💙"
- "Task added! 📝"
- "Sleep data saved! 💤"

**Error:**
- "Please fill in all fields"
- "Failed to save mood"

**Position:** Top center
**Duration:** 3-4 seconds
**Style:** Rounded, soft shadows

## ♿ Accessibility Features

1. **Large Touch Targets:** Minimum 44px for easy tapping
2. **High Contrast:** Readable text in both themes
3. **Focus Indicators:** Purple outline on keyboard navigation
4. **Semantic HTML:** Proper heading hierarchy
5. **ARIA Labels:** Screen reader support
6. **Keyboard Navigation:** Tab through all interactive elements

## 📱 Mobile Optimizations

1. **Bottom Navigation:** Thumb-friendly placement
2. **Safe Areas:** Respects iPhone notches
3. **Touch Gestures:** Tap, swipe, scroll optimized
4. **Viewport Units:** Responsive sizing
5. **No Tiny Text:** Minimum 14px font size
6. **Vertical Scrolling:** Natural mobile pattern

## 🚀 Performance Features

1. **Code Splitting:** Routes loaded on demand
2. **Lazy Loading:** Components load when needed
3. **Optimized Images:** Proper sizing and formats
4. **Minimal Dependencies:** Fast load times
5. **CSS Transitions:** GPU-accelerated animations

## 🔐 Security Features

1. **JWT Authentication:** Secure token-based auth
2. **localStorage:** Client-side token storage
3. **Axios Interceptors:** Auto-add auth headers
4. **Protected Routes:** Auth required for app access
5. **401 Handling:** Auto-logout on expired tokens

## 💡 ADHD-Specific Features

1. **Visual Hierarchy:** Clear, obvious sections
2. **Instant Feedback:** Immediate response to actions
3. **Progress Visibility:** See what you've accomplished
4. **No Overwhelm:** One section at a time
5. **Gamification:** Streaks, levels, dopamine metrics
6. **Flexible Structure:** No rigid organization
7. **Quick Wins:** Small, achievable tasks
8. **Positive Reinforcement:** Encouraging messages
9. **Minimal Text:** Icons and emojis prioritized
10. **Break Reminders:** AI suggestions for rest

## 🔄 Data Flow

### Task Creation Flow:
1. User types task in input
2. Selects priority
3. Clicks "Add" or Enter
4. Frontend creates task object
5. API call to POST /tasks
6. Backend saves and returns task
7. Task added to local state
8. UI updates with new task
9. Toast notification shown

### Mood Tracking Flow:
1. User selects mood emoji
2. Feedback displayed instantly
3. User clicks "Save Mood"
4. API call to POST /moods
5. Backend saves with timestamp
6. Confirmation toast shown
7. Dashboard updates with new data point

### Authentication Flow:
1. User enters credentials
2. Frontend validates input
3. API call to POST /auth/login
4. Backend verifies credentials
5. JWT token returned
6. Token stored in localStorage
7. User object stored in context
8. Redirect to home screen
9. Axios interceptor adds token to all requests

## 🎯 Future Enhancements

Potential features for v2.0:
- Push notifications
- Social features (accountability partners)
- Habit tracking
- Pomodoro timer
- Focus music integration
- Calendar view
- Task templates
- Voice input
- Offline mode with sync
- Export data
- Weekly reports
- Custom themes

---

**Built with ❤️ for the neurodivergent community**
