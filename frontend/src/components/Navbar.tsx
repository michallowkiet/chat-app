import { LogOutIcon, MessageCircle, SettingsIcon, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  return (
    <header className="border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <nav className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo / brand name */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageCircle className="size-6 text-primary" />
            </div>
            <p className="text-lg font-bold">ChatFriends</p>
          </Link>

          {/* Navigation links */}
          <div className="flex items-center gap-2">
            <Link to="/settings" className="btn btn-sm gap-2 transition-color">
              <SettingsIcon className="size-4" />
              <span className="hidden sm:inline text-sm">Settings</span>
            </Link>

            {/* Logout button */}
            {user && (
              <>
                <Link to="/profile" className="btn btn-sm gap-2">
                  <User2 className="size-5" />
                  <span className="hidden sm:inline text-sm">Profile</span>
                </Link>

                <button onClick={logout} className="btn btn-sm gap-2">
                  <LogOutIcon className="size-5" />
                  <span className="hidden sm:inline text-sm">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
