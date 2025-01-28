import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import SettingPage from './pages/SettingPage';
import SignUpPage from './pages/SignUpPage';
import useAuthStore from './store/useAuthStore';

const App = () => {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore((state) => {
    return state;
  });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 place-items-center h-screen w-screen">
        <span className="loading loading-spinner loading-[4rem]"></span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 content-start h-screen w-screen bg-gray-200 dark:bg-gray-800">
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to="/" replace />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/settings"
          element={
            isAuthenticated ? <SettingPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
