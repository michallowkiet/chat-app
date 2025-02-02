import { Loader2, Lock, Mail, MessageSquare } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import useAuthStore from '../store/useAuthStore';
import Input from '../ui/Input';

const LoginPage = () => {
  const { isLoggingIn, login } = useAuthStore();
  const [formData, setFormData] = useState({ password: '', email: '' });

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(formData.email, formData.password);
    setFormData({ password: '', email: '' });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side content*/}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and title */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex justify-center items-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mt-2">Sign In</h1>
              <p className="text-base-content/60">
                Sign in to start using all the features.
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Form Group Email */}
            <Input
              placeholder="Email"
              type="email"
              icon={<Mail className="size-5 text-base-content/40" />}
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            {/* Form Group Password */}
            <Input
              placeholder="Password"
              type="password"
              icon={<Lock className="size-5 text-base-content/40" />}
              label="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            {/* Submit button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> Loading...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Link to Login Page */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{' '}
              <Link className="link link-primary" to="/signup">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side content */}
      <AuthImagePattern
        title="Welcome back!"
        content="Sign in to continue your journey and catch up with your messages."
      />
    </div>
  );
};

export default LoginPage;
