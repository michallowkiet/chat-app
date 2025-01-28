import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import SettingPage from './pages/SettingPage';
import SignUpPage from './pages/SignUpPage';
import useAuthStore from './store/useAuthStore';

const App = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <div className="grid grid-cols-1 content-start h-screen w-screen bg-gray-200 dark:bg-gray-800">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
