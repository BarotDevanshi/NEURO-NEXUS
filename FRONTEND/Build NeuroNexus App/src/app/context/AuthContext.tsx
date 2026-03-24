// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { api } from '../services/api';

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
//   isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//   const storedToken = localStorage.getItem('neuronexus_token');
//   const storedUser = localStorage.getItem('neuronexus_user');

//   if (storedToken && storedUser && storedUser !== "undefined") {
//     try {
//       setToken(storedToken);
//       setUser(JSON.parse(storedUser));
//     } catch (error) {
//       console.error("Invalid user JSON:", error);
//       localStorage.removeItem('neuronexus_user'); // cleanup bad data
//     }
//   }

//   setIsLoading(false);
// }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       // Handle demo account
//       if (email === 'demo@neuronexus.app' && password === 'demo123') {
//         const demoToken = 'demo-token-' + Date.now();
//         const demoUser = {
//           id: 'demo-user',
//           name: 'Demo User',
//           email: 'demo@neuronexus.app'
//         };
        
//         setToken(demoToken);
//         setUser(demoUser);
//         localStorage.setItem('neuronexus_token', demoToken);
//         localStorage.setItem('neuronexus_user', JSON.stringify(demoUser));
//         return;
//       }

//       const response = await api.post('/auth/login', { email, password });
//       const { token: newToken, user: userData } = response.data;
      
//       setToken(newToken);
//       setUser(userData);
//       localStorage.setItem('neuronexus_token', newToken);
//       localStorage.setItem('neuronexus_user', JSON.stringify(userData));
//     } catch (error) {
//       throw error;
//     }
//   };

//   const register = async (name: string, email: string, password: string) => {
//     try {
//       const response = await api.post('/auth/register', { name, email, password });
//       const { token: newToken, user: userData } = response.data;
      
//       setToken(newToken);
//       setUser(userData);
//       localStorage.setItem('neuronexus_token', newToken);
//       localStorage.setItem('neuronexus_user', JSON.stringify(userData));
//     } catch (error) {
//       throw error;
//     }
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem('neuronexus_token');
//     localStorage.removeItem('neuronexus_user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 LOAD FROM LOCAL STORAGE
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('neuronexus_token');
      const storedUser = localStorage.getItem('neuronexus_user');

      console.log("Stored User:", storedUser);

      if (storedToken && storedUser && storedUser !== "undefined") {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } else {
        // cleanup garbage data
        localStorage.removeItem('neuronexus_user');
      }
    } catch (error) {
      console.error("Invalid user JSON:", error);
      localStorage.removeItem('neuronexus_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 🔐 LOGIN
  const login = async (email: string, password: string) => {
    try {
      // ✅ Demo account
      if (email === 'demo@neuronexus.app' && password === 'demo123') {
        const demoToken = 'demo-token-' + Date.now();
        const demoUser = {
          id: 'demo-user',
          name: 'Demo User',
          email: 'demo@neuronexus.app'
        };

        setToken(demoToken);
        setUser(demoUser);

        localStorage.setItem('neuronexus_token', demoToken);
        localStorage.setItem('neuronexus_user', JSON.stringify(demoUser));
        return;
      }

      const response = await api.post('/auth/login', { email, password });

      console.log("LOGIN RESPONSE:", response.data);

      // 🔥 IMPORTANT: handle multiple response formats
      let payload = response.data;
      if (response.data?.data) {
        payload = response.data.data;
      }

      const newToken = payload?.token;
      const userData = payload?.user;

      if (!newToken || !userData) {
        console.error("Invalid API response structure:", response.data);
        throw new Error("Invalid login response - missing token or user");
      }

      setToken(newToken);
      setUser(userData);

      localStorage.setItem('neuronexus_token', newToken);
      localStorage.setItem('neuronexus_user', JSON.stringify(userData));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // 📝 REGISTER
  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });

      console.log("REGISTER RESPONSE:", response.data);

      // 🔥 IMPORTANT: handle multiple response formats
      let payload = response.data;
      if (response.data?.data) {
        payload = response.data.data;
      }

      const newToken = payload?.token;
      const userData = payload?.user;

      if (!newToken || !userData) {
        console.error("Invalid API response structure:", response.data);
        throw new Error("Invalid register response - missing token or user");
      }

      setToken(newToken);
      setUser(userData);

      localStorage.setItem('neuronexus_token', newToken);
      localStorage.setItem('neuronexus_user', JSON.stringify(userData));
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem('neuronexus_token');
    localStorage.removeItem('neuronexus_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🧠 HOOK
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};