import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              borderRadius: '1rem',
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}
