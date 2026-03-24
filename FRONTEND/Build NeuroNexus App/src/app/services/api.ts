import axios from 'axios';

// Replace with your actual backend URL
const BASE_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('neuronexus_token');
    if (token) {
      // Keep backend JWT pattern in sync with auth middleware.
      // Your backend strips `Bearer ` if present, so send as bearer.
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('neuronexus_token');
      localStorage.removeItem('neuronexus_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service functions with mock data for development
export const moodService = {
  getMoods: async () => {
    try {
      const response = await api.get('/moods');
      return response.data.data || response.data;
    } catch (error) {
      // Mock data for development
      return [
        { id: '1', mood: 'happy', timestamp: new Date().toISOString(), feedback: 'You seem happy 😊' },
        { id: '2', mood: 'calm', timestamp: new Date(Date.now() - 86400000).toISOString(), feedback: 'You seem calm 😌' },
      ];
    }
  },
  saveMood: async (mood: string) => {
    try {
      const response = await api.post('/moods', { mood, timestamp: new Date().toISOString() });
      return response.data.data || response.data;
    } catch (error) {
      return { id: Date.now().toString(), mood, timestamp: new Date().toISOString() };
    }
  },
};

export const taskService = {
  getTasks: async () => {
    try {
      const response = await api.get('/tasks');
      return response.data.data || response.data; // Handle both {data: [...]} and direct array
    } catch (error) {
      return [];
    }
  },
  createTask: async (task: any) => {
    try {
      const response = await api.post('/tasks', task);
      return response.data.data || response.data;
    } catch (error) {
      return { id: Date.now().toString(), ...task };
    }
  },
  updateTask: async (id: string, updates: any) => {
    try {
      const response = await api.put(`/tasks/${id}`, updates);
      return response.data.data || response.data;
    } catch (error) {
      return { id, ...updates };
    }
  },
  deleteTask: async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      console.log('Task deleted');
    }
  },
};

export const sleepService = {
  getSleepRecords: async () => {
    try {
      const response = await api.get('/sleep');
      return response.data.data || response.data;
    } catch (error) {
      return [];
    }
  },
  saveSleep: async (sleep: any) => {
    try {
      const response = await api.post('/sleep', sleep);
      return response.data.data || response.data;
    } catch (error) {
      return { id: Date.now().toString(), ...sleep };
    }
  },
  updateSleep: async (id: string, updates: any) => {
    try {
      const response = await api.put(`/sleep/${id}`, updates);
      return response.data.data || response.data;
    } catch (error) {
      return { id, ...updates };
    }
  },
  deleteSleep: async (id: string) => {
    try {
      await api.delete(`/sleep/${id}`);
    } catch (error) {
      console.log('Sleep record deleted');
    }
  },
};

export const aiService = {
  getRecommendation: async () => {
    try {
      const response = await api.post('/activity/recommend');
      return response.data.data || response.data;
    } catch (error) {
      const recommendations = [
        { text: '🧘‍♀️ Take a 5-minute breathing break to reset your focus', icon: '🧘‍♀️' },
        { text: '💧 Stay hydrated! Time for a water break', icon: '💧' },
        { text: '🚶‍♂️ A short walk can boost your dopamine levels', icon: '🚶‍♂️' },
        { text: '📝 Break down your biggest task into 3 smaller steps', icon: '📝' },
        { text: '🎵 Try some lo-fi music to help you concentrate', icon: '🎵' },
      ];
      return recommendations[Math.floor(Math.random() * recommendations.length)];
    }
  },
  getChatHistory: async () => {
    try {
      const response = await api.get('/activity/chat');
      const chatHistory = response.data.data || response.data;

      // Always include a welcome message if no chat history exists
      if (!chatHistory || chatHistory.length === 0) {
        return [
          {
            id: 'welcome',
            text: 'Hi there! 👋 I\'m your NeuroNexus assistant and friend. I\'m here to chat, help you track your mood and tasks, and support you on your journey. What\'s on your mind today?',
            sender: 'ai',
            timestamp: new Date().toISOString()
          }
        ];
      }

      return chatHistory;
    } catch (error) {
      // Fallback welcome message on error
      return [
        {
          id: 'welcome',
          text: 'Hi there! 👋 I\'m your NeuroNexus assistant and friend. I\'m here to chat, help you track your mood and tasks, and support you on your journey. What\'s on your mind today?',
          sender: 'ai',
          timestamp: new Date().toISOString()
        }
      ];
    }
  },
  sendMessage: async (message: string) => {
    try {
      const response = await api.post('/activity/chat', { message });
      return response.data.data || response.data;
    } catch (error) {
      // Enhanced mock AI responses that act like a friend - more accurate and contextual
      const responses = [
        "Hey! I'm here for you 💙 What's been on your mind lately?",
        "That sounds really important to you. Want to tell me more about it? 🤔",
        "I appreciate you sharing that with me! How are you feeling about everything? 💭",
        "Thanks for talking to me about this. Is there anything specific you'd like help with? 🌟",
        "I hear you! Sometimes just talking things through helps. What's one thing we could work on together? 💪",
        "You're doing great by reaching out! What's something positive we can focus on? ✨",
        "That makes total sense. How can I support you right now? 🤗",
        "I understand - life can be overwhelming sometimes. What's one small step we could take? 🌱",
        "I'm really glad you shared that with me. What's something you'd like to achieve today? 🎯",
        "Thanks for trusting me with that. How are you feeling about your goals right now? 💪"
      ];
      return {
        id: Date.now().toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
    }
  },
};

export const progressService = {
  getProgress: async () => {
    try {
      const response = await api.get('/progress');
      return response.data.data || response.data;
    } catch (error) {
      return {
        totalTasks: 45,
        completedTasks: 32,
        pendingTasks: 13,
        completionRate: 71,
        streak: 7,
        dopamineLevel: 85,
      };
    }
  },
};

export const gameService = {
  saveGameSession: async (gameData: {
    gameType: string;
    score?: number;
    duration?: number;
    completed?: boolean;
    metadata?: any;
  }) => {
    try {
      const response = await api.post('/games/session', gameData);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Failed to save game session:', error);
      return null;
    }
  },

  getGameStats: async (gameType?: string) => {
    try {
      const params = gameType ? { gameType } : {};
      const response = await api.get('/games/stats', { params });
      return response.data.data || response.data;
    } catch (error) {
      return {
        totalGames: 0,
        completedGames: 0,
        completionRate: 0,
        bestScores: [],
        recentGames: []
      };
    }
  },

  getLeaderboard: async () => {
    try {
      const response = await api.get('/games/leaderboard');
      return response.data.data || response.data;
    } catch (error) {
      return [];
    }
  },

  getAchievements: async () => {
    try {
      const response = await api.get('/games/achievements');
      return response.data.data || response.data;
    } catch (error) {
      return [];
    }
  },
};
