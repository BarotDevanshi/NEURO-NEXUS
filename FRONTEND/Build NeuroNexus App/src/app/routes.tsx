import { createBrowserRouter, Navigate } from 'react-router';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { AIChatScreen } from './screens/AIChatScreen';
import { GamesScreen } from './screens/GamesScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginScreen />,
  },
  {
    path: '/register',
    element: <RegisterScreen />,
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <HomeScreen /> },
          { path: 'dashboard', element: <DashboardScreen /> },
          { path: 'chat', element: <AIChatScreen /> },
          { path: 'games', element: <GamesScreen /> },
          { path: 'profile', element: <ProfileScreen /> },
        ],
      },
    ],
  },
]);
