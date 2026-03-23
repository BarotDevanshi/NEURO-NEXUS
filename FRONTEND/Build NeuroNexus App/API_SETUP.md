# NeuroNexus - API Setup Guide

## Backend Integration

This app is designed to work with your backend API. Update the base URL in `/src/app/services/api.ts`:

```typescript
const BASE_URL = 'http://YOUR_BACKEND_URL/api';
```

Replace `YOUR_BACKEND_URL` with your actual backend server URL.

## API Endpoints

### Authentication

#### Register
- **POST** `/auth/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "token": "your-jwt-token",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login
- **POST** `/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:** Same as Register

### Mood Tracker

#### Get Moods
- **GET** `/moods`
- **Headers:** `Authorization: {token}`
- **Response:**
```json
[
  {
    "id": "mood-id",
    "mood": "happy",
    "timestamp": "2026-03-22T10:30:00Z",
    "feedback": "You seem happy 😊"
  }
]
```

#### Save Mood
- **POST** `/moods`
- **Headers:** `Authorization: {token}`
- **Body:**
```json
{
  "mood": "happy",
  "timestamp": "2026-03-22T10:30:00Z"
}
```

### Tasks

#### Get Tasks
- **GET** `/tasks`
- **Headers:** `Authorization: {token}`

#### Create Task
- **POST** `/tasks`
- **Headers:** `Authorization: {token}`
- **Body:**
```json
{
  "title": "Complete project",
  "priority": "high",
  "completed": false,
  "subtasks": []
}
```

#### Update Task
- **PUT** `/tasks/:id`
- **Headers:** `Authorization: {token}`
- **Body:**
```json
{
  "completed": true
}
```

#### Delete Task
- **DELETE** `/tasks/:id`
- **Headers:** `Authorization: {token}`

### Sleep Tracker

#### Get Sleep Records
- **GET** `/sleep`
- **Headers:** `Authorization: {token}`

#### Save Sleep
- **POST** `/sleep`
- **Headers:** `Authorization: {token}`
- **Body:**
```json
{
  "sleepTime": "22:00",
  "wakeTime": "07:00",
  "duration": "9h 0m",
  "quality": "good",
  "date": "2026-03-22T00:00:00Z"
}
```

#### Update Sleep
- **PUT** `/sleep/:id`
- **Headers:** `Authorization: {token}`

#### Delete Sleep
- **DELETE** `/sleep/:id`
- **Headers:** `Authorization: {token}`

### AI Features

#### Get Recommendation
- **POST** `/activity/recommend`
- **Headers:** `Authorization: {token}`
- **Response:**
```json
{
  "text": "Take a 5-minute breathing break",
  "icon": "🧘‍♀️"
}
```

#### Get Chat History
- **GET** `/activity/chat`
- **Headers:** `Authorization: {token}`
- **Response:**
```json
[
  {
    "id": "msg-id",
    "text": "Hello!",
    "sender": "ai",
    "timestamp": "2026-03-22T10:30:00Z"
  }
]
```

#### Send Message
- **POST** `/activity/chat`
- **Headers:** `Authorization: {token}`
- **Body:**
```json
{
  "message": "I need help with task management"
}
```

### Progress

#### Get Progress Stats
- **GET** `/progress`
- **Headers:** `Authorization: {token}`
- **Response:**
```json
{
  "totalTasks": 45,
  "completedTasks": 32,
  "pendingTasks": 13,
  "completionRate": 71,
  "streak": 7,
  "dopamineLevel": 85
}
```

## Mock Data Mode

The app currently runs in mock data mode, which means it will work without a backend connection. Mock responses are defined in `/src/app/services/api.ts`.

To enable real API calls:
1. Update the `BASE_URL` in `/src/app/services/api.ts`
2. Ensure your backend implements the endpoints listed above
3. The app will automatically switch to using real data

## Authorization Header

All authenticated endpoints require the Authorization header:
```
Authorization: {token}
```

The token is automatically added by the axios interceptor when stored in localStorage.

## Error Handling

- **401 Unauthorized:** User will be redirected to login
- **Other errors:** Toast notifications will display error messages

## Demo Account

For testing without a backend:
- **Email:** demo@neuronexus.app
- **Password:** demo123

This account works with the mock authentication system.
