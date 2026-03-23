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
      config.headers.Authorization = token;
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
      return response.data;
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
      return response.data;
    } catch (error) {
      return { id: Date.now().toString(), mood, timestamp: new Date().toISOString() };
    }
  },
};

export const taskService = {
  getTasks: async () => {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      return [];
    }
  },
  createTask: async (task: any) => {
    try {
      const response = await api.post('/tasks', task);
      return response.data;
    } catch (error) {
      return { id: Date.now().toString(), ...task };
    }
  },
  updateTask: async (id: string, updates: any) => {
    try {
      const response = await api.put(`/tasks/${id}`, updates);
      return response.data;
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
      return response.data;
    } catch (error) {
      return [];
    }
  },
  saveSleep: async (sleep: any) => {
    try {
      const response = await api.post('/sleep', sleep);
      return response.data;
    } catch (error) {
      return { id: Date.now().toString(), ...sleep };
    }
  },
  updateSleep: async (id: string, updates: any) => {
    try {
      const response = await api.put(`/sleep/${id}`, updates);
      return response.data;
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
      return response.data;
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
      return response.data;
    } catch (error) {
      return [
        { id: '1', text: 'Hi! I\'m your NeuroNexus assistant. How can I help you today? 💙', sender: 'ai', timestamp: new Date().toISOString() }
      ];
    }
  },
  sendMessage: async (message: string) => {
    try {
      const response = await api.post('/activity/chat', { message });
      return response.data;
    } catch (error) {
      // Mock AI responses
      const responses = [
        'That sounds great! Remember to take breaks every 25 minutes 🎯',
        'I understand. Let\'s break this down into smaller, manageable steps 💪',
        'You\'re doing amazing! Keep up the good work 🌟',
        'How about we set a gentle reminder for that? 📌',
        'It\'s okay to feel overwhelmed. Let\'s focus on one thing at a time 🧘‍♀️',
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
      return response.data;
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
