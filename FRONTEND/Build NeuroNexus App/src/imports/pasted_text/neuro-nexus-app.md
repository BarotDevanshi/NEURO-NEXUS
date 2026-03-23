Build a complete React Native (Expo) mobile application called "NeuroNexus" – a productivity + mental wellness app designed specifically for ADHD and neurodivergent users.

---

🧠 CORE DESIGN PRINCIPLES

* Calm and minimal UI
* Low clutter and distraction-free layout
* Clear focus sections
* Soft, friendly colors
* Smooth and intuitive UX
* Large touch-friendly components
* No overwhelming text

---

🎨 THEME CONFIG




make attractive 
* Use rounded corners and soft shadows
* Support DARK MODE toggle

---

📁 PROJECT STRUCTURE

/components
/screens
/navigation
/services (API calls using axios)
/context (Auth + global state)
/theme

---

🔗 BACKEND INTEGRATION

Base URL:
http://YOUR_BACKEND_URL/api

Use axios with interceptors:

* Add Authorization header:
  Authorization: token

Store token in AsyncStorage and manage with Auth Context.

---

🔐 AUTH SCREENS

1. Register Screen
   POST /auth/register

Body:
{
"name": "",
"email": "",
"password": ""
}

2. Login Screen
   POST /auth/login

Body:
{
"email": "",
"password": ""
}

* After login, store token and navigate to main app

---

📱 NAVIGATION

Use Bottom Tab Navigation with 4 tabs:(like whaatsapp niche chats,status,calls hota esa same)

1. Home
2. Dashboard
3. AI Chat
4. Games(mind relaxing games)
5. Profile

---

🏠 HOME SCREEN (MAIN SCREEN)

Scrollable vertical layout like WhatsApp feed using cards.

---

1️⃣ MOOD TRACKER

UI:

* Emoji or button selection (happy, sad, stressed)
* Show instant feedback:
  Example: "You seem happy 😊"
* Button: Save Mood

API:
POST /moods
GET /moods

---

2️⃣ TASK DUMPYARD (To-Do System)

UI:

* Task input
* Priority selector (high / medium / low)
* Task list
* Checkbox for complete
* Subtasks support
* Completed tasks should be dimmed but visible

API:
POST /tasks
GET /tasks
PUT /tasks/:id
DELETE /tasks/:id

---

3️⃣ SLEEP TRACKER

UI:

* Time pickers (sleep time and wake time)
* Show:

  * Sleep duration
  * Sleep quality (good / poor / average)
* Optional alarm UI

API:
POST /sleep
GET /sleep
PUT /sleep/:id
DELETE /sleep/:id

---

4️⃣ AI RECOMMENDATION

UI:

* Card showing dynamic suggestion

API:
POST /activity/recommend

---

📊 DASHBOARD SCREEN

Display analytics using charts:

* Mood trends → GET /moods
* Task completion → GET /tasks
* Sleep trends → GET /sleep
* Progress stats → GET /progress

Show:

* Completion rate
* Streak 🔥
* Dopamine level (visual metric)
*Mood chart
*Sleep chart

Use:
react-native-chart-kit or victory-native

---

💬 AI CHAT SCREEN

UI:

* WhatsApp-style chat interface
* Message bubbles (left/right)
* Auto first message from AI

Features:

* Send messages
* Scrollable chat
* Store chat history

API:
POST /activity/chat
GET /activity/chat

---

👤 PROFILE SCREEN

UI:

* Display name and email
* Dark mode toggle 🌙

Avatar Feature:

* Editable avatar like snap 
* Avatar expression changes based on user mood

---

📈 PROGRESS MODULE

API:
GET /progress

Display:

* Total tasks
* Completed tasks
* Pending tasks
* Completion %
* Streak 🔥

---

✨ UX REQUIREMENTS

* Smooth animations and transitions
* Clean spacing and layout
* Minimal distractions
* Focus-driven sections
* Soft and friendly UI

---

🎯 FINAL GOAL

Create a modern, calming, ADHD-friendly productivity app that feels like:

* WhatsApp (chat experience)
* Notion (task organization)
* AI assistant (smart suggestions)

---

OUTPUT REQUIRED

Generate:

* Complete folder structure
* All screens and components
* Navigation setup
* API service layer (axios)
* Auth context
* Reusable UI components
* Theme integration
* Example API usage in each screen

Ensure the code is clean, modular, and ready to run with Expo.